import _ from 'lodash';

const genTree = (firstFile, secondFile) => {
  const uniqueKeys = _.sortBy(_.uniq([...Object.keys(firstFile), ...Object.keys(secondFile)]));

  const findDifference = uniqueKeys.map((key) => {
    if (_.has(firstFile, key) && !_.has(secondFile, key)) {
      return { key, value: firstFile[key], status: 'deleted' };
    }

    if (!_.has(firstFile, key) && _.has(secondFile, key)) {
      return { key, value: secondFile[key], status: 'added' };
    }

    if (!(_.isObject(firstFile[key]) && _.isObject(secondFile[key]))
      && firstFile[key] !== secondFile[key]) {
      return {
        key, oldValue: firstFile[key], status: 'modified', newValue: secondFile[key],
      };
    }

    if (_.isObject(firstFile[key]) && _.isObject(secondFile[key])) {
      return {
        key, value: 'nested', status: 'changed', children: (genTree(firstFile[key], secondFile[key])),
      };
    }

    return { key, value: firstFile[key], status: 'unchanged' };
  });

  return findDifference;
};

export default genTree;
