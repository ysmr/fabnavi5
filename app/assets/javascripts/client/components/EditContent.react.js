const
    ProjectActionCreator = require('../actions/ProjectActionCreator'),
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
      src : this.props.src,
      act : this.props.act,
      flag : false,
    };
  },

  getDefaultProps: function(){
    return {
    };
  },

  onclick : function(){
    this.setState({flag:!this.state.flag});
    this.getSrc();
    console.log("click picture : "+ this.props.act);
    console.log(this.state.flag)
    return;
  },

  getSrc: function(){
    if(this.state.flag){
      this.setState({src:this.props.src});
    }else{
      this.setState({src:"/images/kaffcop_icon/delete_content.png"});
    }
    return;
  },

  render : editContent,

  componentWillMount : function(){
    return {
    };
  },

  componentDidMount : function (){
    //State.reload();
  },

  componentWillUpdate : function(){
    return {
    };
  },

  componentDidUpdate : function(){
  },

  componentWillUnmount : function(){
    return {
    };
  },

});

module.exports = EditContent;
