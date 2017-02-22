/**
 * Created by hlyt on 2016/1/19.
 */
!function() {
    angular.module('main')
        .filter("isresponsed", [function () {
            return function (task) {
                function parseTime(timestr) {
                    if (timestr && timestr.length > 0) {
                        var d = timestr.split(" ");
                        var day = d[0].split("-");
                        if (d[1]) {
                            var time = d[1].split(":");
                            return new Date(day[0], day[1] - 1, day[2], time[0], time[1], time[2]);
                        } else {
                            return new Date(day[0], day[1] - 1, day[2]);
                        }
                    } else {
                        return timestr;
                    }
                }
                if(!task){
                    return null;
                }
                if(new Date().getTime()>parseTime(task.endtime).getTime()){
                    task.status4user='overdue';
                    return 3;
                }
                if(task.status=='locked'){
                    return 2;
                }
                if (task.module == "rapid_response" || task.module == "poll") {
                    if(task.status4user=="open"||task.status4user=="read"){
                        return 0;
                    }else{
                        return 1;
                    }
                } else {
                    if(task.status4user=='done'||task.status4user=='responded'){
                        return 1;
                    }else{
                        return 0;
                    }
                }
            }
        }])
        .filter("isdone", [ function () {
            return function (task) {
                function parseTime(timestr) {
                    if (timestr && timestr.length > 0) {
                        var d = timestr.split(" ");
                        var day = d[0].split("-");
                        if (d[1]) {
                            var time = d[1].split(":");
                            return new Date(day[0], day[1] - 1, day[2], time[0], time[1], time[2]);
                        } else {
                            return new Date(day[0], day[1] - 1, day[2]);
                        }
                    } else {
                        return timestr;
                    }
                }
                if(!task){
                    return null;
                }

                if(new Date().getTime()>parseTime(task.endtime).getTime()){
                    task.status4user='overdue';
                    return 3;
                }
                if(task.status=='locked'){
                    return 2;
                }
                if (task.module == "rapid_response" || task.module == "poll") {
                    if(task.status4user=="open"||task.status4user=="read"){
                        return 0;
                    }else{
                        return 1;
                    }
                } else {
                    if(task.status4user=='done'){
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
        }])
}()
