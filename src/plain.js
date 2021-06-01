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
    const propLevelFirst = [currentLevel.key];

    const iter = (children, propPreviousLevel) => {
      const result = children.map((child) => {
//console.log(propPreviousLevel);
        const propForChild = _.cloneDeep(propPreviousLevel);
console.log(propForChild);
        propForChild.push(child.key);
//console.log(propForChild);

        if (child.status === 'unchanged') {
          return '';
        }

        if (!(_.has(child, 'children'))) {

          if (child.status === 'deleted') {
            return `Property '${propForChild.join('.')}' was removed`;
          }

          if (child.status === 'added') {
            return `Property '${propForChild.join('.')}' was added with value: ${checkForObj(child.value)}`;
          }

          return `Property '${propForChild.join('.')}' was update. From ${checkForObj(child.oldValue)} to ${checkForObj(child.newValue)}`;
        }

        return iter(child.children, propForChild);
      });
      return result;
    };

      if (currentLevel.status === 'unchanged') {
        return '';
      };

      if (!(_.has(currentLevel, 'children'))) {
        if (currentLevel.status === 'deleted') {
          return `Property '${propLevelFirst}' was removed`;
        }

        if (currentLevel.status === 'added') {
          return `Property '${propLevelFirst}' was added with value: ${checkForObj(currentLevel.value)}`;
        }

        if (currentLevel.status === 'modified') {
          return `Property '${propLevelFirst}' was update. From ${checkForObj(currentLevel.oldValue)} to ${checkForObj(currentLevel.newValue)}`;
        }
      };
      
      return iter (currentLevel.children, propForChild);
    });
  };

  return output(tree);
};

export default connectionFilesInOutput;
