import _ from 'lodash';
import parsingFile from './chooseParser.js';
import format from './formatters/formattersList.js';

const genTree = (obj1, obj2) => {
  const uniqueKeys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));

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
      key, value: 'nested', status: 'changed', children: (genTree(obj1[key], obj2[key])),
    });
    return _.sortBy(acc, ['key']);
  }, []);

  return counter;
};

const genDiff = (file1, file2, formatName) => {
  const firstObj = parsingFile(file1);
  const secondObj = parsingFile(file2);
  const diff = genTree(firstObj, secondObj);

  return format(formatName)(diff);
};

export default genDiff;
