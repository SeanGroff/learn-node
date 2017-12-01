const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
});

/**
 * slug will be auto-generated whenever someone saves a Store
 * .pre() is ran before any save of a Schema
 * this variable is the Store we are trying to Save
 */
storeSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    return next(); // skip if name has not been modified
  }
  /**
   * takes the name we passed to the storeSchema and runs it through the
   * slug npm package. Then sets the slug property to the resulting output from
   * the slug() method.
   *
   * https://www.npmjs.com/package/slugs
   */
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model('Store', storeSchema);
