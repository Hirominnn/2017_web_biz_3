
Template.nav.helpers({
  pathForHome() {
    var routeName = "home";
    var path = FlowRouter.path(routeName);
    return path;
  }
});
