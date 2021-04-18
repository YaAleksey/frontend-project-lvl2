import _ from 'lodash';
import parsingFile from './chooseParser.js';
import genUniqueKeys from './genUniqueKeys.js';

const genObjForTree = (obj1, obj2, key, depth) => {

  if (_.isEqual(obj1, obj2)) {
      return {
        "key": key, "value": obj1[key], "status": "unchanged", "depth": depth,
      };
  }
  
  if (_.has(obj1, key) && (!(_.has(obj2, key)))) {
      return {
        "key": key, "value": obj1[key], "status": "deleted", "depth": depth,
      };
  }

  if (_.has(obj2, key) && (!(_.has(obj1, key)))) {
      return {
        "key": key, "value": obj2[key], "status": "added", "depth": depth,
      };
  }

  if (!(_.isObject(obj1[key]) && _.isObject(obj2[key])) || (Array.isArray(obj1[key]) || Array.isArray(obj2[key]))) {

    return {
      "key": key, "oldValue": obj1[key], "status": "modified", "depth": depth,
      "newValue": obj2[key],
    };
  }

  return {
    "key": key, "value": "nested", "status": "changed", "depth": 2,
    "children": (makeTree(obj1[key], obj2[key], depth + 2)),
  };
};

const makeTree = (obj1, obj2, depth = 2) => {
  const uniqueKeys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
  let counter = [];

  counter = uniqueKeys.reduce((acc, key) => {
    acc.push(genObjForTree(obj1, obj2, key, depth));

    return acc;
  }, [])

  return counter;
};

const genDiff = (file1, file2) => {
  const firstObj = parsingFile(file1);
  const secondObj = parsingFile(file2);

  return makeTree(firstObj, secondObj);
  
};

export default genDiff;
