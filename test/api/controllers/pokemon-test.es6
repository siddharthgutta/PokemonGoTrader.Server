import * as Pokemon from '../../../api/controllers/pokemon.es6'
import * as Type from '../../../api/controllers/type.es6';
import {clear} from '../../../models/mongo/index.es6';
import assert from 'assert';

describe('PokemonItem API', () => {

  const fbId = 'the fbId';
  const name = 'Nav';

  beforeEach(async () => {
    await clear();
  });

  describe('#_create()', () => {
    it('should successfully create a pokemon', async() => {
      const type1 = await Type.create('brown');
      const type2 = await Type.create('fairy');
      const check = await Pokemon._create(name, [type1._id, type2._id]);
      assert.equal(name, check.name);
      assert.equal(type1.type, check.types[0].type);
    });
  });
  describe('#create()', () => {
    it('should successfully create a pokemon', async() => {
      const check = await Pokemon.create(name, ['fairy', 'brown']);
      assert.equal(name, check.name);
    });
  });
  describe('#findPokemonByType()', () => {
    it('should successfully find a certain type', async() => {
      await Pokemon.create(name, ['fairy', 'brown']);
      await Pokemon.create('Sid', ['normal', 'brown']);
      await Pokemon.create('Jesse', ['normal', 'fighting']);
      const pokemonArray = await Pokemon.findPokemonByType('brown');
      assert.equal(pokemonArray.length, 2);
    });
  });
});
