Template.FAB.onRendered(function() {
	$('.tooltipped').tooltip({delay: 50});
});

Template.FAB.events({
  'click .btn-floating.red.tooltipped': function(e){
    e.preventDefault();
    let sort = Session.get('sort') ? Session.get('sort') : {};
    sort = {'rating' : -1};
    Session.set('sort', sort);
  },
});