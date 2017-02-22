var app = angular.module('app.routes', ['ui.router']);
app.config(["$stateProvider", "$urlRouterProvider",  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/something");
    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "src/views/common/login.html"
        })
        .state("something", {
            url: "/something",
            templateUrl: "./src/views/common/something.html"
        })
        .state('main', {
            templateUrl: "src/views/common/main.html",
            controller: "MainController",
            controllerAs: "main",
            abstract: true
        })
        .state('reset_password', {
            url: "/reset_password?token=",
            controller: 'ResetPasswordController',
            controllerAs: 'reset',
            templateUrl: "src/views/reset_password.html"
        })
        .state('forget_password', {
            url: "/forget_password",
            templateUrl: "src/views/common/forget_password.html"
        })
        .state('participator_set',{
            url: "/participator-set?pageIndex",
            parent: 'main',
            templateUrl:'src/views/exp/participator_set.html'
        })
        .state("respondent_home", {
            url: "/respondent",
                parent: 'main',
                templateUrl: "src/views/resp/respondent.html",
                controller: 'RespondentController',
                controllerAs: 'rsdCtrl',
                resolve: {
                projectConfig: function (projectService) {
                    return projectService.getProjectConfig();
                }
            }
        })
        .state('experiencer_home', {
            params: {
                page: '', module: '', taskid: '', topicid: '', userid: '', preset_property: [], custom_property: []
            },
            resolve: {
                projectConfig: function (projectService) {
                    return projectService.getProjectConfig();
                },
                taskConfig: function ($stateParams, task) {
                    return task.getTaskConfig($stateParams.taskid);
                },
                taskDetail: function ($stateParams, task) {
                    if ($stateParams.taskid) {
                        return task.getTaskDetail($stateParams.taskid);
                    }
                }
            },
            url: "/home",
            parent: 'main',
            templateUrl: function ($stateParams) {
                switch ($stateParams.page) {
                    case 'home':
                        return "src/views/exp/project_home.html";
                        break;
                    case 'list':
                        return "src/views/exp/task_list.html";
                        break;
                    case 'detail':
                        return "src/views/exp/task_detail.html";
                        break;
                    case 'topic_detail':
                        return "src/views/exp/topic_detail.html";
                        break;
                    case 'reply_detail':
                        return "src/views/exp/reply_detail.html";
                        break;
                    default:
                        return "src/views/exp/project_home.html";
                }
            },
            controllerProvider: function ($stateParams) {
                switch ($stateParams.page) {
                    case 'home':
                        return "projectHomeController as home";
                        break;
                    case 'list':
                        return "TaskListController as taskListCtrl";
                        break;
                    case 'detail':
                        return "ExpTaskDetailController as taskDetailCtrl";
                        break;
                    case 'topic_detail':
                        return "ExpTopicDetailController as topicDetailCtrl";
                        break;
                    case 'reply_detail':
                        return "ReplyDetailController as replyDetailCtrl";
                        break;
                    default:
                        return "projectHomeController as home";
                }
            }
        })
        .state('project', {
            url: "/project",
            parent: 'main',
            templateUrl: "src/views/exp/project_manage.html"
        })

        .state('config_project', {
            url: "/config/project",
            parent: 'main',
            templateUrl: "src/views/exp/config_project.html"
        })
        .state('property_set', {
            url: "/properties",
            parent: 'main',
            templateUrl: "src/views/exp/property_set.html"
        })
        .state('group_set', {
            params: {
                mode: 'new', group_id: ''
            },
            url: "/groups/group_set",
            parent: 'main',
            templateUrl: 'src/views/exp/group_set.html'
        })
       .state('project_home', {
            resolve: {
                projectConfig: function (projectService) {
                    return projectService.getProjectConfig();
                }
            },
            url: "/project_home",
            parent: 'main',
            templateUrl: "src/views/exp/project_home.html",
            controller: "projectHomeController",
            controllerAs: "home"
        }).state('apk',{
            url:'/download/android',
            templateUrl:'download/apk/something.apk'
        });
}]);
