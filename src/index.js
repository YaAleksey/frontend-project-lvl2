import _ from 'lodash';
import parsingFile from './chooseParser.js';
import genUniqueKeys from './genUniqueKeys.js';

const genObjForTree = (obj1, obj2, key, depth = 2) => {

  if (obj1[key] === obj2[key]) {
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

  if (obj1[key] !== obj2[key]) {
    if (!(typeof obj1[key] === 'object' && typeof obj2[key] === 'object')
    || (Array.isArray(obj1[key]) || Array.isArray(obj2[key]))) {
       
      return {
        "key": key, "oldValue": obj1[key], "status": "modified", "depth": depth,
        "newValue": obj2[key],
      };
    }

    return {
        "key": key, "value": "nested", "status": "changed", "depth": 2,
        "children": (makeTree(obj1[key], obj2[key])),
      };
  }
};

const makeTree = (obj1, obj2) => {
  const uniqueKeys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
  let counter = [];
  let addDepth = {};
  let depth = "";

  if (uniqueKeys.length === 1) {
    addDepth = genObjForTree(obj1, obj2, uniqueKeys[0]);
    depth = addDepth["depth"];
    addDepth["depth"] = depth + 2;
    //console.log(addDepth);
    counter.push(addDepth);
    return counter;
  }

  counter = uniqueKeys.reduce((acc, key) => {
    addDepth = genObjForTree(obj1, obj2, key);
//console.log(addDepth);
    depth = addDepth["depth"];
    addDepth["depth"] = depth + 2;
    acc.push(addDepth);
    return acc;
  }, [])

return counter[1]; // поработать с depth, как ее сумировать при погружении!
};

const genDiff = (file1, file2) => {
  const firstObj = parsingFile(file1);
  const secondObj = parsingFile(file2);

  return makeTree(firstObj, secondObj);
  
};

export default genDiff;
