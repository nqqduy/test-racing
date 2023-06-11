from src.main import Main

with Main() as racing:
    racing.go_to_racing_result_page()
    racing.accept_cookie()
    racing.go_to_url_for_crawling()
   