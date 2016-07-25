import * as Pokemon from '../db/pokemon.es6';
import _ from 'lodash';

/**
 * Creates a pokemon in the database
 *
 * @param {String} name: name of the pokemon
 * @param {Array<String>} types: types of the pokemon
 * @returns {Promise} the created Pokemon
 */
export async function create(name, types) {
  return await Pokemon.create({name, types});
}

/**
 * Finds a pokemon by its name
 *
 * @param {String} name: the name to query by
 * @returns {Promise}: the found Pokemon
 */
export async function findOneByName(name) {
  return await Pokemon.findOne(name);
}

/**
 * The types of the pokemon
 *
 * @param {String} name: the name to query by
 * @returns {Array<String>}: the found types
 */
export async function findTypesByName(name) {
  return await findOneByName(name).types;
}

/**
 * Finds pokemon given the conditions
 *
 * @param {Object} conditions: conditions to query by
 * @param {Number} limit: the number of pokemon to find
 * @param {Array<String>} populateFields: the fields to populate
 * @returns {Pokemon}: the found Pokemon (multiple)
 * @private
 */
export async function _find(conditions, limit, populateFields = []) {
  return await Pokemon.find(conditions, limit, populateFields);
}

/**
 * Finds all the pokemon given the conditions
 *
 * @param {Object} conditions: the conditions to query by
 * @returns {Pokemon}: the found pokemon
 */
export async function findAll(conditions = {}) {
  return await _find(conditions, 0);
}

/**
 * Finds all the pokemon of a given type
 *
 * @param {String} type: type to query by
 * @returns {Array<Object>} the pokemon with the given type
 */
export async function findPokemonByType(type) {
  const allPokemon = await findAll();
  const foundPokemon = [];
  _(allPokemon).forEach(pokemon => {
    if (pokemon.types.includes(type)) {
      foundPokemon.push(pokemon);
    }
  });
  return foundPokemon;
}
