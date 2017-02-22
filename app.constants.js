/**
 * Created by liting on 2016/5/19.
 */

(function () {
    var apiBaseUrl=location.protocol+"//"+location.host+"/api/index.php?r=";
    //var apiBaseUrl="http://121.196.236.118/api/index.php?r=";
   // var apiBaseUrl="http://localhost/api/index.php?r=";
    //var apiBaseUrl="/api/index.php?r=";
    //var apiBaseUrl="http://121.196.236.118/api/index.php?r=";
    angular
        .module('InfoMiningApp')
        .constant('apiUrlArray',[
            /*------------------------------登录url-------------------------------*/
            {name:'file/get-version',params:[],method:'get'},
            {name:'user/login',params:["loginName","password"],method:'post'},
            {name:'user/verification-code',params:[],method:'get'},
            {name:'user/send-reset-password',params:["loginName"],method:'post'},
            /*-----------------------------项目相关url-------------------------------*/
            {name:'project/create',params:["projectname","projectid","ponumber","type","industrytype","customer","price","display_name","video","cycle","category","samplelimit"],method:'post'},
            {name:'project/update-base-info',params:["projecttag","projectname","projectid","ponumber","tag","createuserid","createtime","endtime","samplelimit","cycle",
                "video","topic_summarywordcountlimit","samplelimit","addcomment","seereply","termsandconditions","createuser_display_name","ispast"],method:'post'},
            {name:'project/update-project-introduction',params:["projecttag","attachment","title","description","title_photo"],method:'post'},
            {name:'project/update-project-participant',params:["projecttag","action"],method:'post'},//更新设置参与者状态
            {name:'project/update-project-task',params:["projecttag","action"],method:'post'},//配置任务教程步骤
            {name:'project/list',params:["pageSize","pageNo","recent"],method:'get'},
            {name:'project/base-info',params:['projecttag'],method:'get'},
            {name:'project/get-project-introduction',params:["projecttag"],method:'get'},
            {name:'project/get-project-config',params:["projecttag"],method:'get'},
            {name:'project/detail',params:[],method:'get'},
            {name:'task/get-task-status-for-experiencer-or-observer',params:["projecttag"],method:'get'},
            {name:'project/calc-price',params:["video","samplelimit","cycle"],method:'get'},
            {name:'project/get-price-data',params:[],method:'get'},
            /*------------------------------属性相关url-----------------------------*/
            {name:'property/check',params:["","",""],method:'post'},//检查属性名称是否已存在
            {name:'property/create',params:["","",""],method:'post'},//添加自定义属性
            {name:'property/tree',params:["","",""],method:'post'},//以树形方式查询被访者属性
            {name:'property/get-property-option-by-property-id',params:["","",""],method:'post'},//根据属性ID查询该属性的的选项
            {name:'property/move',params:["","",""],method:'post'},//选择或取消选择被访者属性
            {name:'property/list',params:["","",""],method:'post'},//查询被访者所有的属性（包括固定属性）
            {name:'property/get-property-reference-value',params:["","",""],method:'post'},//获取属性参考值
            {name:'property/get-property-for-task',params:["","",""],method:'post'},//获取属性树形
            {name:'property/get-property-by-packet',params:["","",""],method:'post'},//根据pack_id获取属性
            {name:'property/get-property-options',params:["","",""],method:'post'},//获取属性选项
            {name:'property/get-respondent-property-tree',params:["","",""],method:'post'},//获取项目中被访者所有属性
            {name:'property/choose-property',params:["","",""],method:'post'},//选择属性
            {name:'property/remove-chose-property',params:["","",""],method:'post'},//移除属性
            {name:'property/assign-property',params:["","",""],method:'post'},//分配属性
            {name:'property/update',params:["","",""],method:'post'},//修改自定义属性?r=notification/list
            /*被访者消息*/
            {name:'notification/list',params:["projecttag","topN"],method:'get'},//获取消息列表参数projecttag
            {name:'notification/fetch-count',params:["projecttag","userid"],method:'post'},//获取消息通知数量projecttag,userid
            {name:'notification/update-notice-status',params:["projecttag","id","status"],method:'post'},//更新消息通知状态projecttag,id,status
            {name:'notification/list-v2',params:["projecttag","userid","type","pageno","pagesize"],method:'get'},//获取消息通知列表
            /*研究员管理被访者标签*/
            {name:'tag/add',params:["","",""],method:'post'},//添加标签,参数(string projecttag, string name)
            {name:'tag/add-tag-for-respondent',params:["","",""],method:'post'},//给被访者添加标签,参数(string projecttag,string userid,string name)
            {name:'tag/remove-tag-for-respondent',params:["","",""],method:'post'},//给被访者删除标签,参数(string projecttag,string userid,string name)
            {name:'tag/list-for-respondent',params:["","",""],method:'post'},//查询被访者可用标签，即项目存在但被访者没有的标签,参数(string projecttag, string userid)

            /*---------------------------用户相关url--------------------------------*/
            {name:'user/set-recent-project',params:["projecttag"],method:'post'},//设置最近参与的项目
            {name:'user/create',params:["","",""],method:'post'},//创建用户(体验者、观察者、被访者)
            {name:'user/list',params:["projecttag","type","pageSize","pageNo"],method:'get'},//查询用户列表
            {name:'user/get-user-info',params:["","",""],method:'post'},//获取用户信息
            {name:'user/get-top-role',params:["","",""],method:'post'},//获取用户最高权限的角色
            {name:'user/fetch-portrait',params:["userid"],method:'get'},//获取用户头像
            {name:'user/change-portrait',params:["","",""],method:'post'},//修改用户头像
            {name:'user/select-experiencer-or-observer',params:["","",""],method:'post'},//添加已有的体验者或观察者
            {name:'user/list-user-info-for-custom-group',params:["","",""],method:'post'},//根据分组信息获取用户信息
            {name:'user/modify-password',params:["","",""],method:'post'},//修改密码
            {name:'user/delete-experiencer-or-observer',params:["","",""],method:'post'},//删除体验者或被访者(new)
            {name:'user/update-personal-information',params:["","",""],method:'post'},//修改个人资料
            {name:'user/update-respondent',params:["","",""],method:'post'},
            {name:'output-excel/getmodel',params:["","",""],method:'post'},//导出模板
            {name:'output-excel/importdata',params:["","",""],method:'post'},//导入excel表数据
            {name:'user/create-respondent',params:["","",""],method:'post'},//创建体验者用户(NEW)
            {name:'user/create-reset-token',params:["","",""],method:'post'},//发送重置密码邮件
            {name:'user/create-token',params:["","",""],method:'post'},//发送重置密码邮件
            {name:'property/list',params:["","",""],method:'post'},//项目被访者的属性列表，参数（projecttag）
            {name:'user/count-user',params:["","",""],method:'post'},//统计人数（被访者/体验者和观察者）
            {name:'user/delete-experiencer-or-observer',params:["","",""],method:'post'},//删除体验者或被访者
            {name:'user/delete-respondent',params:["","",""],method:'post'},//删除体验者或被访者
            {name:'user/lock-respondent',params:["","",""],method:'post'},//锁定被访者
            {name:'user/unlock-respondent',params:["","",""],method:'post'},//解锁被访者
            {name:'user/keep-alive',params:[],method:'post'},
            {name:'user/logout',params:["","",""],method:'post'},
            {name:'follow/add-follow',params:["projecttag","followuserid"],method:'post'},//被访者增加关注
            {name:'follow/cancel-follow',params:["projecttag","followuserid"],method:'post'},//被访者取消关注
            {name:'follow/get-follow',params:["projecttag"],method:'get'},//获取关注列表

            {name:'user/reset-password',params:["resetpath"],method:'get'},//重置密码

            /*---------------------------分组相关url--------------------------------*/
            {name:'group/list-respondent-property-for-group',params:["","",""],method:'post'},//创建属性分组时，列出被访者可用的属性列表
            {name:'group/list-preset-group',params:["projecttag"],method:'get'}, //列出系统可用的预设分组
            {name:'group/list-custom-group',params:["projecttag"],method:'get'},//列出项目可用的自定义分组
            {name:'group/list-user-for-custom-group',params:["","",""],method:'post'},//查询符合分组条件的用户
            {name:'group/list-unselected-user-for-group',params:["","",""],method:'post'},//查询未选择的用户
            {name:'group/list-selected-user-for-group',params:["","",""],method:'post'},//查询已选择的用户
            {name:'group/create',params:["","",""],method:'post'},//创建分组
            {name:'group/update',params:["","",""],method:'post'},//更新分组
            {name:'group/get-new-seq',params:["","",""],method:'post'},//获取分组最新的序号
            {name:'group/check',params:["","",""],method:'post'},//检查是否存在相同的组名
            {name:'group/set-preset-group-activation',params:["","",""],method:'post'},//设置分组是否激活
            {name:'group/count-activated-group',params:["","",""],method:'post'},//获取已激活的分组数（包括自定义分组）
            {name:'group/delete-respondent-group',params:["","",""],method:'post'},//删除自定义分组
            {name:'group/respondent-in-group',params:['projecttag'],method:'get'},


            /*----------------------------任务相关url------------------------------*/
            {name:'task/create',params:["projecttag","module","title_task","description_task","title","description","group_id", "starttime","endtime","isothersreply",
                                      "isuploadphoto","iscomment","isuploadphoto","isuploadvideo","isordering","attachment","isvisible","questions","option"],method:'post'},//创建任务
            {name:'task/update',params:["","",""],method:'post'},//更新任务
            {name:'task/delete',params:["","",""],method:'post'},//删除任务
            {name:'task/get-top-task',params:["","",""],method:'post'},//获取最新任务(体验者、观察者、被访者)
            {name:'task/get-respondent-task-info',params:["","",""],method:'post'},//获取被访者任务详细信息
            {name:'task/update-respondent-task-status',params:["","",""],method:'post'},//更新被访者任务状态
            {name:'task/list',params:["","",""],method:'post'},//获取任务列表
            {name:'task/get-task-config',params:["","",""],method:'post'},//获取任务配置
            {name:'task/update-task-status',params:["","",""],method:'post'},//更新任务状态
            {name:'task/list-simple-info',params:["","",""],method:'post'},//获取任务列表（只包含简单统计）
            {name:'download-data/create-rapid-task-data',params:["","",""],method:'post'},
            {name:'download-data/create-aroundyou-task-data',params:["","",""],method:'post'},
            {name:'download-data/create-poll-task-data',params:["","",""],method:'post'},
            {name:'download-data/download-data',params:["","",""],method:'post'},
            /*----------------------------主题相关url------------------------------*/
            {name:'topic/create',params:["","",""],method:'post'},//创建主题
            {name:'topic/update',params:["","",""],method:'post'},//更新主题
            {name:'topic/delete',params:["","",""],method:'post'},//删除主题
            {name:'topic/list-topic-for-task',params:["","",""],method:'post'},//查找任务里包含的主题
            {name:'topic/get-topic-info',params:["","",""],method:'post'},//获取主题的详细信息
            {name:'topic/update-respondent-topic-status',params:["","",""],method:'post'},//更新被访者任务状态
            {name:'download-data/create-conversation-topic-data',params:["","",""],method:'post'},
            {name:'topic/update-topic-status',params:["","",""],method:'post'},//更新主题状态
            {name:'topic/refresh-seq',params:["projecttag","topicidlist"],method:'post'},//更新主题seq

            /*----------------------------相关话题相关url------------------------------*/
            {name:'related-post/list',params:["","",""],method:'post'},//被访者查询相关话题

            /*----------------------------回复相关url------------------------------*/
            {name:'reply/reply',params:["","",""],method:'post'},//添加回复
            {name:'reply/get',params:["","",""],method:'post'},//获取某条回复，参数projecttag,replyid
            {name:'reply/list-reply-user',params:["","",""],method:'post'},//查询已回复的被访者()
            {name:'reply/list-reply-for-user',params:["","",""],method:'post'},//查询被访者所有回复
            {name:'attitude/add-reply-like',params:["","",""],method:'post'},//回复点赞
            {name:'attitude/remove-reply-like',params:["","",""],method:'post'},//取消回复点赞
            {name:'reply/list-reply-for-task-or-topic',params:["","",""],method:'post'},//查询任务或主题的所有回复,
            {name:'reply/delete',params:["","",""],method:'post'},//删除回复
            {name:'reply/set-useful',params:["","",""],method:'post'},//设置回复是否有用信息
            {name:'reply/create-or-update',params:["","",""],method:'post'},//新增或修改回复，现在在around_you问题回复使用
            /*-----------------------------评论相关url-----------------------------*/

            {name:'comment/comment',params:["","",""],method:'post'},
            {name:'attitude/add-comment-like',params:["","",""],method:'post'},//评论点赞
            {name:'attitude/remove-comment-like',params:["","",""],method:'post'},//取消评论点赞
            {name:'comment/list-comment',params:["","",""],method:'post'},//获取评论列表,
            {name:'comment/delete',params:["","",""],method:'post'},//删除评论
            {name:'comment/set-useful',params:["","",""],method:'post'},//设置评论是否有用信息

            /*-----------------------------投票相关url----------------------------*/

            {name:'poll/poll',params:["","",""],method:'post'},//投票
            /*------------------------------分析url------------------------------*/

            {name:'wordcloud/get-word',params:["","",""],method:'post'},
            /*------------------------------通用url------------------------------*/
            {name:'attachment/fetch',params:["projecttag","attachment_id"],method:'get'},
            {name:'code/list',params:["type"],method:'get'},
            {name:'code/list-client',params:[],method:'get'},
            {name:'code/list-category',params:["industrytype"],method:'get'},
            {name:'attachment/upload',params:["","",""],method:'post'},

        ])
        .constant('apiUrls', {
            prefix: apiBaseUrl,
            /*------------------------------登录url-------------------------------*/
            login: apiBaseUrl + 'user/login',
            get_version: apiBaseUrl + 'file/get-version',
            /*-----------------------------项目相关url-------------------------------*/
            create_project: apiBaseUrl + 'project/create',//创想者创建新项目
            update_base_info: apiBaseUrl + 'project/update-base-info',//体验者更新项目基本信息
            update_project_introduction: apiBaseUrl + 'project/update-project-introduction',//更新项目简介
            update_project_participant: apiBaseUrl + 'project/update-project-participant',//更新设置参与者状态
            update_project_task: apiBaseUrl + 'project/update-project-task',//配置任务教程步骤
            list_project: apiBaseUrl + 'project/list',//体验者查询项目列表
            get_project_base_info: apiBaseUrl + 'project/base-info',//研究员查询项目基本信息
            get_project_introduction: apiBaseUrl + 'project/get-project-introduction',//查询项目简介
            get_project_config: apiBaseUrl + 'project/get-project-config',//获取项目配置
            get_project_detail: apiBaseUrl + 'project/detail',//查询项目详细信息
            get_task_status_for_experiencer_or_observer: apiBaseUrl + 'task/get-task-status-for-experiencer-or-observer',//查询是否有看设置过程的状态
            calc_price: apiBaseUrl + 'project/calc-price',//计算项目价格 参数（video是否需要上传视频，samplelimit样本上限，cycle项目周期）
            get_price_data:apiBaseUrl+'project/get-price-data',//获取计价表
            /*------------------------------属性相关url-----------------------------*/
            check_property_comment: apiBaseUrl + 'property/check',//检查属性名称是否已存在
            create_property: apiBaseUrl + 'property/create',//添加自定义属性
            property_tree: apiBaseUrl + 'property/tree',//以树形方式查询被访者属性
            get_property_with_property_id: apiBaseUrl + 'property/get-property-option-by-property-id',//根据属性ID查询该属性的的选项
            property_tree_move: apiBaseUrl + 'property/move',//选择或取消选择被访者属性
            get_property_list: apiBaseUrl + 'property/list',//查询被访者所有的属性（包括固定属性）
            get_property_reference_value: apiBaseUrl + 'property/get-property-reference-value',//获取属性参考值
            get_property_for_task: apiBaseUrl + 'property/get-property-for-task',//获取属性树形
            get_preset_packet: apiBaseUrl + 'property/get-preset-packet',//获取属性大类
            get_properties_by_packet: apiBaseUrl + 'property/get-property-by-packet',//根据pack_id获取属性
            get_property_options: apiBaseUrl + 'property/get-property-options',//获取属性选项
            get_respondent_property_tree: apiBaseUrl + 'property/get-respondent-property-tree',//获取项目中被访者所有属性
            choose_property: apiBaseUrl + 'property/choose-property',//选择属性
            remove_chose_property: apiBaseUrl + 'property/remove-chose-property',//移除属性
            assign_property: apiBaseUrl + 'property/assign-property',//分配属性
            update_custom_property: apiBaseUrl + 'property/update',//修改自定义属性?r=notification/list
            //被访者消息
            notification_list: apiBaseUrl + 'notification/list',//获取消息列表参数projecttag
            notification_fetch_count: apiBaseUrl + 'notification/fetch-count',//获取消息通知数量projecttag,userid
            notification_update_notice_status: apiBaseUrl + 'notification/update-notice-status',//更新消息通知状态projecttag,id,status
            //研究员管理被访者标签
            add_tag:apiBaseUrl +'tag/add',//添加标签,参数(string projecttag, string name)
            add_tag_for_respondent:apiBaseUrl +'tag/add-tag-for-respondent',//给被访者添加标签,参数(string projecttag,string userid,string name)
            remove_tag_for_respondent:apiBaseUrl +'tag/remove-tag-for-respondent',//给被访者删除标签,参数(string projecttag,string userid,string name)
            list_for_respondent:apiBaseUrl +'tag/list-for-respondent',//查询被访者可用标签，即项目存在但被访者没有的标签,参数(string projecttag, string userid)
            /*---------------------------用户相关url--------------------------------*/
            set_recent_project: apiBaseUrl + 'user/set-recent-project',//设置最近参与的项目
            create_user: apiBaseUrl + 'user/create',//创建用户(体验者、观察者、被访者)
            list_user: apiBaseUrl + 'user/list',//查询用户列表
            get_user_info: apiBaseUrl + 'user/get-user-info',//获取用户信息
            get_top_role: apiBaseUrl + 'user/get-top-role',//获取用户最高权限的角色
            fetch_portrait: apiBaseUrl + 'user/fetch-portrait',//获取用户头像
            change_portrait: apiBaseUrl + 'user/change-portrait',//修改用户头像
            select_experiencer_or_observer: apiBaseUrl + 'user/select-experiencer-or-observer',//添加已有的体验者或观察者
            list_user_info_for_custom_group: apiBaseUrl + 'user/list-user-info-for-custom-group',//根据分组信息获取用户信息
            modify_password: apiBaseUrl + 'user/modify-password',//修改密码
            delete_experiencer_or_observer: apiBaseUrl + 'user/delete-experiencer-or-observer',//删除体验者或被访者(new)
            update_personal_information: apiBaseUrl + 'user/update-personal-information',//修改个人资料
            update_respondent: apiBaseUrl + 'user/update-respondent',
            get_Excel_model: apiBaseUrl + 'output-excel/getmodel',//导出模板
            upload_Excel: apiBaseUrl + 'output-excel/importdata',//导入excel表数据
            create_respondent: apiBaseUrl + 'user/create-respondent',//创建体验者用户(NEW)
            create_reset_token: apiBaseUrl + 'user/create-reset-token',//发送重置密码邮件
            token_check: apiBaseUrl + 'user/create-token',//发送重置密码邮件
            property_list: apiBaseUrl + 'property/list',//项目被访者的属性列表，参数（projecttag）
            count_user: apiBaseUrl + 'user/count-user',//统计人数（被访者/体验者和观察者）
            delect_experiencer_or_observer: apiBaseUrl + 'user/delete-experiencer-or-observer',//删除体验者或被访者
            delect_respondent: apiBaseUrl + 'user/delete-respondent',//删除体验者或被访者
            lock_respondent:apiBaseUrl+'user/lock-respondent',//锁定被访者
            unlock_respondent:apiBaseUrl+'user/unlock-respondent',//解锁被访者
            keep_alive: apiBaseUrl + 'user/keep-alive',
            logout: apiBaseUrl + 'user/logout',
            /*---------------------------分组相关url--------------------------------*/
            list_respondent_property_for_group: apiBaseUrl + 'group/list-respondent-property-for-group',//创建属性分组时，列出被访者可用的属性列表
            list_preset_group: apiBaseUrl + 'group/list-preset-group',//列出系统可用的预设分组
            list_custom_group: apiBaseUrl + 'group/list-custom-group',//列出项目可用的自定义分组
            list_user_for_custom_group: apiBaseUrl + 'group/list-user-for-custom-group',//查询符合分组条件的用户
            list_unselected_user_for_group: apiBaseUrl + 'group/list-unselected-user-for-group',//查询未选择的用户
            list_selected_user_for_group: apiBaseUrl + 'group/list-selected-user-for-group',//查询已选择的用户
            create_group: apiBaseUrl + 'group/create',//创建分组
            update_group: apiBaseUrl + 'group/update',//更新分组
            get_new_seq_for_group: apiBaseUrl + 'group/get-new-seq',//获取分组最新的序号
            check_group_comment: apiBaseUrl + 'group/check',//检查是否存在相同的组名
            activate_group: apiBaseUrl + 'group/set-preset-group-activation',//设置分组是否激活
            count_activated_group: apiBaseUrl + 'group/count-activated-group',//获取已激活的分组数（包括自定义分组）
            delete_respondent_group: apiBaseUrl + 'group/delete-respondent-group',//删除自定义分组

            /*----------------------------任务相关url------------------------------*/
            create_task: apiBaseUrl + 'task/create',//创建任务
            update_task: apiBaseUrl + 'task/update',//更新任务
            delete_task: apiBaseUrl + 'task/delete',//删除任务
            get_top_task: apiBaseUrl + 'task/get-top-task',//获取最新任务(体验者、观察者、被访者)
            get_respondent_task_info: apiBaseUrl + 'task/get-respondent-task-info',//获取被访者任务详细信息
            update_respondent_task_status: apiBaseUrl + 'task/update-respondent-task-status',//更新被访者任务状态
            list_task: apiBaseUrl + 'task/list',//获取任务列表
            get_task_config: apiBaseUrl + 'task/get-task-config',//获取任务配置
            update_task_status: apiBaseUrl + 'task/update-task-status',//更新任务状态
            list_task_simple_info: apiBaseUrl + 'task/list-simple-info',//获取任务列表（只包含简单统计）
            output_rapid_data:apiBaseUrl+'download-data/create-rapid-task-data',
            output_around_you:apiBaseUrl+'download-data/create-aroundyou-task-data',
            output_poll:apiBaseUrl+'download-data/create-poll-task-data',
            download_data:apiBaseUrl+'download-data/download-data',

            /*----------------------------主题相关url------------------------------*/
            create_topic: apiBaseUrl + 'topic/create',//创建主题
            update_topic: apiBaseUrl + 'topic/update',//更新主题
            delete_topic: apiBaseUrl + 'topic/delete',//删除主题
            list_topic_for_task: apiBaseUrl + 'topic/list-topic-for-task',//查找任务里包含的主题
            get_topic_info: apiBaseUrl + 'topic/get-topic-info',//获取主题的详细信息
            update_respondent_topic_status: apiBaseUrl + 'topic/update-respondent-topic-status',//更新被访者任务状态
            output_conversation_topic_data:apiBaseUrl+'download-data/create-conversation-topic-data',
            update_topic_status: apiBaseUrl + 'topic/update-topic-status',//更新主题状态
            /*----------------------------相关话题相关url------------------------------*/
            list_related_post: apiBaseUrl + 'related-post/list',//被访者查询相关话题

            /*----------------------------回复相关url------------------------------*/
            submit_reply: apiBaseUrl + 'reply/reply',//添加回复
            get_reply: apiBaseUrl + 'reply/get',//获取某条回复，参数projecttag,replyid
            list_reply_user: apiBaseUrl + 'reply/list-reply-user',//查询已回复的被访者()
            list_reply_for_user: apiBaseUrl + 'reply/list-reply-for-user',//查询被访者所有回复
            add_reply_like: apiBaseUrl + 'attitude/add-reply-like',//回复点赞
            remove_reply_like: apiBaseUrl + 'attitude/remove-reply-like',//取消回复点赞
            list_reply_for_task_or_topic: apiBaseUrl + 'reply/list-reply-for-task-or-topic',//查询任务或主题的所有回复,
            delete_reply: apiBaseUrl + 'reply/delete',//删除回复
            set_reply_useful: apiBaseUrl + 'reply/set-useful',//设置回复是否有用信息
            create_or_update: apiBaseUrl + 'reply/create-or-update',//新增或修改回复，现在在around_you问题回复使用

            /*-----------------------------评论相关url-----------------------------*/
            submit_comment: apiBaseUrl + 'comment/comment',
            add_comment_like: apiBaseUrl + 'attitude/add-comment-like',//评论点赞
            remove_comment_like: apiBaseUrl + 'attitude/remove-comment-like',//取消评论点赞
            list_comment: apiBaseUrl + 'comment/list-comment',//获取评论列表,
            delete_comment: apiBaseUrl + 'comment/delete',//删除评论
            set_comment_useful: apiBaseUrl + 'comment/set-useful',//设置评论是否有用信息

            /*-----------------------------投票相关url----------------------------*/
            submit_poll: apiBaseUrl + 'poll/poll',//投票
            /*------------------------------分析url------------------------------*/
            get_word: apiBaseUrl + 'wordcloud/get-word',//获取词云数据

            /*------------------------------通用url------------------------------*/
            fetch_attachment: apiBaseUrl + 'attachment/fetch',//根据附件ID获取上传的附件内容
            get_code: apiBaseUrl + 'code/list',//获取相应类型的数据字典
            code_list_client: apiBaseUrl + 'code/list-client',//获取客户方数据
            list_category: apiBaseUrl + 'code/list-category',//获取品类代码
            upload_attachment:apiBaseUrl+'attachment/upload'//上传附件
        })
        .constant('constants', {
            client_id: 'ed9018822d1e3727',
            access_token: "0ece00e1daacffc83222f6e64c538046",
            static_portrait:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgG' +
            'BgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcK' +
            'DcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyM' +
            'jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADIAMgD' +
            'ASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAMEBQECB//EAC8QAQACAgAGAQIDCAMA' +
            'AAAAAAABAgMRBBIhMUFRYRNxBSKhFDI0QnKBkbEjM1L/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgEDBP/EABsRAQE' +
            'BAQADAQAAAAAAAAAAAAABEQISIUEx/9oADAMBAAIRAxEAPwD6YA9TkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf4eqYr5' +
            'bapWZ+U3DcNOaee/5axPny0qUpWvLWIiE24SKVfw+dR9S+viqWOBxRHWbTK0aR5VWK37Fh9WebcBjnta0fdbG+RjMy8F' +
            'em5rPNVW8z323NK2bg6ZZmazyyqdSssZgly8Pkwzq1Z17hFE79N1gA0AAAAAAAAAAAAEmDD9XNWvjvLx067aHBcPFKc897f6T' +
            '1SLVYitYrHZ01rp6HNQAAAAf0gDk1iazzRzRPhm8Xw/0bxasRyW/SWmiz0jJhtWe8xuFSljIHZjU611cXEgDQAAAAAAAAAB6pTny' +
            'Vr7lsxERWIjtEMvhI3xFWq59fpABKgAAAAAA9etjkzqN+uo1j5+me8fPR4er25slp+Xl0iKAKAAAAAAAAACQTcJ/E1a/ljYLxTP' +
            'S0zqIlsR+7Gu09YR1CACFAAAAAABPa32HnJMxitMd4hoxrxq9tdtuOzO5/246pAAAAAAAAAACQB2mueN+4bUdo0xPt3avCZoy4Y3+9Xp' +
            '909T6ROET77jmoAAAAAAR578mG1vhIpfiGXVYpXz1lvM9lUPOx2fTjqkAAAAAAAAAAAAT8Ll5M0bmNWQHWOsd4ZfZK3P89BR4PPe1' +
            'uS9txrpC951LnZigBgAAANgjy56Ytc06mzLz5PrZptETEdkvG35uImsT0r0Vl8zGACmAAAAAAAAAAAAAAPeK/08tb+Inq2Inmr' +
            'zR2nqxOy/wXEc3/FfvHZHUIuhH2EKAAAJ7BWLkmZy2mfMvL1f/tt/VLy6RIAoAAAAAAAAAAAAA7u1pa9opWJm0jSez3wv8RT3tY' +
            'p+HzMfmvqfMJ8PB0x3rbmtNo7bhN60WOvWJ8S6465tAAAD6MfPHLnvHq0o4bM4qbm80rMyocVw80vzUrPLPXp4dJWWKoeRTKAAA' +
            'AAAAdgAis2tEREzMrWLgrWnd9VifDPRiq9VxXtMapaWnj4XFj7V3KaI12iI/sy9T43FDFwF565J1Hwu0xUxV1WI6eXsRetCO/3AY0' +
            'AAAAAANb7gCLJw2LJ0msVn4U8vA3p1xzE19NE/tKp1jLGHMTWdTGrep7jXyYKZY616+4Uc3B3x7mNWqry0Vh0UxwABJiw3y2' +
            '1ETr/081x2yXitd7n9GtixVw0itdb/AJp9ym3CRzFw9MNdV1zeZ9pQRuqAGAAAAAAAAAAAAAAAT2AFfPwtMsbiOW3' +
            'tnZMV8N5rMT9/bZRZ8Nc1JjerR2n5VOixkDtsdqWmto6x+o6JaHCYYxUm9u/hb+PRGojprR8uVuqgAwAAAAAAAAAA' +
            'AAAAAAAAAAV+J4aMvX+aBY1vv2FeQa9SAkAAAAAAAAAAAAAAAAAAAAAAPt3AB//Z',
            //表情
            EMOTION_KEYS: [100, 101, 102, 103, 104, 105, 106, 107, 108, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 144, 150, 183],
            EMOTION_LEFT_TAG: '[:',
            EMOTION_RIGHT_TAG: ']',
            EMOTION_FILE_PATH: './assets/images/emotion/',

            FINISH_YES: '1',
            FINISH_NO: '0',
            //角色
            ROLE_GUEST: 'GUEST',
            ROLE_ADMINISTRATOR: 'ADMINISTRATOR',
            ROLE_THINKER: 'THINKER',
            ROLE_PROJECTADMINISTRATOR: 'PM',
            ROLE_EXPERIENCER: 'EXPERIENCER',
            ROLE_OBSERVER: 'OBSERVER',
            ROLE_RESPONDENT: 'RESPONDENT',
            //权限
            PERMISSION_FOR_GUEST: ['login'],
            PERMISSION_FOR_ADMINISTRATOR: ['logout', 'left_navigation', 'create_project'],
            PERMISSION_FOR_THINKER: ['logout', 'left_navigation', 'create_project','project_btn'],
            PERMISSION_FOR_PROJECTADMINISTRATOR: ['logout', 'top_navigation', 'left_navigation', 'project_btn','create_project', 'project_edit_btn', 'task_edit_btn', 'task_finish_btn','data_produce','add_user','group_create'],
            PERMISSION_FOR_EXPERIENCER: ['logout', 'top_navigation', 'left_navigation', 'project_btn','create_project', 'task_edit_btn', 'task_finish_btn','data_produce','add_user','group_create'],
            PERMISSION_FOR_OBSERVER: ['logout', 'top_navigation', 'left_navigation', 'project_btn'],
            PERMISSION_FOR_RESPONDENT: ['logout','left_navigation','task_finish_btn'],
            //项目状态
            PROJECT_STATUS_OPEN: 'open',
            PROJECT_STATUS_DISABLE: 'disable',
            PROJECT_STATUS_LOCKED: 'locked',
            //任务状态
            TASK_INFO_STATUS_OPEN: 'open',
            TASK_INFO_STATUS_LOCKED: 'locked',
            //被访者（体验者、观察员）任务状态
            TASK_STATUS_OPEN: 'open',
            TASK_STATUS_DONE: 'done',
            TASK_STATUS_DISMISS: 'dismiss',
            TASK_STATUS_READ: 'read',
            TASK_STATUS_SIGNED: 'signed',
            TASK_STATUS_RESPONDED: 'responded',
            TASK_STATUS_LOCKED: 'locked',
            //主题状态
            TOPIC_INFO_STATUS_OPEN: 'open',
            TOPIC_INFO_STATUS_LOCKED: 'locked',
            //被访者主题状态
            TOPIC_STATUS_OPEN: 'open',
            TOPIC_STATUS_LOCKED: 'locked',
            TOPIC_STATUS_READ: 'read',
            TOPIC_STATUS_RESPONDED: 'responded',
            TOPIC_STATUS_DONE: 'done',
            //around_you问题状态
            QUESTION_STATUS_OPEN: 'open',
            QUESTION_STATUS_LOCKED: 'locked',
            //评论状态
            COMMENT_STATUS_OPEN: 'open',
            COMMENT_STATUS_READ: 'read',
            COMMENT_STATUS_LOCKED: 'locked',
            //模块类型
            MODULE_RAPID: 'rapid_response',
            MODULE_CONVERSATION: 'conversation',
            MODULE_AROUND_YOU: 'around_you',
            MODULE_POLL: 'poll',
            //属性控件类型
            PROPERTY_CONTROL_TEXTINPUT: 'TextInput',
            PROPERTY_CONTROL_RADIOBUTTONGROUP: 'RadioButtonGroup',
            PROPERTY_CONTROL_CHECKBOXGROUP: 'CheckboxGroup',
            PROPERTY_CONTROL_DATECHOOSER: 'DateChooser',
            PROPERTY_CONTROL_TEXTAREA: 'TextArea',
            PROPERTY_CONTROL_COMBOBOX: 'ComboBox',
            CUSTOM_PROPERTY_TREE_NODE_VALUE: 'custom',
            FIXED_PROPERTY_TREE_NODE_VALUE: 'fixed',
            PRESET_PROPERTY_TREE_NODE_VALUE: 'preset',

            PROPERTY_PACKET_FORMAT_ENUM: 'enum',
            PROPERTY_PACKET_FORMAT_VALUE_RANGE: 'valuerange',

            COMMENT_SPLIT_LEFT_TAG: '(',
            COMMENT_SPLIT_RIGHT_TAG: ')',

            PROJECT_SYSTEM_IMAGES: [],
            PROJECT_DEFAULT_IMAGE: "./assets/images/project_config/image_default_big.png"
        })

}());