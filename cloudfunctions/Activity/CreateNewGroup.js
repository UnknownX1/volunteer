//创建一个组
const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
    // 创建数据
    await db.collection('groups').add({
        "creater": event.creater,   //创建人
        "createtime": new Date(),   //创建时间
        "cansee": event.cansee, //是否可见
        "eventname": event.eventname,   //活动名称
        "eventtype": event.eventtype,   //活动类型
        "eventintroduction": event.eventintroduction,   //活动简介
        "eventcontent": event.eventcontent, //活动内容
        "eventrequest": event.eventrequest, //活动需求
        "eventplace": event.eventplace, //活动地点
        "eventstate": event.eventstate, //活动状态
        "location": event.location, //定位
        "starttime": event.starttime,   //总开始时间
        "endtime": event.endtime,   //总结束时间
        "voluntarytime": event.voluntarytime,   //志愿时长
        "limit": event.limit,   //人数限制
        "autual": 0,    //实际人数
        "manager": event.manager,   //负责人
        "managerphone": event.managerphone, //联系方式
        "allowsignin": true,    //是否允许用户自行签到
        "allowsignout": true,   //是否允许用户自行签退
        "needlocate": false,    //是否需要定位
        "needcheck": true,  //是否审核
        "singleevent": true,    //是否为单个活动
        "qrcode": "",   //二维码
        "pic": [],  //图片
        "eventid": [],  //组信息
    }).then(res => {
        console.log(event.eventname, "创建成功：", res)
        return res
    }).catch(err => {
        console.log(event.eventname, "创建失败")
        console.log(err)
        return err
    });
};
