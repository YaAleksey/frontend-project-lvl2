import _ from 'lodash';

const complexValOrNot = (val) => {
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return _.isObject(val) ? '[complex value]' : val;
};

const plain = (tree, way = []) => {
  const result = tree.map((node) => {
    const currentWay = [way, node.key].flat().join('.');

    switch (node.status) {
      case 'deleted':
        return `Property '${currentWay}' was removed`;

      case 'unchanged':
        return null;

      case 'added':
        return `Property '${currentWay}' was added with value: ${complexValOrNot(node.value)}`;

      case 'modified':
        return `Property '${currentWay}' was updated. From ${complexValOrNot(node.oldValue)} to ${complexValOrNot(node.newValue)}`;

      case 'changed':
        return plain(node.children, [...way, node.key]);

      default:
        return 'Error: unexpected status!';
    }
  });

  return result.filter((line) => line !== null).join('\n');
};

export default plain;
