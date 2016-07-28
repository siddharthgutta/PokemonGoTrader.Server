import models from '../../models/mongo/index.es6';
import * as Utils from '../../libs/utils.es6';


const PokemonType = models.PokemonType;

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
  return await (new PokemonType(attributes)).save();
}

/**
 * Returns a single pokemon given a query
 *
 * @param {Object} attributes: key value pairs of the attributes we want to query by
 * @returns {Promise}: returns the Pokemon found
 */
export async function findOne(attributes) {
  const type = await PokemonType.findOne(attributes).exec();
  if (Utils.isEmpty(type)) {
    throw new Error(`Could not find pokemon with attributes:${attributes}`);
  }
  return type;
}