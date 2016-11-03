/**
 * Created by mianhua on 2016-10-30.
 */
(function(angular){
    var app=angular.module("myApp.service",[]);
    app.factory("mystorage",function($window,$filter){
        var storage=$window.localStorage;
        var todoList=JSON.parse(storage.getItem('todoList')||"[]");


        //factory中是return一个对象
        return {
            get:function(){
                return todoList;
            },
            save:function(){
                storage.setItem("todoList",JSON.stringify(todoList));
            }
        }
    })
})(angular)