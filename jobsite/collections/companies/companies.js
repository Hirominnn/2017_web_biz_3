// company schema definition

class CompaniesCollection extends Mongo.Collection {
	// Overwrite super class to modify our intended behaviours
 	// We will probably modify these functions later
	insert(company, callback) {
    return super.insert(company, callback);
  }

  update(selector, modifier, callback) {
    return super.update(selector, modifier, callback);
  }

	remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

Companies = new CompaniesCollection('Companies');

Companies.deny({
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

CompaniesSchema = new SimpleSchema({
	// Table Data
	name: {
		type: String,
		optional: true
	},
	symbol: {
		type: String,
		optional: true
	},
	paidVacation: {
		type: Number,
		optional: true,
		decimal: true
	},
	overTime: {
		type: Number,
		optional: true,
		decimal: true
	},
	rating: {
		type: Number,
		optional: true,
		decimal: true
	},
	radar: {
		type: Object,
		optional: true,
		blackbox: true
	},
	lexRanks: {
		type: Array,
		optional: true,
	},
	'lexRanks.$': {
    type: String,
    blackbox: true
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

Companies.attachSchema( CompaniesSchema );

Companies.publicFields = {
  removed_at: 0
};

Companies.helpers({
	wordcloud() {
		return '/wordcloud_picture/' + this.symbol + '.png'
	},
	logo() {
		return '/logo/' + this.symbol + '.png'
	},
});
