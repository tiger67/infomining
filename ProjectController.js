/**
 * Created by kuangliting on 2015/8/25.
 */
(function () {
    angular.module('project')
        .controller('ProjectCtrl', ['$scope', '$timeout','$mdSidenav','$state','$mdDialog','$parse','$rootScope', '$filter', '$http','projectService', 'userinformlistService','API','commonService',
            function ($scope,$timeout,$mdSidenav,$state,$mdDialog,$parse, $rootScope, $filter, $http, projectService,userinformlistService,API,commonService) {
                var self=this;
                var author = projectService.common.getLoginedUser();
                $scope.author = author.nickname;
                $scope.toggleSearch = false;
                $scope.optype = '';
                $scope.content = [];

                $scope.showYMTime=function(project){
                  var time=project['createtime'].substring(0,7).split('-');
                    return time[0]+"\/"+(time[1]-0);

                }
                $('#main-content').perfectScrollbar({'minScrollbarLength':100,'wheelSpeed':1});//初始化滚动条
                $scope.selected = function () {
                    return true;
                }
                $scope.cycleselected = function () {
                    return true;
                }
                $scope.respondentselected = function () {
                    return true;
                }
                $scope.selectButton = function (index, $event, program) {
                    $event.stopPropagation();
                    $event.preventDefault();
                    $scope.selectedbutton = index;
                    $scope.params.type = program;
                    $scope.selected = function () {
                        return false;
                    }
                }
                $scope.selectButton2 = function (index, $event, program) {
                    $event.stopPropagation();
                    $event.preventDefault();
                    $scope.selectedbutton2 = index;
                    $scope.params.industrytype = program;
                    projectService.category(program)
                        .then(function (response) {
                            if (response.data.flag == 'success') {
                                $scope.categorys = [];
                                $scope.categorys = response.data.data;
                            }
                        })
                }
                $scope.selectcycle = function (index, $event, cycle) {
                    $event.stopPropagation();
                    $event.preventDefault();
                    $scope.selectedcycle = index;
                    $scope.params.cycle = cycle;
                    $scope.cycleselected = function () {
                        return false;
                    }
                }
                $scope.go_config_respondent=function(project,event){
                    event.preventDefault();
                    event.stopPropagation();
                    if(!project||!project.tag){
                        return 0;
                    }
                    project.projecttag=project.tag;
                    putproject(project);
                    $scope.setRecentProject(project.projecttag);
                    $state.go('participator_set');
                }


                $scope.selectrespondent = function (index, $event, respondent) {
                    $event.stopPropagation();
                    $event.preventDefault();
                    $scope.selectedrespondent = index;
                    $scope.params.visitorSum = respondent
                    $scope.respondentselected = function () {
                        return false;
                    }

                }
                $scope.count = 100;

                $scope.projectList = function () {
                    API['project/list']({pageSize:100,pageNo:1}).then(function(response){
                        $scope.content = response.data.data.data;
                        if(!$scope.presentProject){
                            $scope.presentProject=$scope.content[0];
                        }
                        for (var i = 0; i < $scope.content.length; i++) {
                            var c=$scope.content[i];
                            c.projecttag = c.tag;
                            var t=c.createtime.substring(0,7).split('-');
                            c['timeYM']=t[0]+"\/"+(t[1]-0);
                        }
                    })
                }

                $scope.getProjectIntroduction_img = function (img) {
                    API['attachment/fetch']({projecttag:img.projecttag,attachment_id:img.title_photo}).then(function(response){
                        if(response.data.flag=='success'){
                            img.Introduction_img = response.data.data;
                        }
                    });
                };//获取简介图片
                //计算项目价格
                API['project/get-price-data']().then(function(response){
                    self.price=response.data.data;
                });

                $scope.$watch('params',function(newp,oldp){
                    if(newp.cycle && newp.visitorSum ){
                        if(newp.cycle!==oldp.cycle||newp.visitorSum!=oldp.visitorSum|| newp.video!=oldp.video){
                            var calcprice=self.price[newp.cycle][newp.visitorSum];
                            if(newp.video=='1'){
                                newp.price= calcprice+self.price['video'];
                            }else{
                                newp.price= calcprice;
                            }
                        }
                    }
                },true);
                $scope.custom = {
                    name: 'bold',
                    startTime: 'grey',
                    runningTime: 'grey'
                };
                $scope.sortable = [
                    'projectname',
                    'startTime',
                    'runningTime'
                ];
                $scope.thumbs = 'status';

                $scope.sidenavshow = function () {
                    $mdSidenav('project-nav').toggle();
                };
                $scope.earchnavshow = function () {
                    $mdSidenav('project-search-nav').toggle();
                };
                $scope.params = {};
                $scope.step1 = true;
                $scope.projectadd = {};
                $scope.projectadd.step = 1;
                $scope.stepToggle = function () {
                    $scope.step1 = !$scope.step1;
                };
                $scope.filterreset = function () {
                    $scope.p = {};
                    $scope.projectList();
                }
                $scope.myfilter = function () {
                    if ($scope.optype === 'search') {
                        if (!$scope.p.industrytype) {
                            $scope.p.industrytype = ''
                        }
                        if (!$scope.p.type) {
                            $scope.p.type = ''
                        }
                        if (!$scope.p.customer) {
                            $scope.p.customer = ''
                        }
                        if (!$scope.p.name) {
                            $scope.p.name = ''
                        }
                        if (!$scope.p.number) {
                            $scope.p.number = ''
                        }
                        if (!$scope.p.ponumber) {
                            $scope.p.ponumber = ''
                        }
                        projectService.projectsearch($scope.p.industrytype, $scope.p.type, $scope.p.customer, $scope.p.name, $scope.p.number, $scope.p.ponumber)
                            .then(function (response) {

                                $scope.content = response.data.data.data;
                                $scope.total = response.data.data.total
                                //console.log($scope.total)

                                for (var i = 0; i < $scope.content.length; i++) {
                                    if ($scope.content[i].isfinish == 0) {
                                        $scope.content[i].status = "未完成";
                                    } else if ($scope.content[i].isfinish == 1) {
                                        $scope.content[i].status = "已完成"
                                    }
                                }
                            })
                    }

                }

                $scope.addProject = function (p) {
                    API['project/create'](p,function(a,p){
                        p.display_name = "",
                            p.price= p.price ? p.price : 0,
                            p.video= p.video ? p.video : 0,
                            p.samplelimit=p.visitorSum;
                    }) .then(function (response) {
                        if (response.data.flag == 'error' && response.data.code == 27) {
                            var res = "已存在相同的项目名称";
                            $scope.showAlert(res + "，新建项目失败,请重新输入。");

                        }
                        if (response.data.flag == 'error' && response.data.code == 28) {
                            var res = "已存在相同的项目编号";
                            $scope.showAlert(res + "，新建项目失败,请重新输入。");

                        }
                        if (response.data.flag == 'error' && response.data.code == 29) {
                            var res = "授权码已使用";
                            $scope.showAlert(res + "，新建项目失败,请重新输入。");

                        } else if (response.data.flag == 'success') {
                            $scope.projectList();
                            $mdSidenav('project-nav').close();
                            $mdSidenav('checkout-nav').open();
                            $timeout(function(){
                                $mdSidenav('checkout-nav').close();
                                $scope.projectadd.step = 1;
                                $scope.params = [];
                                $scope.selectedbutton = null;
                                $scope.selectedbutton2 = null;
                                $scope.selectedcycle =null;
                                $scope.selectedrespondent =null;
                                $scope.searchText='';
                                $scope.selected = function () {
                                    return true;
                                }
                                $scope.cycleselected = function () {
                                    return true;
                                }
                                $scope.respondentselected = function () {
                                    return true;
                                }
                            },2000);
                        }
                    });
                };

                $scope.checkoutnavtoggle = function () {
                    $mdSidenav('checkout-nav').toggle();
                }
                API['code/list-client']().then(function(response){
                    $scope.client = [];
                    $scope.client = response.data.data;
                    function createFilterFor(query) {
                        return function filterFn(customer) {
                            var customerLowerCase = customer.toLowerCase();
                            var lowercaseQuery = angular.lowercase(query);
                            return customerLowerCase.indexOf(lowercaseQuery,0) >-1;
                        }
                    }
                    $scope.querySearch = function (query) {
                        var results = [];
                        results = query ? $scope.client.filter(createFilterFor(query)) : $scope.client;
                        return results;
                    }
                })

                $scope.showAlert = function (info) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .textContent(info)
                            .ok('确定')
                    );
                };

                $scope.searchnavshow = function ($event) {
                    $scope.optype = "search";
                    $mdSidenav('project-detail-nav').toggle();
                    $scope.p = {};
                    $event.stopPropagation();
                }

                API["code/list"]({type:'industrytype'}).then(function (response) {
                    $scope.industryTypes = [];
                    for (var i = 0; i < response.data.data.length; i++) {
                        $scope.industryTypes.push(response.data.data[i]);
                    }
                })


                API["code/list"]({type:'projecttype'}).then(function (response) {
                    $scope.programTypes = [];
                    $scope.programTypes =response.data.data
                })

                API["code/list"]({type:'project_cycle'}).then(function (response) {
                    $scope.projectcycle = [];
                    for (var i = 0; i < response.data.data.length; i++) {
                        $scope.projectcycle.push(response.data.data[i]);
                    }
                })

                API["code/list"]({type:'project_respondent'}).then(function (response) {
                    $scope.projectrespondent = [];
                    for (var i = 0; i < response.data.data.length; i++) {
                        $scope.projectrespondent.push(response.data.data[i]);
                    }
                })

                /*add*/
                self.enterProject=enterProject;
                self.configPageShowC =configPageShowC;
                self.loginer={};

                $scope.content = [];
                //获取用户名
                userinformlistService.experiencer.list()
                    .then(function (response) {
                        self.loginer.info=response.data.data;
                    })
                //获取用户图片
                userinformlistService.getPortrait()
                    .then(function (response) {
                        if (response.data.flag == 'success') {
                            self.loginer.portarait = response.data.data;
                            $rootScope.currentUser.ExpPortrait=response.data.data;
                        }
                    });


                $scope.getRecentProject=function(){
                    API['project/list']({pageSize:100,pageNo:1,recent:1}).then(function(response){
                        if(response.data.flag==="success"){
                            $scope.recentProjectList=response.data.data.data;
                            $scope.presentProject=$scope.recentProjectList[0];
                            if($scope.presentProject){
                                API['attachment/fetch']({projecttag:$scope.presentProject.tag,attachment_id:$scope.presentProject.title_photo}).then(function(response){
                                    if(response.data.flag=='success'){
                                        $scope.recent_project_intro_img= response.data.data;
                                    }
                                });
                            }
                        }
                    })
                }
                $scope.getPortrait = function (event) {
                    userinformlistService.getPortrait(event.userid)
                        .then(function (response) {
                            if(response.data.flag=='success'){
                                event.portrait = response.data.data;
                                //console.log($scope.portrait);
                            }
                        });
                };
                $scope.RecentgetPortrait = function (event) {
                    userinformlistService.getPortrait(event.userid)
                        .then(function (response) {
                            if(response.data.flag=='success'){

                                event.portrait = response.data.data;
                            }
                        });
                };
                $scope.setRecentProject=function(projecttag){
                    if(projecttag){
                        API['user/set-recent-project']({projecttag:projecttag}).then(function(response){
                            /*if(response.data.flag=="success"){
                                console.log("设置最近项目成功！");
                            }else{
                                console.log("设置最近项目成功！");
                            }*/
                        })
                    }
                }

                $scope.getRecentProject();
                $scope.projectList();

                function putproject(project) {
                    projectService.sessionStorageProject(project);
                }

                function enterProject(project) {
                    if(!project||!project.tag){
                        return 0;
                    }
                    project.projecttag=project.tag;
                    putproject(project);
                    $scope.setRecentProject(project.projecttag);

                    API['project/get-project-config']().then(function(response){
                        if(response.data.flag=="success"){
                            commonService.projectConfig=response.data.data;
                        }
                    })

                    API['project/get-project-introduction']()
                        .then(function (response) {
                            if (response.data.flag == 'success') {
                                var p = response.data.data;
                                if (p.description) {
                                    API['task/get-task-status-for-experiencer-or-observer']()
                                        .then(function(response){
                                            if(response.data.flag='success'){

                                            }
                                        })
                                    $state.go("project_home");
                                } else {
                                    $state.go("project_home");
                                }
                            }
                        })
                }

                function configPageShowC ($event) {
                    if(!$scope.presentProject.tag){
                        return 0;
                    }
                    $event.stopPropagation();
                    $scope.presentProject.projecttag=$scope.presentProject.tag;
                    putproject($scope.presentProject);
                    $scope.setRecentProject($scope.presentProject.projecttag);
                    $state.go("config_respondent");
                };


            }
        ])
})
()