Template.profile.onRendered(function() {

});

Template.profile.helpers({
  progressOvertime() {
    return 'over' + Template.instance().data.index 
  },
  progressVacation() {
    return 'vaca' + Template.instance().data.index
  },
  radarId() {
    return 'radar' + Template.instance().data.company._id 
  },
  pathForCompany() {
    var company = Template.instance().data.company
    var params = {
        id: company._id
    }
    var routeName = "companyDetail"
    var path = FlowRouter.path(routeName, params)

    return path
  },
  inDetail() {
    return FlowRouter.current().route.name == 'companyDetail'
  }
});
