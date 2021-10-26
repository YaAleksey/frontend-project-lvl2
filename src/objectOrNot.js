export default (val) => {
  if (val === null) {
    return false;
  }
  return (typeof val === 'object' && !Array.isArray(val));
};
