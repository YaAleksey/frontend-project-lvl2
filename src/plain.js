import _ from 'lodash';

const connectionFilesInOutput = (tree) => {
  const lines = tree.map((currentObj) => {
    if (!(_.has(currentObj, 'children'))) {
      if (currentObj.status === 'deleted') {
        return `Property '${currentObj.key}' was removed`;
      }
      if (currentObj.status === 'unchanged') {
        return '';
      }
      if (typeof currentObj.value === 'object' && !Array.isArray(currentObj.key)) {
       return `Property '${currentObj.key}' was added with value: [complex value]`;
      }
      return  `Property '${currentObj.key}' was added with value: ${currentObj.value}`;
    }
  const wayForIter = [];

  const iter (objWithChld) => {
    wayForIter.push(objWithChld.key);

    const result = objWithChld.children.reduce((acc, child) => {
      if (child.status === 'unchanged') {
        acc.push('');
        return acc;
      }
      
      if (!(_.has(child, 'children'))) {
        if (child.status === '') {
	  
	}
      }
    }, []);
  }
  
  
  
  });
  
  return lines;
};

export default connectionFilesInOutput;
