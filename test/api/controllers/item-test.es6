import {clear} from '../../../models/mongo/index.es6';
import assert from 'assert';
import * as User from '../../../api/controllers/user.es6';
import * as Item from '../../../api/controllers/item.es6';

describe('Item API', () => {
  const name = 'Nav';
  const transactionType = 'trade';
  const photoUrl = 'k';
  const fbId = 'the fbId';

  beforeEach(async () => {
    await clear();
  });

  describe('#create()', () => {
    it('should successfully create an item', async() => {
      await User.createFbUser(fbId);
      const checkItem = await Item.create(name, transactionType, photoUrl, fbId);
      assert.equal(checkItem.name, name);
      assert.equal(checkItem.defaultPhoto, photoUrl);
    });

    it('should successfully create an item with a price', async() => {
      await User.createFbUser(fbId);
      const checkItem = await Item.create(name, transactionType, photoUrl, fbId, {price: 69});
      assert.equal(checkItem.name, name);
      assert.equal(checkItem.defaultPhoto, photoUrl);
      assert.equal(checkItem.price, 69);
    });

    it('should successfully create an item with a status', async() => {
      await User.createFbUser(fbId);
      const checkItem = await Item.create(name, transactionType, photoUrl, fbId, {status: 'sold'});
      assert.equal(checkItem.name, name);
      assert.equal(checkItem.defaultPhoto, photoUrl);
      assert.equal(checkItem.status, 'sold');
    });

    it('should fail to create an item with a non number price', async() => {
      await User.createFbUser(fbId);
      try {
        await Item.create(name, transactionType, photoUrl, fbId, {price: '1 nav'});
      } catch (e) {
        return;
      }
      assert(false);
    });

    it('should fail to create an item with an invalid status', async() => {
      await User.createFbUser(fbId);
      try {
        await Item.create(name, transactionType, photoUrl, fbId, {status: '1 nav'});
      } catch (e) {
        return;
      }
      assert(false);
    });
  });

  describe('#findById', () => {
    it('should successfully find an item', async() => {
      await User.createFbUser(fbId);
      const checkItem = await Item.create(name, transactionType, photoUrl, fbId, {price: 69});
      await Item.create('navnav', transactionType, photoUrl, fbId, {price: 69});
      const foundItem = await Item.findById(checkItem._id);
      assert.deepEqual(checkItem._id, foundItem._id);
    });
  });

  describe('#changeStatus', () => {
    it('should successfully set the status of an object', async () => {
      const status = 'sold';
      await User.createFbUser(fbId);
      const item = await Item.create(name, transactionType, photoUrl, fbId, {price: 69});
      const checkItem = await Item.changeStatus(item._id, {status});
      assert.equal(checkItem.status, status);
    });
    it('should fail to set the status if not one of the enums', async () => {
      const status = 'NAV';
      await User.createFbUser(fbId);
      const item = await Item.create(name, transactionType, photoUrl, fbId, {price: 69});
      try {
        await Item.changeStatus(item._id, {status});
      } catch (e) {
        return;
      }
      assert(false);
    });
  });

  describe('#updateByObjectId', () => {
    it('should successfully set the status of an object', async () => {
      const fields = {
        price: 29,
        status: 'sold'
      };
      await User.createFbUser(fbId);
      const item = await Item.create(name, transactionType, photoUrl, fbId, {price: 69});
      const checkItem = await Item.updateByObjectId(item._id, fields);
      assert.equal(checkItem.status, fields.status);
      assert.equal(checkItem.price, fields.price);
    });

    it('should successfully set the status of an object', async () => {
      const fields = {
        name: 'kevin'
      };
      await User.createFbUser(fbId);
      const item = await Item.create(name, transactionType, photoUrl, fbId, {price: 69});
      const checkItem = await Item.updateByObjectId(item._id, fields);
      assert.equal(checkItem.name, fields.name);
    });
  });
});
