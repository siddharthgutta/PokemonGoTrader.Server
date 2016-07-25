import models from '../../models/mongo/index.es6';
import _ from 'lodash';
import * as Utils from '../../libs/utils.es6';

const PokemonItem = models.PokemonItem;

/**
 * IMPORTANT: Must return promises!
 */

/**
 * Creates a pokemonItem
 *
 * @param {Object} attributes: key value pairs of the attributes we want to populate the User with
 * @returns {Promise}: returns a pokemonItem object
 */
export async function create(attributes) {
  return await (new PokemonItem(attributes)).save();
}

/**
 * Returns a single PokemonItem given a query
 *
 * @param {Object} attributes: key value pairs of the attributes we want to query by
 * @param {Number} limit: the maximum number of PokemonItems to find
 * @param {Object} sortFields: key value pairs of the fields to sort by
 * @param {Array<String>} populateFields: the fields to populate
 * @returns {Promise}: returns the PokemonItem found
 */
export async function find(attributes, limit, sortFields, populateFields = []) {
  let findQuery = PokemonItem.find(attributes);
  findQuery = _.reduce(populateFields, (query, field) =>
			findQuery.populate(field),
		findQuery);
  const pokemonItems = await findQuery.limit(limit).sort(sortFields).exec();
  if (Utils.isEmpty(pokemonItems)) {
    throw new Error(`Could not find pokemonItems with attributes:${attributes}`);
  }
  return pokemonItems;
}

/**
 * Updates a PokemonItem with specific conditions
 *
 * @param {Object} conditions: conditions to find the pokemonItem by
 * @param {Object} updates: update actions to apply to the pokemonItem object
 * @param {Object} options: options to apply to the query
 * @returns {Promise}: returns the pokemonItem object
 */
export async function findOneAndUpdate(conditions, updates, options) {
  const pokemonItem = await PokemonItem.findOneAndUpdate(conditions, updates, options).exec();
  if (Utils.isEmpty(pokemonItem)) {
    throw new Error(`Could not find and update pokemonItem with attributes: ${conditions} with updates ${updates}`);
  }
  return pokemonItem;
}
