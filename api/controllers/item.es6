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
  const {_id} = User.findOneByFbId(fbId);
  return await Item.create({name, transactionType, defaultPhoto, user: _id, ...optional});
}

/**
 * Finds items by id
 *
 * @param {String} _id: id of the item to find
 * @param {Number} limit: the maximum number of items to find
 * @returns {Promise}: the found items
 */
export async function findById(_id, limit) {
  return await Item.find(_id, limit, {createdAt: 'descending'});
}

/**
 * Changes the status of the item
 *
 * @param {String} _id: the id of the item
 * @param {String} status: the new status of the item
 * @returns {Promise}: the updated item
 */
export async function changeStatus(_id, status) {
  return await Item.findOneAndUpdate({_id}, {$set: status}, {runValidators: true});
}
