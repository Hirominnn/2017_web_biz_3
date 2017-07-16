import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  if (Companies.find().count() === 0) {
  	const companies = [
  		// 'apple', 
  		// 'bain', 
  		// 'bcg', 
  		'cyber_agent', 
  		'dena', 
  		'dentsu', 
  		'goldman_sachs', 
  		'google', 
  		'japan_ibm', 
  		'jp_morgan',
  		'keyence',
  		// 'm3',
  		'mckinsey',
  		'mitsubishi_shouji',
  		'mitsui_fudosan',
  		'works_applications'
  	]
  	companies.forEach((companyName) => {
			const reviewData = JSON.parse(Assets.getText('reviews/' + companyName + '.json'))
			const reportData = JSON.parse(Assets.getText('selection_reports/' + companyName + '.json'))
			const lexData = JSON.parse(Assets.getText('lex_rank_data/' + companyName + '.json'))
		  const company = {
		  	name: reviewData.name,
		  	symbol: companyName,
		  	paidVacation: parseFloat(reviewData['有給休暇消化率']),
		  	overTime: parseFloat(reviewData['残業時間(月間)']),
		  	rating: parseFloat(reviewData['総合評価']),
		  	lexRanks: lexData.rank,
		  	radar: {
		  		training: parseFloat(reviewData.radar['人材の長期育成']),
		  		recruit: parseFloat(reviewData.radar['人事評価の適正感']),
		  		upbeat: parseFloat(reviewData.radar['社員の士気']),
		  		law: parseFloat(reviewData.radar['法令順守意識']),
		  		salary: parseFloat(reviewData.radar['待遇面の満足度']),
		  		environment: parseFloat(reviewData.radar['20代成長環境']),
		  		ventilation: parseFloat(reviewData.radar['風通しの良さ']),
		  		respect: parseFloat(reviewData.radar['社員の相互尊重']),
		  	}
		  }
		  const companyId = Companies.insert(company)
		  reviewData.reviews.forEach((review) => {
				Reviews.insert({companyId, content: review})
		  })
		  reportData.selection_reports.forEach((report) => {
		  	Reports.insert({companyId, importance: report.importance, advice: report.advice})
		  })
  	})
	}
	console.log('done')
});
