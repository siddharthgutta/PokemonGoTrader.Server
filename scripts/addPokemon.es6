import pokemonTypes from '../constants/pokemonTypes.es6';
import * as Pokemon from '../api/controllers/pokemon.es6';
import * as Type from '../api/controllers/type.es6'

async function insertTypes() {
  for (const name in pokemonTypes) { // only grabbing the name
    let types = [];
    for (const type of pokemonTypes[name]) {
      console.log(`Current Type: ${type}`);
      try {
        const {_id} = await Type.findByName(type);
        types.push(_id);
      } catch (e) {
        const {_id} = await Type.create(type);
        types.push(_id);
      }
    }
    await Pokemon._create(name, types); // only prints the id
  }
}

insertTypes();