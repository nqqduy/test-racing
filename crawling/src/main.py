from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from dotenv import load_dotenv
import os
import pandas as pd
import sys
import pymysql
from sqlalchemy import create_engine
import copy

from src.constant.position_on_filter import *
from src.constant.category import *
import src.df as define



class Main(webdriver.Chrome):
    def __init__(self, isExit = False):
        load_dotenv()
        self.conn, self.cursor, self.engine = self.connect_databse()
        self.initalize_database()

        self.isExit = isExit

        options = Options()
        options.add_experimental_option("detach", True)
        super(Main, self).__init__(options=options)

        self.implicitly_wait(10)
        self.maximize_window()

        self.racing_host = os.environ.get('REACING_HOST')
        self.racing_result_url = os.environ.get('RACING_RESULT_URL')

    def __exit__(self, exc_type, exc, traceback ):
        if self.isExit:
            self.quit()

    def connect_databse(self):
        try:
            conn = pymysql.connect(
                host=os.environ.get('DATABASE_HOST'),
                user=os.environ.get('DATABASE_USERNAME'),
                password=os.environ.get('DATABASE_PASSWORD'),
                db=os.environ.get('DATABASE_DATABASE'),
                port=int(os.environ.get('DATABASE_PORT')),
                use_unicode=True,
                charset="utf8",
            )
            engine = create_engine(
                "mysql+pymysql://"
                + os.environ.get('DATABASE_USERNAME')
                + ":"
                + os.environ.get('DATABASE_PASSWORD')
                + "@"
                + os.environ.get('DATABASE_HOST')
                + ":"
                + str(os.environ.get('DATABASE_PORT'))
                + "/"
                + os.environ.get('DATABASE_DATABASE')
                + "?charset=utf8"
            )
            cursor = conn.cursor()
            print("connect database successfully")
        except ValueError  as e:
            print("Can't connect database: ", e)
            sys.exit(1)
        return conn, cursor, engine
    
    def check_exists_table(self, checking_table_name, create_table_query):
        check_query = f"select count(*) from information_schema.TABLES where table_name = '{checking_table_name}'"
        isExists = pd.read_sql(check_query, con=self.engine).values[0][0]
        if not isExists:
            self.cursor.execute(create_table_query)
            
    def initalize_database(self):
        create_table_races_query = """CREATE TABLE result (id INT NOT NULL AUTO_INCREMENT, pos VARCHAR(255),  no VARCHAR(255), driver VARCHAR(255), nationality VARCHAR(255), car VARCHAR(255), laps VARCHAR(255), retired VARCHAR(255), pts INT, date VARCHAR(255), location VARCHAR(255), location_key VARCHAR(255), year VARCHAR(255), PRIMARY KEY (id));"""
        self.check_exists_table('result', create_table_races_query)

        # todo

    def go_to_racing_result_page(self):
        self.get(self.racing_result_url)
        
    def accept_cookie(self):
        try:
            btn_element = self.find_element(By.CLASS_NAME, 'trustarc-agree-btn')
            btn_element.click()
        except:
            print('Already accept cookie')

    def get_total_url_and_data_value_on_filter(self, index):
        result_links = []
        html = self.page_source
        soup = BeautifulSoup(html, "html.parser")

        filter_elements = soup.find_all('div', 'resultsarchive-filter-wrap')
        if filter_elements:
            filter_element = filter_elements[index]
            li_elements = filter_element.find('ul', 'resultsarchive-filter').find_all('li', 'resultsarchive-filter-item')
            
            for li in li_elements:
                link = li.find('a').get('href')
                link_key = li.find('a').get('data-value')
                detail_value = li.find('a').find('span', 'clip').text

                result_links.append((link, link_key, detail_value))

        return result_links  
    
    def go_to_url_for_crawling(self):
        year_list = self.get_total_url_and_data_value_on_filter(POSTION_0_ON_FILTER)

        if len(year_list) > 0:
            for year_tuple in year_list:
                year_link, year_key, year_value = year_tuple
                year_url_for_crawl =  self.racing_host + year_link
                self.get(year_url_for_crawl)

                category_list = self.get_total_url_and_data_value_on_filter(POSTION_1_ON_FILTER)
                if len(category_list) > 0:
                    for category_tuple in category_list:
                        category_link, category_key, category_value = category_tuple
                        category_url_for_crawl =  self.racing_host + category_link
                
                        if category_key in [RACES, DRIVERS]:
                            self.get(category_url_for_crawl)

                            detail_list = self.get_total_url_and_data_value_on_filter(POSTION_2_ON_FILTER)
                            if len(detail_list) > 0:
                                if category_key == RACES:
                                    specific_detail_list = detail_list[1:] # discard all value
                                    for specific_detail_tuple in specific_detail_list:
                                        detail_link, link_key, detail_value = specific_detail_tuple
                                        detail_url_for_crawl =  self.racing_host + detail_link
                                        self.get(detail_url_for_crawl)

                                        self.crawl_result_racing(category_key, link_key, detail_value, year_key)
                                elif category_key == DRIVERS:
                                    specific_detail_tuple = detail_list[0]
                                    detail_link, link_key, detail_value = specific_detail_tuple
                                    detail_url_for_crawl =  self.racing_host + detail_link
                                    self.get(detail_url_for_crawl)
                                    self.crawl_result_racing(category_key, link_key, detail_value, year_key)


        else: 
            print('No data for crawling')

    def crawl_result_racing(self, category_key, link_key, detail_value, year_value):
        if category_key == RACES:
            df =  self.crawl_result_racing_with_races_table()
            if df:
                df = pd.DataFrame(df)
                df['year'] = year_value
                df['location'] = detail_value
                df['location_key'] = link_key

                self.upsert_races_into_database(df)
        elif category_key == DRIVERS:
            df = self.crawl_result_racing_with_driver_table()
            if df:
                df = pd.DataFrame(df)
                df['year'] = year_value

                self.update_drivers_into_database(df)
    
    def crawl_result_racing_with_races_table(self):
        races_df =  copy.deepcopy(define.races_df) 
        html = self.page_source
        soup = BeautifulSoup(html, "html.parser")

        table_element = soup.find('table', 'resultsarchive-table')
        if table_element:
            date = soup.find('div', 'resultsarchive-content-header').find('p', "date").find('span', 'full-date').text.strip()
            tbody_element = table_element.find('tbody')

            rows = tbody_element.find_all('tr')

            for row in rows:
                th_element = row.find_all('td')

                pos = th_element[1].text.strip()
                no = th_element[2].text.strip()

                driver_elements = th_element[3].find_all('span')
                driver = driver_elements[0].text.strip() + " " + driver_elements[1].text.strip() 

                car = th_element[4].text.strip()
                laps = th_element[5].text.strip()

                retired = th_element[6].text.strip()

                pts = th_element[7].text.strip()

                races_df['pos'].append(pos)
                races_df['no'].append(no)
                races_df['driver'].append(driver)
                races_df['car'].append(car)
                races_df['laps'].append(laps)
                races_df['retired'].append(retired)
                races_df['pts'].append(pts)
                races_df['date'].append(date)

            return races_df
        return None
    
    def crawl_result_racing_with_driver_table(self):
        driver_df =  copy.deepcopy(define.drivers_df) 
        html = self.page_source
        soup = BeautifulSoup(html, "html.parser")

        table_element = soup.find('table', 'resultsarchive-table')
        if table_element:
            tbody_element = table_element.find('tbody')

            rows = tbody_element.find_all('tr')

            for row in rows:
                th_element = row.find_all('td')
                driver_elements = th_element[2].find_all('span')
                driver = driver_elements[0].text.strip() + " " + driver_elements[1].text.strip()    

                nationality = th_element[3].text.strip()

                driver_df['driver'].append(driver)
                driver_df['nationality'].append(nationality)
             
            return driver_df
        return None
    
    def upsert_races_into_database(self, df):
        for index, row in df.iterrows():
            pos = row['pos']
            no = row['no']
            car = row['car']
            laps = row['laps']
            retired = row['retired']
            pts = row['pts']
            date = row['date']
            driver = row['driver']
            location = row['location']
            location_key = row['location_key']
            year = row['year']

            check_row_exists_query = f"SELECT id FROM result WHERE driver = '{driver}' AND location_key = '{location_key}' AND year = '{year}'"
            db_data = pd.read_sql(check_row_exists_query, con=self.engine)
            
            if len(db_data) > 0:
                id = db_data['id'].values[0]
                update_query = f"UPDATE result SET pos = '{pos}', no = '{no}', car = '{car}', laps = '{laps}', retired = '{retired}', pts = '{pts}', date = '{date}' WHERE id = {id}" 

                self.cursor.execute(update_query)
            else:
                insert_query = f"INSERT INTO result (pos, no, car, laps, retired, pts, date, driver, location, location_key, year) VALUES ('{pos}', '{no}', '{car}', '{laps}', '{retired}', '{pts}', '{date}', '{driver}', '{location}', '{location_key}', '{year}')"
                
                self.cursor.execute(insert_query)
        self.cursor.execute("commit;") 
    
    def update_drivers_into_database(self, df):
        for index, row in df.iterrows():
            driver = row['driver']
            nationality = row['nationality']
            year = row['year']

            check_row_exists_query = f"SELECT id FROM result WHERE driver = '{driver}' AND year = '{year}'"
            db_data = pd.read_sql(check_row_exists_query, con=self.engine)

            if len(db_data) > 0:
                id = db_data['id'].values[0]
                update_query = f"UPDATE result SET nationality = '{nationality}' WHERE driver = '{driver}' AND year = '{year}'" 

                self.cursor.execute(update_query)
        self.cursor.execute("commit;") 

