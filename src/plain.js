import _ from 'lodash';

const connectionFilesInOutput = (tree) => {

  const checkForObj = (valueForCheck) => {
    if (typeof valueForCheck === 'object' && !Array.isArray(valueForCheck) && valueForCheck !== null) {
      return `[complex value]`;
    }
    return `${valueForCheck}`;
  };

  const output = (tree) => {
    return tree.map((currentLevel) => {

    const iter = (children, wayForIter) => {
      const result = children.map((child) => {

        if (child.status === 'unchanged') {
          return '';
        }

        if (!(_.has(child, 'children'))) {

          if (child.status === 'deleted') {
            return `Property '${wayForIter.join('.')}' was removed`;
          }

          if (child.status === 'added') {
            return `Property '${wayForIter.join('.')}' was added with value: ${checkForObj(child.value)}`;
          }

          return `Property '${wayForIter.join('.')}' was update. From ${checkForObj(child.oldValue)}
          to ${checkForObj(child.newValue)}`;
        }

        wayForIter.push(child.key)
        return iter(child.children, wayForIter);
      });
      return result;
    };

      if (currentLevel.status === 'unchanged') {
        return '';
      };

      if (!(_.has(currentLevel, 'children'))) {
        if (currentLevel.status === 'deleted') {
          return `Property '${currentLevel.key}' was removed`;
        }

        if (currentLevel.status === 'added') {
          return `Property '${currentLevel.key}' was added with value: ${checkForObj(currentLevel.value)}`;
        }

        if (currentLevel.status === 'modified') {
          return `Property '${currentLevel.key}' was update. From ${checkForObj(currentLevel.oldValue)}
        to ${checkForObj(currentLevel.newValue)}`;
        }
      };
      
      return iter (currentLevel.children, [currentLevel.key]);
    });
  };

  return output(tree);
};

export default connectionFilesInOutput;
