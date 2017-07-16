FlowRouter.route('/', {
	name: 'home',
  action: function() {
    BlazeLayout.render("app", {content: "home"});
  }
});

FlowRouter.route('/company/:id', {
	name: 'companyDetail',
  action: function() {
    BlazeLayout.render("app", {content: "company"});
  }
});

// helpers
Template.registerHelper("log", function(something) {
  console.log('view:', something);
});

this.resetSessions = function () {                                                                                     // 22
  Object.keys(Session.keys).forEach(function (key) {                                                                   // 23
    Session.set(key, undefined);                                                                                       // 23
  });                                                                                                                  // 23
  Session.keys = {};                                                                                                   // 24
}; 
