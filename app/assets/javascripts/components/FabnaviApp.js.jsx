var React = require('react');
var Navigation = require('./Navigation.js.jsx');
var SearchBar = require('./SearchBar.js.jsx');
var ProjectList = require('./ProjectList.js.jsx');
var Footer = require('./Footer.js.jsx');
module.exports = React.createClass({
  render : function ( ){
    return (
     <div className="body" >
       <Navigation />
       <SearchBar />
       <ProjectList />
       <Footer />
     </div>
    );
  },
});
