import {clear} from '../../../models/mongo/index.es6';
import assert from 'assert';
import * as Type from '../../../api/controllers/type.es6';

describe('Type API', () => {
  beforeEach(async () => {
    await clear();
  });

  describe('#create()', () => {
    const pokemonType = 'brown';

    it('should successfully create a type', async() => {
      const typeCheck = await Type.create(pokemonType);
      assert.equal(typeCheck.name, pokemonType);
    });
  });

  describe('#findOneByObjectId()', () => {
    const pokemonType = 'brown';

    it('should successfully find a type', async() => {
      const {_id} = await Type.create(pokemonType);
      const searchedPokemon = await Type.findOneByObjectId(_id);
      assert.deepEqual(_id, searchedPokemon._id);
    });

    it('should fail to find a type that does not exist', async() => {
      await Type.create(pokemonType);
      try {
        await Type.findOneByObjectId('nav');
      } catch (e) {
        return;
      }
      assert(false);
    });
    it('should fail to find a type if queried with a non-string', async() => {
      await Type.create(pokemonType);
      try {
        await Type.findOneByObjectId(69);
      } catch (e) {
        return;
      }
      assert(false);
    });
  });

  describe('#findByName()', () => {
    const pokemonType = 'brown';

    it('should successfully find a type', async() => {
      const {_id} = await Type.create(pokemonType);
      const searchedPokemon = await Type.findByName('brown');
      assert.deepEqual(_id, searchedPokemon._id);
    });

    it('should fail to find a type that does not exist', async() => {
      await Type.create(pokemonType);
      try {
        await Type.findByName('nav');
      } catch (e) {
        return;
      }
      assert(false);
    });

    it('should fail to find a type if uses a non-string', async() => {
      await Type.create(pokemonType);
      try {
        await Type.findByName(69);
      } catch (e) {
        return;
      }
      assert(false);
    });

    it('should fail to find a type if one is never made', async() => {
      try {
        await Type.findByName('nav');
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
});
