import * as Pokemon from '../../../api/controllers/pokemon.es6';
import * as Type from '../../../api/controllers/type.es6';
import {clear} from '../../../models/mongo/index.es6';
import assert from 'assert';

describe('PokemonItem API', () => {
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

    it('should fail to create a pokemon with a nonexistent type', async() => {
      const type2 = await Type.create('fairy');
      try {
        await Pokemon._create(name, ['slob on my nav', type2._id]);
      } catch (e) {
        return;
      }
      assert(false);
    });
  });

  describe('#create()', () => {
    it('should successfully create a pokemon', async() => {
      await Type.create('brown');
      await Type.create('fairy');
      const check = await Pokemon.create(name, ['fairy', 'brown']);
      assert.equal(name, check.name);
    });

    it('should fail to create a pokemon with a nonexistent type', async() => {
      await Type.create('fairy');
      try {
        await Pokemon.create(name, ['slob on my nav', 'fairy']);
      } catch (e) {
        return;
      }
      assert(false);
    });
  });

  describe('#findAll()', () => {
    it('should successfully find all pokemon', async() => {
      await Type.create('brown');
      await Type.create('fairy');
      await Type.create('normal');
      await Type.create('god');
      await Pokemon.create(name, ['fairy', 'brown']);
      await Pokemon.create('Sid', ['normal', 'brown']);
      await Pokemon.create('Jesse', ['normal', 'god']);
      const pokemonArray = await Pokemon.findAll();
      assert.equal(pokemonArray.length, 3);
    });
  });

  describe('#findPokemonByType()', () => {
    it('should successfully find a certain type', async() => {
      await Type.create('brown');
      await Type.create('fairy');
      await Type.create('normal');
      await Type.create('god');
      await Pokemon.create(name, ['fairy', 'brown']);
      await Pokemon.create('Sid', ['normal', 'brown']);
      await Pokemon.create('Jesse', ['normal', 'god']);
      const pokemonArray = await Pokemon.findPokemonByType('brown');
      assert.equal(pokemonArray.length, 2);
    });
  });

  describe('#findTypesByName()', () => {
    it('should successfully find a certain type', async() => {
      await Type.create('brown');
      await Type.create('fairy');
      await Pokemon.create(name, ['fairy', 'brown']);
      const types = await Pokemon.findTypesByName(name);
      assert.equal(types.length, 2);
      assert.equal(types[0], 'fairy');
      assert.equal(types[1], 'brown');
    });
  });
});
