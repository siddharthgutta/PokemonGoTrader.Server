import * as User from '../../../api/controllers/user.es6';
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
});
