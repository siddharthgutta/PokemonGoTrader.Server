import models from '../../models/mongo/index.es6';
import _ from 'lodash';
import * as Utils from '../../libs/utils.es6';

const Pokemon = models.Pokemon;

/**
 * IMPORTANT: Must return promises!
 */

/**
 * Creates a Pokemon
 *
 * @param {Object} attributes: key value pairs of the attributes we want to populate the Pokemon with
 * @returns {Promise}: returns a Pokemon object
 */
export async function create(attributes) {
  return await (new Pokemon(attributes)).save();
}

/**
 * Returns a single pokemon given a query
 *
 * @param {Object} attributes: key value pairs of the attributes we want to query by
 * @param {Array<String>} populateFields: the fields to populate
 * @returns {Promise}: returns the Pokemon found
 */
export async function findOne(attributes, populateFields = []) {
  let findQuery = Pokemon.findOne(attributes);
  findQuery = _.reduce(populateFields, (query, field) =>
			findQuery.populate(field),
		findQuery);
  const pokemon = await findQuery.exec();
  if (Utils.isEmpty(pokemon)) {
    throw new Error(`Could not find user with attributes:${attributes}`);
  }
  return pokemon;
}

export async function find(conditions, limit, populateFields = []) {
  let findQuery = Pokemon.find(conditions);
  findQuery = _.reduce(populateFields, (query, field) =>
		findQuery.populate(field), findQuery);
  if (limit <= 0) return await findQuery.exec();
  return await findQuery.limit(limit).exec();
}
