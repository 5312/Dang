// const viewGenerator = require('./plop/view/prompt.js');
const appGenerator = require('./scripts/plop/app/prompt.js');
// const componentGenerator = require('./plop/component/prompt.js')

module.exports = function (plop) {
  plop.setGenerator('app', appGenerator);
  // plop.setGenerator('view', viewGenerator);
  // plop.setGenerator('component', componentGenerator)
};
