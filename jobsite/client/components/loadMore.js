Template.loadMore.events({
  'click #company': function(e){
    e.preventDefault();
    let companyLimit = Session.get('companyLimit') ? Session.get('companyLimit') : {limit: 8};
    companyLimit = {limit: companyLimit.limit + 4}
    Session.set('companyLimit', companyLimit);
  },
  'click #review': function(e){
    e.preventDefault();
    let reviewLimit = Session.get('reviewLimit') ? Session.get('reviewLimit') : {limit: 4};
    reviewLimit = {limit: reviewLimit.limit + 4}
    Session.set('reviewLimit', reviewLimit);
  },
  'click #report': function(e){
    e.preventDefault();
    let reportLimit = Session.get('reportLimit') ? Session.get('reportLimit') : {limit: 4};
    reportLimit = {limit: reportLimit.limit + 4}
    Session.set('reportLimit', reportLimit);
  },
});