import * as Item from '../db/item.es6';
import * as User from './user.es6';

/**
 * Creates an Item
 *
 * @param {String} name: name of the item
 * @param {String} transactionType: type of transaction
 * @param {String} defaultPhoto: link to photo of the item
 * @param {String} fbId: the fbid of the user who added the item
 * @param {Object} optional: optional attributes of the item
 * @returns {Promise|Item}: the created item
 */
export async function create(name, transactionType, defaultPhoto, fbId, optional = {}) {
  const {_id} = await User.findOneByFbId(fbId);
  return await Item.create({name, transactionType, defaultPhoto, user: _id, ...optional});
}

/**
 * Finds items by id
 *
 * @param {String} _id: id of the item to find
 * @returns {Promise}: the found items
 */
export async function findById(_id) {
  return await Item.findOne(_id);
}

/**
 * Changes the status of the item
 *
 * @param {String} _id: the id of the item
 * @param {Object} status: the new status of the item FIX
 * @returns {Promise}: the updated item
 */
export async function changeStatus(_id, status) {
  return await Item.findOneAndUpdate({_id}, status, {runValidators: true, new: true});
}

/**
 * Changes the status of the item
 *
 * @param {String} _id: the id of the item
 * @param {Object} updatedFields: the updated fields for the object
 * @returns {Promise}: the updated item
 */
export async function updateByObjectId(_id, updatedFields) {
  return await Item.findOneAndUpdate({_id}, {$set: updatedFields}, {runValidators: true, new: true});
}
