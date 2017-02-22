/**
 * Created by liting on 2015/8/17 0029.
 */

(function () {
    angular
        .module('InfoMiningApp')
        .config(function ($mdIconProvider) {
            var path = 'assets/iconsets/',
                iconSets = [
                    'action',
                    'alert',
                    'av',
                    'communication',
                    'content',
                    'device',
                    'editor',
                    'file',
                    'hardware',
                    'image',
                    'maps',
                    'navigation',
                    'notification',
                    'social',
                    'toggle'
                ];
            iconSets.forEach(function (iconSet) {
                $mdIconProvider.iconSet(iconSet, path + iconSet + '-icons.svg', 24);
            });
        })
        .config(function ($mdThemingProvider, $mdIconProvider) {
            $mdIconProvider
                .defaultIconSet("./assets/svg/avatars.svg", 128)
                .icon("menu", "./assets/svg/menu.svg", 24);
            $mdThemingProvider.theme('default')
                .primaryPalette('blue', {
                    'default': '500',
                    'hue-1': '100',
                    'hue-2': '200',
                    'hue-3': '300'
                })
                .accentPalette('red');

            $mdIconProvider
                .icon('jet', './assets/svg-ionicons/jet.svg', 512)
                .icon('reply-all', './assets/svg-ionicons/reply-all.svg', 512)
                .icon('home', './assets/svg-icons/home.svg', 60)
                .icon('rapid-response', './assets/svg-icons/btn-rapid-response.svg', 60)
                .icon('rapid_response', './assets/svg-icons/btn-rapid-response.svg', 60)
                .icon('conversation', './assets/svg-icons/conversation.svg', 60)
                .icon('around-you', './assets/svg-icons/around-you.svg', 60)
                .icon('around_you', './assets/svg-icons/around-you.svg', 60)
                .icon('poll', './assets/svg-icons/poll2.svg', 60)
                .icon('add', './assets/svg-icons/add.svg', 60)
                .icon('export', './assets/svg-icons/export.svg', 60)
                .icon('import', './assets/svg-icons/import.svg', 60)
                .icon('image', './assets/svg-ionicons/image.svg', 512)
                .icon('group', './assets/svg-icons/group_icon.svg',60)
                .icon('lock', './assets/svg-icons/lock_icon.svg',60)
                .icon('comment', './assets/svg-icons/chatbubble-working.svg',60)
                .icon('heart', './assets/svg-icons/ios-heart.svg',60)
                .icon('heart-outline', './assets/svg-icons/ios-heart-outline.svg',60)
                .icon('delect_user', './assets/svg-icons/delect_icon.svg',60)
                .icon('unlock', './assets/svg-icons/unlock_icon.svg',60)
                .icon('email', './assets/svg-icons/ios-email.svg',60)
                .icon('chevron-up', './assets/svg-icons/chevron-up.svg',60)
                .icon('like', './assets/svg-icons/like.svg',60)
                .icon('Islike', './assets/svg-icons/Islike.svg',60)
                .icon('comment', './assets/svg-icons/comment.svg',60)
                .icon('comment1', './assets/svg-icons/maopao.svg',60)
                .icon('format-quote', './assets/svg-icons/yinyong.svg',60)

        })
        .config(function ($httpProvider) {
            // attach our auth interceptor to the http requests
            $httpProvider.interceptors.push('AuthInterceptor');
        })
        .run(function (constants) {
            window.localStorage['apiBaseUrl'] = 'http://127.0.0.1/api/index.php?r=';
            constants.TASKINTRO={};
            constants.TASKINTRO[constants.MODULE_RAPID]={
                title:"快速响应",
                info:'提醒优先级最高的任务，希望被访者在24小时内给予响应，适合单一话题或临时加' +
                '入的话题使用。与对话任务的区别在于提醒优先级和默认有效期。'
            }
            constants.TASKINTRO[constants.MODULE_CONVERSATION]={
                title:"对话",
                info:'可以在一个大主题下设置n个话题，当所有话题都完成后，' +
                '才判定该任务完成，默认有效期为一周，一般适合根据已经计划好的大纲内容进行设置。'
            }
            constants.TASKINTRO[constants.MODULE_AROUND_YOU]={
                title:"在您身边",
                info:'由被访者根据预设问题的顺序采访一个身边的人，结合对方的' +
                '意见进行回答，非常适合创造性话题，或预测被访者需要长篇大论的任务，默认有效期1周。'
            }
            constants.TASKINTRO[constants.MODULE_POLL]={
                title:"投票",
                info:'可以设置最多10个选项的投票，目前只限单选，可设置被访者投票后' +
                '能看到结果或无法看到结果，评论的内容将基于任务级堆叠，默认有效期1周。'
            }
        })
        .run(['AclService', 'constants', function (AclService, constants) {
            var aclData = {};
            aclData[constants.ROLE_GUEST] = constants.PERMISSION_FOR_GUEST;
            aclData[constants.ROLE_ADMINISTRATOR] = constants.PERMISSION_FOR_ADMINISTRATOR;
            aclData[constants.ROLE_THINKER] = constants.PERMISSION_FOR_THINKER;
            aclData[constants.ROLE_PROJECTADMINISTRATOR] = constants.PERMISSION_FOR_PROJECTADMINISTRATOR;
            aclData[constants.ROLE_EXPERIENCER] = constants.PERMISSION_FOR_EXPERIENCER;
            aclData[constants.ROLE_OBSERVER] = constants.PERMISSION_FOR_OBSERVER;
            aclData[constants.ROLE_RESPONDENT] = constants.PERMISSION_FOR_RESPONDENT;
            AclService.setAbilities(aclData);
            AclService.attachRole(constants.ROLE_GUEST);
        }])
        .run(['API','commonService',function(API,commonService){
            API['project/get-project-config']().then(function(response){
                if(response.data.flag=="success"){
                    commonService.projectConfig=response.data.data;

                }else{
                    commonService.projectConfig={}
                }
            })
        }])
        .filter('nospace', function () {
            return function (value) {
                return (!value) ? '' : value.replace(/ /g, '');
            };
        })
        .filter('humanizeDoc', function () {
            return function (doc) {
                if (!doc) return;
                if (doc.type === 'directive') {
                    return doc.name.replace(/([A-Z])/g, function ($1) {
                        return '-' + $1.toLowerCase();
                    });
                }

                return doc.label || doc.name;
            };
        })
        .filter('to_trusted', ['$sce', 'constants', function ($sce, constants) {
            return function (text) {
                var content = text;
                if (content) {
                    content = content.replace(/\n/g, "<br/>");
                    var emotionkeys = constants.EMOTION_KEYS;
                    content = replaceToImage(content, emotionkeys, constants.EMOTION_FILE_PATH, 'e', '.gif', constants.EMOTION_LEFT_TAG, content.EMOTION_RIGHT_TAG);
                    return $sce.trustAsHtml(content);
                } else {
                    return '';
                }
            }
        }])
        .filter("customDateFormat", function ($filter) {
            return function (date, format) {
                return $filter('date')(new Date(date), format);
            }
        })
        .filter("replyFirstLine", ['$sce', 'constants', function ($sce, constants) {
            return function (text) {
                var content = text;
                if (content) {
                    var index = content.search(/\n/g);
                    content = (index > -1) ? content.substring(0, index + 1) : content;
                    var emotionkeys = constants.EMOTION_KEYS;
                    content = replaceToImage(content, emotionkeys, constants.EMOTION_FILE_PATH, 'e', '.gif', constants.EMOTION_LEFT_TAG, content.EMOTION_RIGHT_TAG);
                    return $sce.trustAsHtml(content);
                } else {
                    return '';
                }
            }
        }])
}());
