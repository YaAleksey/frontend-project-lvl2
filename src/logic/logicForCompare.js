import _ from 'lodash';

const compareFiles = (firstObj, secondObj, uniqueKeys) => {
  const objOne = firstObj;
  const objTwo = secondObj;

  const result = uniqueKeys.reduce((acc, key) => {
    if (Array.isArray(objOne[key])) {
      const [valueObjOne] = objOne[key];
      objOne[key] = valueObjOne;
    }

    if (Array.isArray(objTwo[key])) {
      const [valueObjTwo] = objTwo[key];
      objTwo[key] = valueObjTwo;
    }

    if (objOne[key] === objTwo[key]) {
      acc.push(`  ${key}: ${objTwo[key]}`);
      return acc;
    }

    if (!(_.has(objOne, key)) && _.has(objTwo, key)) {
      acc.push(`+ ${key}: ${objTwo[key]}`);
      return acc;
    }

    if (_.has(objOne, key) && !(_.has(objTwo, key))) {
      acc.push(`- ${key}: ${objOne[key]}`);
      return acc;
    }

    if (_.has(objOne, key) && _.has(objTwo, key)) {
      acc.push(`- ${key}: ${objOne[key]}`);
      acc.push(`+ ${key}: ${objTwo[key]}`);
      return acc;
    }
    return acc;
  }, []);

  return result;
};

export default compareFiles;
