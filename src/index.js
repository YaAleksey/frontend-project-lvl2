import _ from 'lodash';
import fs from 'fs';

 const textFileOne = JSON.parse(fs.readFileSync('/home/aleksey/frontend-project-lvl2/src/file1.json'), "utf-8");
  const keysValuesFileOne = Object.entries(textFileOne);

  const textFileTwo = JSON.parse(fs.readFileSync('/home/aleksey/frontend-project-lvl2/src/file2.json'), "utf-8");
  const keysValuesFileTwo = Object.entries(textFileTwo);

const iteratingFirstToSecond = (arrayKeysValueFirst, objSecondFile) => {
  const afterIterating = {};
  arrayKeysValueFirst.map(([key, value]) => {
    if (!(_.has(objSecondFile, key))) {
      return afterIterating[`- ${key}`] = value;
    }
    if (objSecondFile[key] === value) {
      return afterIterating[key] = value;
    }
    if (objSecondFile[key] !== value) {
      afterIterating[`- ${key}`] = value;
      afterIterating[`+ ${key}`] = objSecondFile[key];
      return afterIterating;
    }
  })
  return afterIterating;
};

export const iteratingSecondToFirst = (arrayKeysValueFirst, arrayKeysValueSecond, objFirstFile, objSecondFile) => {
  const finalResult = iteratingFirstToSecond(arrayKeysValueFirst, objSecondFile);
  arrayKeysValueSecond.map(([key, value]) => {
    if (!(_.has(objFirstFile, key))) {
      return finalResult[`+ ${key}`] = value; 
    }
  })
//  console.log(finalResult);
  return finalResult;
};

export const byExport = () => {
 return iteratingSecondToFirst(keysValuesFileOne, keysValuesFileTwo, textFileOne, textFileTwo);
};

