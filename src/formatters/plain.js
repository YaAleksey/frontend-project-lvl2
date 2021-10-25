import _ from 'lodash';

const plain = (tree) => {
  const checkForObj = (valueForCheck) => {
    if (typeof valueForCheck === 'object' && !Array.isArray(valueForCheck) && valueForCheck !== null) {
      return '[complex value]';
    }
    if (typeof valueForCheck === 'string') {
      return `'${valueForCheck}'`;
    }
    return `${valueForCheck}`;
  };

  const iter = (node, propPreviousLevel) => {
    if (node.status === 'unchanged') {
      return '';
    }

    if (!(_.has(node, 'children'))) {
      if (node.status === 'deleted') {
        return `Property '${propPreviousLevel.join('.')}' was removed`;
      }

      if (node.status === 'added') {
        return `Property '${propPreviousLevel.join('.')}' was added with value: ${checkForObj(node.value)}`;
      }

      return `Property '${propPreviousLevel.join('.')}' was updated. From ${checkForObj(node.oldValue)} to ${checkForObj(node.newValue)}`;
    }

    return node.children.map((child) => {
      const propForChild = propPreviousLevel.slice(0);
      propForChild.push(child.key);

      return iter(child, propForChild);
    });
  };

  let result = tree.map((objFromFirstLvl) => {
    const propFromFirstLvl = objFromFirstLvl.key;

    return iter(objFromFirstLvl, [propFromFirstLvl]);
  });
  result = _.flattenDeep(result);
  return _.compact(result).join('\n');
};

export default plain;
