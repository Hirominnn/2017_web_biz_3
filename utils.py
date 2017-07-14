import requests
from bs4 import BeautifulSoup
import re
from config import gaishi, minshuu, vorkers
from selenium import webdriver
import selenium
import os
import numpy as np
import json


sr_list_page = "https://gaishishukatsu.com/company/%s/study"

class GaishiDriver(object):
    
    def __init__(self,):
        self.driver = webdriver.PhantomJS(service_log_path=os.path.devnull)
        self.es_list_page = None
        self.login()
        
    def login(self,):
        self.driver.get("https://gaishishukatsu.com/login")
        self.driver.implicitly_wait(1)
        username_field = self.driver.find_element_by_name("data[GsUser][email]")
        password_field = self.driver.find_element_by_name("data[GsUser][password]")
        username_field.send_keys(gaishi["email"])
        self.driver.implicitly_wait(1)
        password_field.send_keys(gaishi["password"])
        self.driver.implicitly_wait(1)
        self.driver.find_element_by_css_selector("#GsUserLoginForm > div._mt-md.content-center-button > p:nth-child(1) > button").click()
        
    def access_sr_list_page(self, company_number):
        self.driver.implicitly_wait(1)
        self.driver.get(sr_list_page % company_number)
        source = self.driver.page_source.encode('utf-8')
        self.sr_list_page = BeautifulSoup(source, "lxml")
        
    def get_sr_urls(self,):
        sr_urls = []
        es_list = self.sr_list_page.find_all("a", class_="_panel-content report-list")
        for es in es_list:
            url = es["ng-href"]
            print(url)
            if str(url).startswith("https://gaishishukatsu.com/selection_reports/"):
                sr_urls.append(url)
        return sr_urls
    
    def get_each_sr(self, sr_urls):
        srs = {"selection_reports": []}
        for sr_url in sr_urls:
            self.driver.implicitly_wait(1)
            self.driver.get(sr_url)
            source = self.driver.page_source.encode('utf-8')
            sr_page = BeautifulSoup(source, "lxml")
            try:
                importance = sr_page.find("td", class_="impression_importance").text
            except AttributeError:
                importance = ""
            try:
                advice = sr_page.find("td", class_="impression_advice").text
            except:
                advice = ""
            #srs[sr_url] = {"importance": importance, "advice": advice}        
            srs["selection_reports"].append({"importance": importance, "advice": advice})
        return srs



top_page = "https://www.vorkers.com/company.php?m_id=%s"
review_page = "https://www.vorkers.com/company_answer.php?m_id=%s&q_no=1"

class VorkersDriver(object):
    
    def __init__(self,):
        self.driver = webdriver.PhantomJS(service_log_path=os.path.devnull)
        self.top_page = None
        self.review_page = None
        self.dic = {}
        try:
            self.login()
        except selenium.common.exceptions.NoSuchElementException:
            pass

    def login(self,):
        self.driver.get("https://www.vorkers.com/login.php")
        self.driver.implicitly_wait(1)
        username_field = self.driver.find_element_by_name("_username")
        password_field = self.driver.find_element_by_name("_password")
        username_field.send_keys(vorkers["email"])
        self.driver.implicitly_wait(1)
        password_field.send_keys(vorkers["password"])
        self.driver.implicitly_wait(1)
        self.driver.find_element_by_css_selector("#log_in").click()
        print("login")
        
    def access_top_page(self, company_id):
        self.driver.implicitly_wait(1)
        self.driver.get(top_page % company_id)
        source = self.driver.page_source.encode('utf-8')
        self.top_page = BeautifulSoup(source, "lxml")
        print("top page")

    def get_score(self,):
        # レーダーチャートのスコア
        radar_elems = self.top_page.find("ul", class_="scoreList-8").find_all("li")
        self.dic["radar"] = {}
        radar_dic = self.dic["radar"]
        for radar_elem in radar_elems:
                key = radar_elem.find("dt").text
                score = radar_elem.find("dd").text
                radar_dic[key] = score
        # 総合評価
        self.dic["総合評価"] = self.top_page.find("span", property="v:average").text
        # 残業時間(月間)と有給休暇消化率
        zangyou, yuukyuu = self.top_page.find_all("dd", class_="d-ib t-r w-85")
        self.dic["残業時間(月間)"] = zangyou.text
        self.dic["有給休暇消化率"] = yuukyuu.text
        print("got score")
        
    def access_review_page(self, company_id):
        self.driver.implicitly_wait(1)
        self.driver.get(review_page % company_id)
        source = self.driver.page_source.encode('utf-8')
        self.review_page = BeautifulSoup(source, "lxml")
        print("review page 1")

    def get_reviews(self,):
        reviews = self.review_page.find_all("dd", class_="article_answer")
        review_arr = [review.text.strip("\n").strip() for review in reviews]
        next_pages = self.review_page.find_all("a", class_="paging_link-item")
        if len(next_pages):
            for i, next_page in enumerate(next_pages):
                print("review page ", i+2)
                self.driver.implicitly_wait(3)
                url = next_page.get("href")
                self.driver.get(url)
                source = self.driver.page_source.encode('utf-8')
                self.review_page = BeautifulSoup(source, "lxml")
                reviews = self.review_page.find_all("dd", class_="article_answer")
                review_arr += [review.text.strip("\n").strip() for review in reviews]
        self.dic["reviews"] = review_arr
        return self.dic

