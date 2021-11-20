import makeStylishOutput from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish: makeStylishOutput,
  plain,
  json: JSON.stringify,
};

export default (format) => formatters[format];
