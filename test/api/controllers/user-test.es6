import * as User from '../../../api/controllers/user.es6';
import * as Item from '../../../api/controllers/item.es6';
import {clear} from '../../../models/mongo/index.es6';
import assert from 'assert';

describe('User DB API', () => {
  const fbId = 'The Fb ID';

  const firstName = 'Kevin';
  const lastName = 'Fu';
  const profileImage = 'profileimage.com';

  beforeEach(async () => {
    await clear();
  });

  describe('#create()', () => {
    it('should successfully create a user', async() => {
      const user = await User.createFbUser(fbId);
      assert.equal(user.fbId, fbId);
      assert.ok(user.context);
    });

    it('should successfully create a user with optional fields', async() => {
      const user = await User.createFbUser(fbId, {user: {firstName, lastName, profileImage, venmoId: '123'}});
      assert.equal(user.firstName, firstName);
      assert.equal(user.lastName, lastName);
      assert.equal(user.profileImage, profileImage);
      assert.equal(user.venmoId, '123');
      assert.equal(user.fbId, fbId);
      assert.ok(user.context);
    });
  });

  describe('#findOneByFbId()', () => {
    it('should successfully create a user', async() => {
      const createdUser = await User.createFbUser(fbId, {user: {firstName, lastName, profileImage, venmoId: '123'}});
      const searchedUser = await User.findOneByFbId(createdUser.fbId);
      assert.deepEqual(createdUser._id, searchedUser._id);
    });
  });

  describe('#findOneByObjectId()', () => {
    it('should successfully create a user', async() => {
      const {_id: id1} = await User.createFbUser(fbId, {user: {firstName, lastName, profileImage, venmoId: '123'}});
      const {_id: id2} = await User.findOneByObjectId(id1);
      assert.deepEqual(id1, id2);
    });
  });

  describe('#addItem()', () => {
    it('should successfully add an item to a user', async() => {
      const user = await User.createFbUser(fbId, {user: {firstName, lastName, profileImage, venmoId: '123'}});
      const item = await Item.create('Nav', 'trade', 'no', user.fbId);
      const updatedUser = await User.addItem(user.fbId, item._id);
      assert.deepEqual(updatedUser.items[0]._id, item._id);
    });

    it('should successfully add several items to a user', async() => {
      const user = await User.createFbUser(fbId, {user: {firstName, lastName, profileImage, venmoId: '123'}});
      const item1 = await Item.create('Nav', 'trade', 'no', user.fbId);
      const item2 = await Item.create('Kevin', 'trade', 'pornhub', user.fbId);
      await User.addItem(user.fbId, item1._id);
      const updatedUser = await User.addItem(user.fbId, item2._id);
      assert.equal(updatedUser.items[0].name, item1.name);
      assert.equal(updatedUser.items[1].name, item2.name);
    });
  });

  describe('#updateFieldsByFbId()', () => {
    it('should successfully create a user', async() => {
      const user = await User.createFbUser(fbId, {user: {firstName, lastName, profileImage, venmoId: '123'}});
      const updated = await User.updateFieldsByFbId(user.fbId, {firstName: 'Kevin'});
      assert.equal(updated.firstName, 'Kevin');
    });
  });
});
