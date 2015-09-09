
var ServerActionCreator = require('../actions/ServerActionCreator');
var Persona = {
  signIn : function(){
    Persona.init();
    navigator.id.request();
  },

  signOut : function () {
    Persona.init();

    navigator.id.logout();
  },

  init : function () {
    navigator.id.watch({
       onlogin: function(assertion){
          $.ajax({
              type:"POST",
              url:"/api/v1/auth/sign_in",
              data:{assertion:assertion},
              dataType:"json",
              success: function(res, status, xhr){
                ServerActionCreator.signIn(res.email);
              },
              error: function(res, status, xhr){
                console.log(res,status,xhr);
              }
          });
        },
        onlogout: function(){
          $.ajax({
              type:"DELETE",
              url:"/api/v1/auth/sign_out",
                success: function(res, status, xhr){
                  ServerActionCreator.signOut(res);
              },
              error: function(res, status, xhr){
                console.log(res,status,xhr);
              }
          });
        }
    });  
  } 
};
module.exports = Persona;

