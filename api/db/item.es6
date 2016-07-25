import models from '../../models/mongo/index.es6';
import _ from 'lodash';
import * as Utils from '../../libs/utils.es6';

const Item = models.Item;

/**
 * IMPORTANT: Must return promises!
 */

/**
 * Creates an Item
 *
 * @param {Object} attributes: key value pairs of the attributes we want to populate the User with
 * @returns {Promise}: returns a item object
 */
export async function create(attributes) {
  return await (new Item(attributes)).save();
}

/**
 * Returns a single item given a query
 *
 * @param {Object} attributes: key value pairs of the attributes we want to query by
 * @param {Number} limit: the maximum number of items to find
 * @param {Object} sortFields: key value pairs of the fields to sort by
 * @param {Array<String>} populateFields: the fields to populate
 * @returns {Promise}: returns the Item found
 */
export async function find(attributes, limit, sortFields, populateFields = []) {
  let findQuery = Item.find(attributes);
  findQuery = _.reduce(populateFields, (query, field) =>
			findQuery.populate(field),
		findQuery);
  const items = await findQuery.limit(limit).sort(sortFields).exec();
  if (Utils.isEmpty(items)) {
    throw new Error(`Could not find items with attributes:${attributes}`);
  }
  return items;
}

/**
 * Updates a item with specific conditions
 *
 * @param {Object} conditions: conditions to find the item by
 * @param {Object} updates: update actions to apply to the item object
 * @param {Object} options: options to apply to the query
 * @returns {Promise}: returns the item object
>>>>>>> Stashed changes
 */
export async function findOneAndUpdate(conditions, updates, options) {
  const item = await Item.findOneAndUpdate(conditions, updates, options).exec();
  if (Utils.isEmpty(item)) {
    throw new Error(`Could not find and update item with attributes: ${conditions} with updates ${updates}`);
  }
  return item;
}
