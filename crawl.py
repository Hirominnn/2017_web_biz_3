import requests
from bs4 import BeautifulSoup
import re
from config import gaishi, minshuu, vorkers
from selenium import webdriver
import os
import numpy as np
import json
from utils import GaishiDriver, VorkersDriver
from dics import company_dics
import time

# 外資就活ドットコム
def crawl_gaishi(company_dics, done):
    SR_SAVE_FORMAT = "./data/selection_reports/%s.json"
    gaishi_driver = GaishiDriver()
    for company, company_dic in company_dics.items():
        if company in done:
            continue
        print()
        print(company)
        name = company_dic["name"]
        SR_SAVE_PATH = SR_SAVE_FORMAT % name
        gaishi_driver.access_sr_list_page(company_number=company_dic["gaishi"])
        sr_urls = gaishi_driver.get_sr_urls()
        srs = gaishi_driver.get_each_sr(sr_urls)
        srs["name"] = company
        with open(SR_SAVE_PATH, "w") as f:
            json.dump(srs, f)
        time.sleep(1)

def crawl_vorkers(company_dics, done):
    # Vorkers
    RV_SAVE_FORMAT = "./data/reviews/%s.json"
    vorkers_driver = VorkersDriver()
    for company, company_dic in company_dics.items():
        if company in done:
            continue
        print()
        print(company)
        name = company_dic["name"]
        RV_SAVE_PATH = RV_SAVE_FORMAT % name
        vorkers_driver.access_top_page(company_id=company_dic["vorkers"])
        try:
            vorkers_driver.get_score()
        except AttributeError:
            print(company, ": this company's page contains invalid HTML structure.")
            continue
        vorkers_driver.access_review_page(company_id=company_dic["vorkers"])
        dic = vorkers_driver.get_reviews()
        dic["name"] = company
        with open(RV_SAVE_PATH, "w") as f:
            json.dump(dic, f)
        time.sleep(1)

if __name__ == "__main__":
    done = ["三菱商事", "ボストン コンサルティング グループ", "サイバーエージェント", "エムスリー", "DeNA",
            "ベイン・アンド・カンパニー", "三井不動産", "電通", "マッキンゼー・アンド・カンパニー", "Gunosy",
            "日本IBM", "キーエンス", "Apple", "Google"] 
    #done = ["三菱商事", ]
    #crawl_gaishi(company_dic)
    crawl_vorkers(company_dics, done)

