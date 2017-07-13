# ライブラリのインポート
#!/bin/env python
# coding:utf-8
#%matplotlib inline
#%matplotlib inline
import urllib3
import json
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from bs4 import BeautifulSoup
import requests
import MeCab as mc
from PIL import Image
def mecab_analysis(text):
    t = mc.Tagger('-Ochasen -d /usr/local/lib/mecab/dic/mecab-ipadic-neologd/')
    node = t.parseToNode(text)
    output = []
    while(node):
        if node.surface != "":  # ヘッダとフッタを除外
            word_type = node.feature.split(",")[0]
            if word_type in ["形容詞", "動詞","名詞", "副詞"]:
                output.append(node.surface)
        node = node.next
        if node is None:
            break
    return output

def create_wordcloud(text):

    # 環境に合わせてフォントのパスを指定する。
    #fpath = "/System/Library/Fonts/HelveticaNeue-UltraLight.otf"
    fpath = "/home/kajimura/aozoramincho-readme-ttf/AozoraMincho-bold.ttf"
    # ストップワードの設定
    stop_words = [  u'てる', u'いる', u'なる', u'れる', u'する', u'ある', u'こと', u'これ', u'さん', u'して', \
             u'くれる', u'やる', u'くださる', u'そう', u'せる', u'した',  u'思う',  \
             u'それ', u'ここ', u'ちゃん', u'くん', u'', u'て',u'に',u'を',u'は',u'の', u'が', u'と', u'た', u'し', u'で', \
             u'ない', u'も', u'な', u'い', u'か', u'ので', u'よう', u'']

    wordcloud = WordCloud(background_color="white", font_path=fpath,width=900, height=500, \
                          stopwords=set(stop_words)).generate(text)
    #plt.figure(figsize=(15,12))
    plt.imshow(wordcloud)
    plt.axis("off")
    #plt.show()
    filename = "output.png"
    plt.savefig(filename)

def get_wordlist_from_QiitaURL(url):
    res = requests.get(url)
    soup = BeautifulSoup(res.text,"html.parser")
    text = soup.body.section.get_text().replace('\n','').replace('\t','')
    return mecab_analysis(text)

def get_wordlist(filename):
    with open(filename, "r") as f:
        res = json.load(f)["reviews"]
    res=''.join(res)
    res = res.replace('\n','').replace('\t','')
    return mecab_analysis(res)

#print(reviews)
#url = "http://qiita.com/t_saeko/items/2b475b8657c826abc114"
wordlist = get_wordlist("mitsubishi_shouji.json")
create_wordcloud(" ".join(wordlist))
#print(wordlist)
