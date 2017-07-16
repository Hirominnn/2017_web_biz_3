Template.home.onCreated(function() {
  resetSessions()
});

Template.home.helpers({
  companies() {
  	const companyFilters = Session.get('companyFilters') ? Session.get('companyFilters') : {}
		const companyLimit = Session.get('companyLimit') ? Session.get('companyLimit') : {limit: 8}
		const sort = Session.get('sort') ? Session.get('sort') : {}
		const options = {...companyLimit, sort}
  	return Companies.find(companyFilters, options).fetch()
  }
});
