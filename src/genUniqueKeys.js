import _ from 'lodash';

const genUniqueKeys = (objFromFileOne, objFromFileTwo) => {
  const keysFileOne = Object.keys(objFromFileOne);
  const keysFileTwo = Object.keys(objFromFileTwo);

  return (_.union([...keysFileTwo, ...keysFileOne])).sort();
};

export default genUniqueKeys;
