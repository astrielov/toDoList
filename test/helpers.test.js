import test from 'ava';
import { generUniqId } from '../js/helpers/id_generator';

test('test whether it geners unique IDs', (t) => {
  const ids = [];
  let unique = true;

  for (let i = 0; i < 100000; i += 1) {
    ids.push(generUniqId());
  }

  ids.sort();

  for (let i = 0; i < ids.length - 1; i += 1) {
    if (Object.is(ids[i], ids[i + 1])) {
      unique = false;
    }
  }

  t.true(unique);
});
