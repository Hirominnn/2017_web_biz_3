FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("app", {content: "home"});
  }
});

FlowRouter.route('/company', {
  action: function() {
    BlazeLayout.render("app", {content: "company"});
  }
});

// helpers
Template.registerHelper("log", function(something) {
  console.log('view:', something);
});