import treeInStr from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish: treeInStr,
  plain,
  json: JSON.stringify,
};

export default (format) => formatters[format];
