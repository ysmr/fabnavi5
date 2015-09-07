var React = require('react');
var Navigation = require('./Navigation.react.js');
var SearchBar = require('./SearchBar.react.js');
var ProjectList = require('./ProjectList.react.js');
var Footer = require('./Footer.react.js');
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
