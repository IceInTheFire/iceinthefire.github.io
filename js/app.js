(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

	var app=angular.module("myApp",["myApp.directive","myApp.service"]);
	app.controller("myController",function($scope,$filter,mystorage){
		$scope.todo="";
		//数据源
		$scope.todoList=mystorage.get();

		//添加
		$scope.add=function(){
			if($scope.todo.length>0){
				$scope.todoList.push({text:$scope.todo,completed:false});
				$scope.todo="";
				mystorage.save();
			}
		}
		//删除
		$scope.del=function(item){
			var index=$scope.todoList.indexOf(item);
			$scope.todoList.splice(index,1);
			mystorage.save();
		}
		//修改
		// 先双击，显示修改框
		// 再修改，这里是利用angular的双向数据绑定的特性
		// 失去焦点，隐藏修改框
		$scope.todoitem="";
		// 1双击
		$scope.dblclick=function(item){
			$scope.todoitem=item;
		}
		// 2失去焦点
		$scope.lose=function(){
			$scope.todoitem="";
			mystorage.save();
		}



		$scope.checkAll=false;
		$scope.todoCount=0;    //用于记录，显示在左下角那里,还剩下几个没打勾
		//左边的checked
		$scope.$watch('todoList',function(newVal){
			//过滤器的名称
			//需要过滤的数据
			//过滤的条件
			$scope.todoCount=$filter("filter")($scope.todoList,{completed:false}).length;
			$scope.isshowclear=$filter("filter")($scope.todoList,{completed:true}).length>0?true:false;
			$scope.checkAll=!$scope.todoCount;
			$scope.todoLength=$scope.todoList.length;
		},true);
		//全选
		$scope.checkedAll=function(){
			angular.forEach($scope.todoList,function(value,key){
				value.completed=$scope.checkAll;
			})
		}

		//切换状态
		$scope.status={};
		$scope.statusclass="all";
		$scope.all=function(){
			$scope.status={};
			$scope.statusclass="all";
		}
		$scope.active=function(){
			$scope.status={completed:false};
			$scope.statusclass="active";
		}
		$scope.completed=function(){
			$scope.status={completed:true};
			$scope.statusclass="completed";
		}

		//清除已选择的
		$scope.delselected=function(){
			//$scope.todoList=$filter("filter")($scope.todoList,{completed:false});//不推荐这种会改变todoList内存堆地址的方法
			//栈是变量名所存位置，堆是变量名的值锁存位置

			var tempList=$filter("filter")($scope.todoList,{completed:false});
			$scope.todoList.splice(0,$scope.todoList.length);//这样删除数据不会修改引用的地址
			angular.merge($scope.todoList,tempList);
			mystorage.save();
		}


	});
})(window);
