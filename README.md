# 2017_web_biz_4
2017web工学Group4

## crawling
クローリングした結果は `data` ディレクトリに保存されています．

### 外資就活ドットコム(選考体験記)
- `data/selection_repotts` に企業ごとにjsonで格納．
- jsonの構造の例
```
{
	"name": "三菱商事",
	"selection_reports": [
		{"importance": "xxx", "advice": "yyy"},
		...,
	]
}
```

### Vorkers(企業スコア，口コミ)
#### スコア
- `data/reviews` に企業ごとにjsonで格納．
- 口コミが `reviews`に，企業スコアなどがそれ以外に格納されています．
- jsonの構造の例
```
{
	"name": "三菱商事",
	"残業時間(月間)": "96.0 h",
	"総合評価": "4.07",
	"有給休暇消化率": "67.0%",
	"radar": {
		'待遇面の満足度': '4.3', 
		'人事評価の適正感': '4.0', 
		'社員の相互尊重': '4.2', 
		'20代成長環境': '4.4', 
		'風通しの良さ': '3.8', 
		'法令順守意識': '3.7', 
		'社員の士気': '4.1', 
		'人材の長期育成': '3.1'},
	
	"reviews": [
		"xxxx", 
		... ,
		]
	]
}
```

### Run the Application
#### clone the repo
```
git clone https://github.com/Hirominnn/2017_web_biz_4.git
```
#### install meteor (for mac/linux)
```
curl https://install.meteor.com/ | sh
```
#### run it
```
meteor
```

