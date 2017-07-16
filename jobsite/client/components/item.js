Template.item.onRendered(function() {

});

Template.item.helpers({
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
  },
  reviewCount() {
    return Reviews.find({companyId: Template.instance().data.company._id}).count()
  },
  reportCount() {
    return Reports.find({companyId: Template.instance().data.company._id}).count()
  }
});
