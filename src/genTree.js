import _ from 'lodash';

const genTree = (obj1, obj2) => {
  const uniqueKeys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));

  const findDifference = uniqueKeys.map((key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { key, value: obj1[key], status: 'deleted' };
    }

    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { key, value: obj2[key], status: 'added' };
    }

    if (!(_.isObject(obj1[key]) && _.isObject(obj2[key])) && obj1[key] !== obj2[key]) {
      return {
        key, oldValue: obj1[key], status: 'modified', newValue: obj2[key],
      };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key, value: 'nested', status: 'changed', children: (genTree(obj1[key], obj2[key])),
      };
    }

    return { key, value: obj1[key], status: 'unchanged' };
  });

  return findDifference;
};

export default genTree;
