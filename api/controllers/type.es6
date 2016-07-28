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

export async function findOneByObjectid(_id) {
  return await PokemonType.findOne({_id});
}

/**
 *
 * @param {String} name
 * @returns {Promise}
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

/**
 * Finds all pokemon types given the conditions
 *
 * @param {Object} conditions: the conditions to query by
 * @returns {PokemonType}: the found pokemon
 */
export async function findAll(conditions = {}) {
  return await _find(conditions, 0);
}
