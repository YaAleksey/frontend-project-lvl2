import treeInStr from './stylish.js';
import plain from './plain.js';
// import treeInStr from '@hexlet/code';
// import plain from '@hexlet/code';

const formatters = {
  stylish: treeInStr,
  plain,
  json: JSON.stringify,
};

export default (format) => formatters[format];
