const path = require('path');
const data = require('./pages.json');

exports.createPages = ({ boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  // Your component that should be rendered for every item in JSON.
  const template = path.resolve(`src/pages/activity-details.js`);

  // Create pages for each JSON entry.
  data.forEach(( page ) => {
    console.log(page)
    const path = page.url ;

    createPage({
      path,
      component: template,
      // Send additional data to page from JSON (or query inside template)
      context: page
    });
  });
};