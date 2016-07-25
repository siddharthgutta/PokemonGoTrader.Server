import * as PokemonItem from '../db/pokemonItem.es6';
import * as Pokemon from './pokemon.es6';
import * as User from './user.es6';

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
  const {_id} = User.findOneByFbId(fbId);
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
 * Finds a pokemon item by name
 *
 * @param {String} name: name to query by
 * @returns {Promise}: the found pokemonItems
 */
export async function findByName(name) {
  return await PokemonItem.find({name});
}
