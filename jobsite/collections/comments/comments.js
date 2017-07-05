// Comment schema definition

class CommentsCollection extends Mongo.Collection {
	// Overwrite super class to modify our intended behaviours
 	// We will probably modify these functions later
	insert(comment, callback) {
    return super.insert(comment, callback);
  }

  update(selector, modifier, callback) {
    return super.update(selector, modifier, callback);
  }

	remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

Comments = new CommentsCollection('Comments');

Comments.deny({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  }
});

CommentsSchema = new SimpleSchema({
	// Table Data
	name: {
		type: String,
		label: 'Title'
	},
	content: {
		type: String,
	},
	tags: {
		type: [String],
		optional: true,
	},
	
	// Timestamps
	created_at: {
		type: Date,
		autoValue: function() {
			return new Date()
		},
	},
	updated_at: {
		type: Date,
		autoValue: function() {
			return new Date()
		},
	}
})

Comments.attachSchema( CommentsSchema );

Comments.publicFields = {
  removed_at: 0
};

Comments.helpers({

});
