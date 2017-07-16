// Report schema definition

class ReportsCollection extends Mongo.Collection {
	// Overwrite super class to modify our intended behaviours
 	// We will probably modify these functions later
	insert(report, callback) {
    return super.insert(report, callback);
  }

  update(selector, modifier, callback) {
    return super.update(selector, modifier, callback);
  }

	remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

Reports = new ReportsCollection('Reports');

Reports.deny({
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

ReportsSchema = new SimpleSchema({
	// Table Data
	companyId: {
		type: String,
		optional: true
	},
	data: {
		type: Object,
		optional: true,
		blackbox: true
	},
	importance: {
		type: String,
		optional: true
	},
	advice: {
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

Reports.attachSchema( ReportsSchema );

Reports.publicFields = {
  removed_at: 0
};

Reports.helpers({

});
