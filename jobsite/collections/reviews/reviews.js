// Review schema definition

class ReviewsCollection extends Mongo.Collection {
	// Overwrite super class to modify our intended behaviours
 	// We will probably modify these functions later
	insert(review, callback) {
    return super.insert(review, callback);
  }

  update(selector, modifier, callback) {
    return super.update(selector, modifier, callback);
  }

	remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

Reviews = new ReviewsCollection('Reviews');

Reviews.deny({
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

ReviewsSchema = new SimpleSchema({
	// Table Data
	companyId: {
		type: String,
		optional: true
	},
	content: {
		type: String,
		optional: true
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

Reviews.attachSchema( ReviewsSchema );

Reviews.publicFields = {
  removed_at: 0
};

Reviews.helpers({

});
