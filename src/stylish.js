import _ from 'lodash';

const treeInStr = (tree) => {
  const replacer = ' ';
  const spacesCount = 1;
  const indentForSymb = 2;

  const extractObj = (valLikeObj, extrDepth) => {
    // const extrIndent = replacer.repeat(spacesCount * extrDepth);
    const extrSpacesCount = 1;
    const extrIndent = replacer.repeat(extrDepth + extrSpacesCount);
    // console.log(valLikeObj, extrDepth + extrSpacesCount);
    //    const closeExtrBr = replacer.repeat(spacesCount + extrDepth + indentForSymb);

    const getKeyVal = Object.entries(valLikeObj);
    const result = getKeyVal.map(([key, val]) => {
      // console.log(key, extrDepth);
      if (typeof val !== 'object') {
        return `${extrIndent}${key}: ${val}`;
      }
      return `${extrIndent}${key}: ${['{', extractObj(val, extrDepth + 4), `${extrIndent}}`].join('\n')}`;
    });
    return result.join('\n');
  };

  const lines = tree.map((difference) => {
    const iter = (currentObj, depth) => {
      const currentIndent = replacer.repeat(depth + spacesCount);
      const closeBrecket = replacer.repeat(depth + spacesCount + indentForSymb);

      // console.log(currentObj.key, depth);
      if (!(_.has(currentObj, 'children'))) {
        if (currentObj.status === 'deleted') {
          if (typeof currentObj.value !== 'object' || currentObj.value === null) {
            return `${currentIndent}- ${currentObj.key}: ${currentObj.value}`;
          }
          return `${currentIndent}- ${currentObj.key}: ${['{', extractObj(currentObj.value, depth + 6), `${closeBrecket}}`].join('\n')}`;
        }

        if (currentObj.status === 'added') {
          // console.log(currentObj.value, depth);
          if (typeof currentObj.value !== 'object' || currentObj.value === null) {
            return `${currentIndent}+ ${currentObj.key}: ${currentObj.value}`;
          }
          return `${currentIndent}+ ${currentObj.key}: ${['{', extractObj(currentObj.value, depth + 6), `${closeBrecket}}`].join('\n')}`;
        }

        if (currentObj.status === 'unchanged') {
          if (typeof currentObj.value !== 'object' || currentObj.value === null) {
            return `${currentIndent}  ${currentObj.key}: ${currentObj.value}`;
          }
          return `${currentIndent}  ${currentObj.key}: ${['{', extractObj(currentObj.value, depth + 6), `${closeBrecket}}`].join('\n')}`;
        }

        if (currentObj.status === 'modified') {
          if (typeof currentObj.oldValue === 'object' && currentObj.oldValue !== null) {
            if (typeof currentObj.newValue === 'object' && currentObj.newValue !== null) {
              [`${currentIndent}- ${currentObj.key}: ${extractObj(currentObj.oldValue, depth + 6)}`,
                `${currentIndent}+ ${currentObj.key}: ${extractObj(currentObj.newValue, depth + 6)}`].join('\n');
            }
            return [`${currentIndent}- ${currentObj.key}: {\n${extractObj(currentObj.oldValue, depth + 6)}\n${closeBrecket}}`, `${currentIndent}+ ${currentObj.key}: ${currentObj.newValue}`].join('\n');
          }
          if (typeof currentObj.newValue === 'object' && currentObj.newValue !== null) {
            return [`${currentIndent}- ${currentObj.key}: {/n${currentIndent}${currentObj.oldValue}\n${closeBrecket}`, `${currentIndent}+ {\n${currentObj.key}: ${extractObj(currentObj.newValue, depth + 6)}\n${closeBrecket}}`].join('\n');
          }
          return [`${currentIndent}- ${currentObj.key}: ${currentObj.oldValue}`,
            `${currentIndent}+ ${currentObj.key}: ${currentObj.newValue}`].join('\n');
        }
      }
      // console.log(currentObj, depth);
      return `${currentIndent}  ${currentObj.key}: {\n${currentObj.children.map((child) => iter(child, depth + 4)).join('\n')}\n${closeBrecket}}`;
    };
    return iter(difference, 1);
  });
  return ['{', ...lines, '}'].join('\n');
};

export default treeInStr;
