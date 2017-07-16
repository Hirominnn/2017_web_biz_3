Template.search.events({
  'keyup #search': function(e){
    e.preventDefault();
    if (FlowRouter.current().route.name == 'companyDetail') {
      let reviewFilters = Session.get('reviewFilters') ? Session.get('reviewFilters') : {};
      let reportFilters = Session.get('reportFilters') ? Session.get('reportFilters') : {};
      reviewFilters = {content: {$regex: e.target.value, $options: 'i'}};
      reportFilters = {$or: [{importance: {$regex: e.target.value, $options: 'i'}, advice: {$regex: e.target.value, $options: 'i'}}]};
      Session.set('reviewFilters', reviewFilters);
      Session.set('reportFilters', reportFilters);
    } else {
      let companyFilters = Session.get('companyFilters') ? Session.get('companyFilters') : {};
      companyFilters = {name: {$regex: e.target.value, $options: 'i'}};
      Session.set('companyFilters', companyFilters);
    }
  },
});