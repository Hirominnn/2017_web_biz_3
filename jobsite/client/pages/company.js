Template.company.onCreated(function() {
  resetSessions()
});

Template.company.helpers({
  company() {
		const _id = FlowRouter.getParam("id")
		return Companies.findOne({_id})
  },
	reviews() {
    const companyId = FlowRouter.getParam("id")
    const reviewFilters = Session.get('reviewFilters') ? Session.get('reviewFilters') : {companyId}
    const reviewLimit = Session.get('reviewLimit') ? Session.get('reviewLimit') : {limit: 4}
  	return Reviews.find(reviewFilters, reviewLimit).fetch()
  },
  reports() {
    const companyId = FlowRouter.getParam("id")
    const reportFilters = Session.get('reportFilters') ? Session.get('reportFilters') : {companyId}
    const reportLimit = Session.get('reportLimit') ? Session.get('reportLimit') : {limit: 4}
  	return Reports.find(reportFilters, reportLimit).fetch()
  },
  searching() {
    if (Session.get('reviewFilters') ) {
      if (Session.get('reviewFilters').content['$regex'] == '') {
        return true
      }
    } else {
      return true
    }
    return false
  }
});
