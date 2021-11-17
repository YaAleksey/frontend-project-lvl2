import _ from 'lodash';
import objectOrNot from './objectOrNot.js';
import parsingFile from './chooseParser.js';
import formats from './formatters/formattersList.js';

const genTree = (obj1, obj2) => {
  const uniqueKeys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));

  const comprasionInArr = uniqueKeys.map((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return { key, value: obj1[key], status: 'unchanged' };
      }
      if (!(objectOrNot(obj1[key]) && (objectOrNot(obj2[key])))) {
        return {
          key, oldValue: obj1[key], status: 'modified', newValue: obj2[key],
        };
      }
      return {
        key, value: 'nested', status: 'changed', children: (genTree(obj1[key], obj2[key])),
      };
    }

    if (_.has(obj1, key)) {
      return { key, value: obj1[key], status: 'deleted' };
    }

    return { key, value: obj2[key], status: 'added' };
  });

  return comprasionInArr;
};

const render = (diff, formatName) => formats(formatName)(diff);

const genDiff = (file1, file2, formatName) => {
  const firstObj = parsingFile(file1);
  const secondObj = parsingFile(file2);
  const diff = genTree(firstObj, secondObj);
//  const chooseFormat = formats(formatName);

//  return chooseFormat(diff);
  return render(diff, formatName);
};

export default genDiff;
