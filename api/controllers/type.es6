import * as PokemonType from '../db/pokemon-type.es6';

/**
 * Creates a type object
 *
 * @param {String} name: type of the pokemon
 * @returns {Promise}: the created pokemonItem
 * @private
 */
export async function create(name) {
  return await PokemonType.create({name});
}

/**
 * Finds an object from an objectId
 *
 * @param {objectId} _id: the id to search with
 * @returns {Promise} returns the type found with the id
 */
export async function findOneByObjectId(_id) {
  return await PokemonType.findOne({_id});
}

/**
 * Finds a type by its name
 *
 * @param {String} name: the name to query with
 * @returns {Promise} the type found with the name
 */
export async function findByName(name) {
  return await PokemonType.findOne({name});
}

/**
 * Finds pokemon type given the conditions
 *
 * @param {Object} conditions: conditions to query by
 * @param {Number} limit: the number of pokemon to find
 * @param {Array<String>} populateFields: the fields to populate
 * @returns {PokemonType}: the found Pokemon (multiple)
 * @private
 */
export async function _find(conditions, limit, populateFields = []) {
  return await PokemonType.find(conditions, limit, populateFields);
}
