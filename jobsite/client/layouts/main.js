Template.app.helpers({
  inHome() {
    return FlowRouter.current().route.name == 'home'
  }
});
