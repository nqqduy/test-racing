# CRAWLING RACING F1 WEBSITE

This is a program to crawl website data at the [link](https://www.formula1.com/en/results.html/2023/races.html)

## INSTALL

1. Ensure that you have **Python** installed on your computer.
2. Install **git**
3. Install **mysql**
4. Install the following libraries by running the following commands

```sh
$ pip install bs4
```

```sh
$ pip install selenium
```

```sh
$ pip install python-dotenv
```

```sh
$ pip install pandas
```

```sh
$ pip install pymysql
```

```sh
$ pip install cryptography
```

```sh
$ pip install sqlalchemy
```

## USER MANUAL

1. Clone this repository by running the following command:

```sh
$ git clone https://github.com/nqqduy/test-racing.git
```

2. Navigate to the crawling folder:

```sh
$ cd test-racing/crawling
```

3. Verify the database configuration in the .env file.
4. Run the following command to execute the program:

```sh
$ python index.py
```

## FOLDER STRUCTURE

- `src/`: Directory that contains the source code of the program.
  - `main.py`: Main file of the program.
  - `df.py`: File that config dataframe
  - `constant`: Directory that contains constant file.
- `.env`: File that stores environment variables.

## NOTES

I think I am not necessary to crawl all the data. I only crawl the data from the "race" section, so i have enough data to handle features related to drivers and teams. However, if i also require information about the nationality of the drivers, i would need to additionally crawl the "driver" section. <br>
<br>
**This is result for crawling** <br>
Link: https://drive.google.com/file/d/18bXbMUNwKGnPCo2MVtfcRET3Q0jRLWix/view
![This is result for crawling](https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/354046020_3362493940710141_5060751229745493466_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=0d5531&_nc_ohc=cLV8K6MUHlcAX9LzImH&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCTYgd-22JQLdaqpHpZyMCcHBqdQZW9OkQeFLvd8tD1NQ&oe=648F908F)
