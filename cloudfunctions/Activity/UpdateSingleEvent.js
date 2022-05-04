//更新活动信息
const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
    // 创建数据
    await db.collection('events').where({
        "_id": event._id
    }).update({
        "cansee": event.cansee, //是否可见
        "eventname": event.eventname,   //活动名称
        "eventtype": event.eventtype,   //活动类型
        "eventintroduction": event.eventintroduction,   //活动介绍
        "eventcontent": event.eventcontent, //活动内容
        "eventrequest": event.eventrequest, //活动需求
        "eventplace": event.eventplace, //活动地点
        "eventstate": event.eventstate, //活动状态
        "location": event.location, //定位
        "starttime": event.starttime,   //活动开始时间
        "endtime": event.endtime,   //活动结束时间
        "voluntarytime": event.voluntarytime,   //志愿时长
        "limit": event.limit,   //人数限制
        "manager": event.manager,   //负责人
        "managerphone": event.managerphone, //联系方式
        "allowsignin": event.allowsignin,    //是否允许用户自行签到
        "allowsignout": event.allowsignout,   //是否允许用户自行签退
        "needlocate": event.needlocate,    //是否需要定位
        "needcheck": event.needcheck,  //是否审核
        "qrcode": event.qrcode,   //二维码
        "pic": event.pic,  //图片
    }).then(res => {
        console.log(event.eventname, "更新成功：", res)
        return res
    }).catch(err => {
        console.log(event.eventname, "更新失败")
        console.log(err)
        return err
    });
};
