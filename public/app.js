var app = angular.module('bookmark',[]);
// local
var __appurl = "http://localhost:2003/";

checkError = function(error, status){
    if(error.message){
        alert(error.message)
    }
    if(status == 401){
      localStorage.removeItem('userToken');
      return window.location.href = '/'
    }
}

getToken = function(){
  return localStorage.getItem('userToken');
}