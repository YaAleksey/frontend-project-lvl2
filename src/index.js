import _ from 'lodash';
import parsingFile from './chooseParser.js';
import treeInStr from './stylish.js';

const genObjForTree = (obj1, obj2) => {
  const uniqueKeys = (_.uniq([...Object.keys(obj1), ...Object.keys(obj2)])).sort();

  const counter = uniqueKeys.reduce((acc, key) => {
    if (obj1[key] === obj2[key]) {
      acc.push({ key, value: obj1[key], status: 'unchanged' });
      return acc;
    }

    if (_.has(obj1, key) && (!(_.has(obj2, key)))) {
      acc.push({ key, value: obj1[key], status: 'deleted' });
      return acc;
    }

    if (_.has(obj2, key) && (!(_.has(obj1, key)))) {
      acc.push({ key, value: obj2[key], status: 'added' });
      return acc;
    }

    if (!(_.isObject(obj1[key]) && _.isObject(obj2[key]))
    || (Array.isArray(obj1[key]) || Array.isArray(obj2[key]))) {
      acc.push({
        key, oldValue: obj1[key], status: 'modified', newValue: obj2[key],
      });
      return acc;
    }
    acc.push({
      key, value: 'nested', status: 'changed', children: (genObjForTree(obj1[key], obj2[key])),
    });
    return acc;
  }, []);

  return counter;
};

const genDiff = (file1, file2) => {
  const firstObj = parsingFile(file1);
  const secondObj = parsingFile(file2);
  const genTree = genObjForTree(firstObj, secondObj);

  return treeInStr(genTree);
};

export default genDiff;
