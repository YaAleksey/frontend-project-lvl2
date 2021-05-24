import _ from 'lodash';
import parsingFile from './chooseParser.js';
import treeInStr from './stylish.js';

const genObjForTree = (obj1, obj2, key) => {
  if (obj1[key] === obj2[key]) {
    return { key, value: obj1[key], status: 'unchanged' };
  }

  if (_.has(obj1, key) && (!(_.has(obj2, key)))) {
    return { key, value: obj1[key], status: 'deleted' };
  }

  if (_.has(obj2, key) && (!(_.has(obj1, key)))) {
    return { key, value: obj2[key], status: 'added' };
  }

  if (!(_.isObject(obj1[key]) && _.isObject(obj2[key])) || (Array.isArray(obj1[key]) || Array.isArray(obj2[key]))) {
    return {
      key, oldValue: obj1[key], status: 'modified', newValue: obj2[key],
    };
  }

  return {
    key, value: 'nested', status: 'changed', children: (makeTree(obj1[key], obj2[key])),
  };
};

const makeTree = (obj1, obj2) => {
  const uniqueKeys = (_.uniq([...Object.keys(obj1), ...Object.keys(obj2)])).sort();
  let counter = [];

  counter = uniqueKeys.reduce((acc, key) => {
    acc.push(genObjForTree(obj1, obj2, key));

    return acc;
  }, []);

  return counter;
};

const genDiff = (file1, file2) => {
  const firstObj = parsingFile(file1);
  const secondObj = parsingFile(file2);
  const genTree = makeTree(firstObj, secondObj);
  //  return genTree[3].value;
  return treeInStr(genTree);
};

export default genDiff;
