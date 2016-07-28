import models from '../../models/mongo/index.es6';
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
 * @returns {Promise}: returns the Item found
 */
export async function findOne(attributes) {
  const item = await Item.findOne(attributes).exec();
  if (Utils.isEmpty(item)) {
    throw new Error(`Could not find items with attributes:${attributes}`);
  }
  return item;
}

/**
 * Updates a item with specific conditions
 *
 * @param {Object} conditions: conditions to find the item by
 * @param {Object} updates: update actions to apply to the item object
 * @param {Object} options: options to apply to the query
 * @returns {Promise}: returns the item object
 */
export async function findOneAndUpdate(conditions, updates, options) {
  const item = await Item.findOneAndUpdate(conditions, updates, options).exec();
  if (Utils.isEmpty(item)) {
    throw new Error(`Could not find and update item with attributes: ${conditions} with updates ${updates}`);
  }
  return item;
}
