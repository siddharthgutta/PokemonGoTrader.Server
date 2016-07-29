import * as PokemonItem from '../../../api/controllers/pokemonItem.es6';
import * as Pokemon from '../../../api/controllers/pokemon.es6';
import {clear} from '../../../models/mongo/index.es6';
import assert from 'assert';
import * as User from '../../../api/controllers/user.es6';
import * as Type from '../../../api/controllers/type.es6';


describe('PokemonItem API', () => {
  const name = 'Nav';
  const cp = 69;
  const transactionType = 'trade';
  const photoUrl = 'k';
  const fbId = 'the fbId';

  beforeEach(async () => {
    await clear();
  });

  describe('#create()', () => {
    it('should successfully create a pokemonItem', async() => {
      // need to create types
      const {_id: id1} = await Type.create('brown');
      const {_id: id2} = await Type.create('fairy');
      await Pokemon._create('Nav', [id1, id2]);
      await User.createFbUser(fbId);
      const check = await PokemonItem.create(name, cp, transactionType, photoUrl, fbId);
      assert.equal(name, check.name);
    });

    it('should fail to make a pokemonItem with an invalid name', async() => {
      try {
        const {_id: id1} = await Type.create('brown');
        const {_id: id2} = await Type.create('fairy');
        await Pokemon._create('Nav', [id1, id2]);
        await User.createFbUser(fbId);
        await PokemonItem.create('Jesse', cp, transactionType, photoUrl, fbId);
      } catch (e) {
        return;
      }
      assert(false);
    });

    it('should fail to make a pokemonItem with an invalid CP', async() => {
      try {
        const {_id: id1} = await Type.create('brown');
        const {_id: id2} = await Type.create('fairy');
        await Pokemon._create('Nav', [id1, id2]);
        await User.createFbUser(fbId);
        await PokemonItem.create('Jesse', 'the', transactionType, photoUrl, fbId);
      } catch (e) {
        return;
      }
      assert(false);
    });

    it('should fail to make a pokemonItem with an invalid photoUrl', async() => {
      try {
        const {_id: id1} = await Type.create('brown');
        const {_id: id2} = await Type.create('fairy');
        await Pokemon._create('Nav', [id1, id2]);
        await User.createFbUser(fbId);
        await PokemonItem.create('Jesse', cp, transactionType, 12, fbId);
      } catch (e) {
        return;
      }
      assert(false);
    });

    it('should fail to make a pokemonItem with an invalid trade type', async() => {
      try {
        const {_id: id1} = await Type.create('brown');
        const {_id: id2} = await Type.create('fairy');
        await Pokemon._create('Nav', [id1, id2]);
        await User.createFbUser(fbId);
        await PokemonItem.create('Jesse', cp, 'nav', photoUrl, fbId);
      } catch (e) {
        return;
      }
      assert(false);
    });
  });

  describe('#_updateByObjectId()', () => {
    it('should successfully update a pokemonItem', async() => {
      const {_id: id1} = await Type.create('brown');
      const {_id: id2} = await Type.create('fairy');
      await Pokemon._create('Nav', [id1, id2]);
      await User.createFbUser(fbId);
      const check = await PokemonItem.create(name, cp, transactionType, photoUrl, fbId);
      assert.equal(name, check.name);
      const updated = await PokemonItem._updateByObjectId(check._id, {name: 'kevin', status: 'sold'});
      assert.equal(updated.name, 'kevin');
      assert.equal(updated.status, 'sold')
    });
  });

  describe('#updateStatus()', () => {
    it('should successfully update the status of a pokemonItem', async() => {
      const {_id: id1} = await Type.create('brown');
      const {_id: id2} = await Type.create('fairy');
      await Pokemon._create('Nav', [id1, id2]);
      await User.createFbUser(fbId);
      const status = 'sold';
      const check = await PokemonItem.create(name, cp, transactionType, photoUrl, fbId);
      assert.equal(name, check.name);
      const updated = await PokemonItem.updateStatus(check._id, status);
      assert.equal(updated.status, status);
    });

    it('should fail to update the status of a pokemonItem with an invalid status', async() => {
      const {_id: id1} = await Type.create('brown');
      const {_id: id2} = await Type.create('fairy');
      await Pokemon._create('Nav', [id1, id2]);
      await User.createFbUser(fbId);
      const check = await PokemonItem.create(name, cp, transactionType, photoUrl, fbId);
      assert.equal(name, check.name);
      try {
        await PokemonItem.updateStatus(check._id, 'nav');
      } catch (e) {
        return;
      }
      assert(false);
    });
  });

  describe('#findById()', () => {
    it('should successfully find a pokemonItem from its Id', async() => {
      const {_id: id1} = await Type.create('brown');
      const {_id: id2} = await Type.create('fairy');
      await Pokemon._create('Nav', [id1, id2]);
      await User.createFbUser(fbId);
      const {_id} = await PokemonItem.create(name, cp, transactionType, photoUrl, fbId);
      const foundPokemonItem = await PokemonItem.findById(_id);
      assert.equal(foundPokemonItem.name, name);
      assert.deepEqual(foundPokemonItem._id, _id);
    });

    it('should fail to find a non-existent  pokemonItem', async() => {
      const {_id: id1} = await Type.create('brown');
      const {_id: id2} = await Type.create('fairy');
      await Pokemon._create('Nav', [id1, id2]);
      await User.createFbUser(fbId);
      await PokemonItem.create(name, cp, transactionType, photoUrl, fbId);
      try {
        await PokemonItem.findById('lolDNE');
      } catch (e) {
        return;
      }
      assert(false);
    });
  });
});
