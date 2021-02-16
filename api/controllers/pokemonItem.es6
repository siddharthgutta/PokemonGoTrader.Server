import * as PokemonItem from '../db/pokemonItem.es6';
import * as Pokemon from './pokemon.es6';
import * as User from './user.es6';
import * as Type from './type.es6';
import _ from 'lodash';

/**
 * Checks to see if a pokemon name is valid
 * @param {String} name: the name of the pokemon to look for
 * @returns {*}: true if it passes and an Error if it fails
 */
async function checkPokemon(name) {
  try {
    await Pokemon.findOneByName(name);
    return true;
  } catch (err) {
    return Error;
  }
}

/**
 * Checks to see if a pokemon name is valid
 * @param {String} name: the name of the pokemon to look for
 * @returns {*}: true if it passes and an Error if it fails
 */
async function checkPokemon(name) {
  try {
    await Pokemon.findOneByName(name);
    return true;
  } catch (err) {
    return Error;
  }
}

/**
 * Creates a pokemonItem
 *
 * @param {String} name: name of the pokemon
 * @param {Array<String>} types: types of the pokemon
 * @param {Number} combatPower: combat power of the pokemon
 * @param {String} transactionType: transaction type of the pokemon item
 * @param {String} defaultPhoto: photo of the pokemon item
 * @param {String} fbId: fbId of the user
 * @param {Object} optional: optional attributes
 * @returns {Promise}: the created pokemonItem
 * @private
 */
export async function _create(name, types, combatPower, transactionType, defaultPhoto, fbId, optional) {
  const {_id} = await User.findOneByFbId(fbId);
  PokemonItem.addValidator('name', checkPokemon);
  return await PokemonItem.create({name, types, combatPower, transactionType, defaultPhoto, user: _id, ...optional});
}

/**
 * Creates a pokemonItem
 *
 * @param {String} name: name of the pokemon
 * @param {Number} combatPower: combat power of the pokemon
 * @param {String} transactionType: transaction type of the pokemon item
 * @param {String} defaultPhoto: photo of the pokemon item
 * @param {String} fbId: fbId of the user
 * @param {Object} optional: optional attributes
 * @returns {Promise}: the created pokemonItem
 */
export async function create(name, combatPower, transactionType, defaultPhoto, fbId, optional = {}) {
  const types = await Pokemon.findTypesByName(name);
  return await _create(name, types, combatPower, transactionType, defaultPhoto, fbId, optional);
}

/**
 * Updates a Pokemon Item
 *
 * @param {objectId} _id: the id of the Pokemon Item to update
 * @param {Object} updatedFields: the fields to update the Pokemon Item with
 * @returns {Promise} the updated Pokemon item
 * @private
 */
export async function _updateByObjectId(_id, updatedFields) {
  return await PokemonItem.findOneAndUpdate({_id}, {$set: updatedFields}, {runValidators: true, new: true});
}

/**
 * Updates the status of the Pokemon item
 *
 * @param {objectId} _id: the id of the Pokemon Item to update
 * @param {String} status: the update to the status
 * @returns {Promise} the updated Pokemon item
 */
export async function updateStatus(_id, status) {
  return await PokemonItem.findOneAndUpdate({_id}, {status}, {runValidators: true, new: true});
}

/**
 * Finds a single PokemonItem from an _id
 *
 * @param {objectId} _id: the Id of the PokemonItem
 * @returns {Promise} the found PokemonItem
 */
export async function findById(_id) {
  return await PokemonItem.findOne({_id});
}

/**
 * Finds pokemon given the conditions
 *
 * @param {Object} conditions: conditions to query by
 * @param {Number} limit: the number of pokemon to find
 * @param {Array<String>} populateFields: the fields to populate
 * @returns {PokemonItem}: the found Pokemon (multiple)
 * @private
 */
export async function _find(conditions, limit, populateFields = []) {
  return await PokemonItem.find(conditions, limit, populateFields);
}

/**
 * Finds all the pokemonitems given the conditions
 *
 * @param {Object} conditions: the conditions to query by
 * @returns {PokemonItem}: the found pokemonitem
 */
export async function findAll(conditions = {}) {
  return await _find(conditions, 0);
}

/**
 * Finds all the pokemonitems with a pokemon of a given type
 *
 * @param {String} type: type to query by
 * @param {String} fbId: fbId of the user
 * @param {Number} maxDistance: the maximum distance to query by
 * @param {Number} limit: how many closest pokemon to find
 * @returns {Array<Object>} the pokemonitems with the given type
 */
export async function findClosestPokemonByType(type, fbId, maxDistance, limit) {
  const {_id} = await Type.findByName(type);
  const allPokemonItems = await findAll();
  const foundPokemon = [];
  for (const item of allPokemonItems) {
    const distance = User.findDistanceFromUser(fbId, item.user);
    if (item.types.includes(_id) && distance < maxDistance) {
      foundPokemon.push(item);
    }
  }
  return foundPokemon.slice(0, limit);
}

/**
 * Finds all the pokemonitems with a pokemon of a given name
 *
 * @param {String} name: the name of the pokemon to query by
 * @param {String} fbId: fbId of the user
 * @param {Number} maxDistance: the maximum distance to query by
 * @param {Number} limit: how many closest pokemon to find
 * @returns {Array<Object>} the pokemonitems with the given name
 */
export async function findClosestPokemonByName(name, fbId, maxDistance, limit) {
  let pokemonName;
  try {
    const pokemon = await Pokemon.findOneByName(name);
    pokemonName = pokemon.name;
  } catch (e) {
    throw new Error('Invalid Pokemon name');
  }
  const allPokemonItems = await findAll();
  const foundPokemon = [];
  for (const item of allPokemonItems) {
    const distance = User.findDistanceFromUser(fbId, item.user);
    if (item.name === pokemonName && distance < maxDistance) {
      foundPokemon.push(item);
    }
  }
  return foundPokemon.slice(0, limit);
}
