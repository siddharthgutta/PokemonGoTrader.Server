import * as Pokemon from '../db/pokemon.es6';
import _ from 'lodash';
import * as Type from './type.es6';

/**
 * Creates a pokemon in the database
 *
 * @param {String} name: name of the pokemon
 * @param {Array} types: objectIds of the type pokemon
 * @returns {Promise} the created Pokemon
 */
export async function _create(name, types) {
  return await Pokemon.create({name, types});
}

/**
 *
 * @param {String} name: the name of the pokemon
 * @param {Array<String>} ptypes: an array of the type names
 * @returns {Promise} the created pokemon
 */
export async function create(name, ptypes) {
  const types = [];
  for (const type of ptypes) {
    try {
      const {_id} = await Type.findByName(type);
      types.push(_id);
    } catch (e) {
      throw new Error('Please input a valid type');
    }
  }

  return await Pokemon.create({name, types});
}

/**
 * Finds a pokemon by its name
 *
 * @param {String} name: the name to query by
 * @returns {Promise}: the found Pokemon
 */
export async function findOneByName(name) {
  return await Pokemon.findOne({name});
}

/**
 * Finds the types of the pokemon
 *
 * @param {String} name: the name to query by
 * @returns {Array<String>}: the found types
 */
export async function findTypesByName(name) {
  const pokemon = (await findOneByName(name)).types;
  const types = [];
  for (const type of pokemon) {
    types.push((await Type.findOneByObjectId(type)).name);
  }
  return types;
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
  const {_id} = await Type.findByName(type);
  const allPokemon = await findAll();
  const foundPokemon = [];
  _(allPokemon).forEach(pokemon => {
    if (pokemon.types.includes(_id)) {
      foundPokemon.push(pokemon);
    }
  });
  return foundPokemon;
}
