import * as User from '../db/user.es6';
import * as Item from './item.es6';
import * as Context from './context.es6';

/**
 * Creates a user
 *
 * @param {String} contextId: the objectid of the context
 * @param {Object} optional: optional attributes of the user
 * @returns {Promise}: returns the created user
 * @private
 */
export async function _create(contextId, optional = {}) {
  return await User.create({context: contextId, ...optional});
}

/**
 * Creates a user
 *
 * @param {String} fbId: the fbid of the user
 * @param {Object} optional: optional attributes of the user
 * @returns {*} returns the created user
 */
export async function createFbUser(fbId, optional = {}) {
  const {_id: contextId} = await Context.create({...(optional.context)});
  return await _create(contextId, {fbId, ...(optional.user)});
}

/**
 * Finds one user by fields
 * @param {Object} fields: input fields/conditions to find a user by
 * @param {Object} populateFields: list of fields to populate
 * @returns {Promise}: user object if found
 * @private
 */
export async function findOneByFields(fields, populateFields = []) {
  return await User.findOne(fields, populateFields);
}

/**
 * Find and update a user from their facebook id with specified fields
 *
 * @param {String} _id: user's _id
 * @param {Object} fields: key/value pairs with updated fields
 * @returns {Promise} returns the producer without updates from the database
 */
export async function updateByObjectId(_id, fields) {
  return await User.findOneAndUpdate({_id}, {$set: fields}, {runValidators: true, new: true});
}

/**
 * Finds a user by their fbId
 *
 * @param {String} fbId: the facebook id of the user
 * @returns {Query|Promise|*} return the user from the database
 */
export async function findOneByFbId(fbId) {
  return await findOneByFields({fbId}, ['context']);
}

/**
 * Finds a user by their _id
 *
 * @param {String} _id: the facebook id of the user
 * @returns {Query|Promise|*} return the user from the database
 */
export async function findOneByObjectId(_id) {
  return await findOneByFields({_id}, ['context']);
}

/**
 * Find and update a user from their facebook id with specified fields
 *
 * @param {String} fbId: user's fbId
 * @param {Object} fields: key/value pairs with updated fields
 * @returns {User} returns the user without updates from the database
 */
export async function updateFieldsByFbId(fbId, fields) {
  return await User.findOneAndUpdate({fbId}, {$set: fields}, {runValidators: true});
}

/**
 * Adds an item to the user array of items
 *
 * @param {String} fbId: user's fbId
 * @param {String} itemId: item's fbId
 * @returns {User}: the updated user
 */
export async function addItem(fbId, itemId) {
  const user = await findOneByFbId(fbId);
  const item = await Item.findById(itemId);
  user.items.push(item);
  return await user.save();
}
