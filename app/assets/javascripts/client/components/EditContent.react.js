const
    NavigationViewActionCreator = require('../actions/NavigationViewActionCreator'),
    React = require('react'),
    jade = require('react-jade'),
    Router = require('react-router'),
    Link = Router.Link,
    Route = Router.Route,

    editContent = jade.compileFile(__dirname + '/../templates/EditContent.jade');

const EditContent = React.createClass({
//Navigation.jadeにあるactとsrc
  propTypes : {
    act   : React.PropTypes.string.isRequired,
    src   : React.PropTypes.string.isRequired,
  },

  getInitialState: function(){
    return {
    };
  },

  getDefaultProps: function(){
    return {
    };
  },

  render : editContent,

  onclick : function(){
    console.log("click picture : "+ this.props.act);
    return;
  },

  componentWillMount : function(){
    return {
    };
  },

  componentDidMount : function (){

  },

  componentWillUpdate : function(){
    return {
    };
  },

  componentDidUpdate : function(){
    return {
    };
  },

  componentWillUnmount : function(){
    return {
    };
  },

});

module.exports = EditContent;
