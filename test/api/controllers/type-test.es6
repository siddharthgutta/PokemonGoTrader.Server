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
});