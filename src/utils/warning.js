export default (componentName, message = '') => {
  if (!componentName) {
    return;
  }

  console.warn(`[${componentName}]`, message); // eslint-disable-line no-console
};
