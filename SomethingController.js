/*
 * File: SomethingController.js
 * Created: 2015/08/22
 * Author:  旷立婷
 * Email:   kuangliting@atlasdata.com.cn
 * Copyright (C) 2016 海量云图（北京）数据技术有限公司.
 */
angular.module('project').controller('SomethingController',['$scope','$timeout','$http',function($scope,$timeout,$http){
    $scope.slidedown=slidedown;
    $scope.slideup=slideup;
    function slidedown(){
        var fromscroll =$("#sth-panel").scrollTop();
        var toscroll=$('#support').offset().top;
        $('#map-panel').slideDown();
        $("#sth-panel").stop().animate({'scrollTop':fromscroll+toscroll+250+'px'},1000);
    }
    function slideup(){
        var fromscroll =$("#sth-panel").scrollTop();
        var toscroll=$('#support').offset().top;
        $('#map-panel').slideUp('slow');
        $("#sth-panel").stop().animate({'scrollTop':fromscroll+toscroll-200+'px'},1000);
    }
    $scope.imgIndex=0;
    $scope.stopPanel=document.getElementById('stop-panel').offsetTop;
    $scope.stopPanel=$scope.stopPanel ? $scope.stopPanel+38: 1291+38;
    $scope.show4={};
    $scope.show4.display=0;
    $scope.show4.panel=1;

    setInterval(function(){
        var imgtimer=$timeout(function(){
            $scope.imgIndex=($scope.imgIndex+1)%3;
            $timeout.cancel( imgtimer );
        },0);
    },2000);


    var lastScrollTop=0;
    var scrollup=false;
    var flg=true;
    var scrollunmber={
        upsize:0,
        downsize:0,
        size:function(){
            return scrollunmber.upsize+scrollunmber.downsize;
        }
    };

    $('#stop-panel-pointer li').hover(function(a){
        var index=$(this).attr("md-data");
        if(index===$scope.show4.panel){
            return;
        }
        var t1=$timeout(function(){
            $scope.show4.panel=index-0;
            $timeout.cancel( t1 );
        },300);
    })

    /* 滚动切换效果*/
    $("#sth-panel").scroll(function(e){
        var tl=$(this).scrollTop();
        if(tl>lastScrollTop){
            scrollup=false;
            scrollunmber.downsize=scrollunmber.downsize+1;
            scrollunmber.upsize=0;
        }else if(tl<lastScrollTop){
            scrollup=true;
            scrollunmber.upsize=scrollunmber.upsize+1;
            scrollunmber.downsize=0;
        }
        if(($scope.show4.panel==4 && !scrollup)||($scope.show4.panel==1&& scrollup)){
            flg=false;
        }else{
            flg=true;
        }
        if($(this).scrollTop()>=$scope.stopPanel-50 && $(this).scrollTop()<=$scope.stopPanel+100 && flg){
                $scope.starttime= $scope.starttime ? $scope.starttime : new Date().getTime();
                $scope.endtime=new Date().getTime();
                if($scope.endtime-$scope.starttime>300&&scrollunmber.size()>=3){
                    if($scope.show4.panel==1){
                        var t=200;
                    }else{
                        var t=200;
                    }
                    var timer1=$timeout(function(){
                        if(scrollup){
                            if($scope.show4.panel!=1){
                                $scope.show4.panel=($scope.show4.panel-1)%5;
                            }
                        }else{
                            if($scope.show4.panel!=4){
                                $scope.show4.panel=($scope.show4.panel+1)%5;
                            }
                        }
                        $timeout.cancel( timer1 );
                    },t);

                    $("#sth-panel").scrollTop($scope.stopPanel);
                    $scope.starttime=$scope.endtime;
                }
                else{
                    $("#sth-panel").scrollTop($scope.stopPanel);
                }
            lastScrollTop=$scope.stopPanel;
        }else{
            lastScrollTop=tl;
        }
    })

    $("#index-href").click(function(){
        $("#sth-panel").scrollTop(500);
    })

    $("#toplist a,#scroll-top").click(function(){
        var idname= $(this).attr("href-id");
        var fromscroll =$("#sth-panel").scrollTop();
        var toscroll=$('#'+idname).offset().top;
        if(idname=='about'){
            toscroll=toscroll-127;
        }else{
            toscroll=toscroll-68;
        }
        var time=toscroll>0 ? toscroll* 0.3 : -toscroll* 0.3;
        if(false &&(fromscroll+toscroll)>$scope.stopPanel && $scope.show4.display===0){
            if($scope.show4.panel===0){
                $("#sth-panel").stop().animate({'scrollTop':$scope.stopPanel+'px'},300);
                $scope.show4.panel=1;
            }else{
            }
        }else{
            $("#sth-panel").stop().animate({'scrollTop':fromscroll+toscroll+'px'},time);
            if($scope.show4.display===0){
                $scope.show4.panel=0;
            }
        }
    })
}])
