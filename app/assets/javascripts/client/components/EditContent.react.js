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
    id   : React.PropTypes.string.isRequired,
    src   : React.PropTypes.string.isRequired,
    current_page   : React.PropTypes.number.isRequired,
    current_array : React.PropTypes.array.isRequired,
    id_array : React.PropTypes.array.isRequired,
  },

  getInitialState: function(){
    return {
      src : this.props.src,
      id : this.props.act,
      flag : false,
    };
  },

  getDefaultProps: function(){
    return {
    };
  },

  onclick : function(){
    this.registId(this.props.id);
    this.registPage(this.props.current_page);
    this.setState({flag:!this.state.flag});
    this.getSrc();
    //console.log("click picture : "+ this.props.id);
    console.log(this.state.flag);
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

  registId: function(id){
    let flag = true;
    console.log("click picture : " + id);
    for(var i=0;i<this.props.id_array.length;i++){
      if(this.props.id_array[i]==id){
        this.props.id_array.splice(i,1);
        flag = !flag;
      }
    }
    if(flag){
      this.props.id_array.push(id);
    }
    console.log(this.props.id_array);
    return;
  },

  registPage: function(current_page){
    this.props.current_array.push(current_page);
    console.log(this.props.current_array);
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
