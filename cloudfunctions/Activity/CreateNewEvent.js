//创建一个新的活动
const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
    // 创建数据
    await db.collection('events').add({
        data: {
            "creater": event.creater, //创建人
            "createtime": new Date(), //创建时间
            "cansee": true, //是否可见
            "eventname": event.eventname, //活动名称
            "eventtype": event.eventtype, //活动类型
            "eventintroduction": event.eventintroduction, //活动介绍
            "eventcontent": event.eventcontent, //活动内容
            "eventrequest": event.eventrequest, //活动需求
            "eventplace": event.eventplace, //活动地点
            "eventstate": event.eventstate, //活动状态
            "location": event.location, //定位
            "starttime": event.starttime, //活动开始时间
            "endtime": event.endtime, //活动结束时间
            "voluntarytime": event.voluntarytime, //志愿时长
            "limit": event.limit, //人数限制
            "autual": 0, //实际人数
            "manager": event.manager, //负责人
            "managerphone": event.managerphone, //联系方式
            "allowsignin": true, //是否允许用户自行签到
            "allowsignout": true, //是否允许用户自行签退
            "needlocate": false, //是否需要定位
            "needcheck": true, //是否审核
            "qrcode": "", //二维码
            "pic": [], //图片
            "groupid": "", //组id
            "volunteers": [] //志愿者
        }
    }).then(res => {
        console.log(event.eventname, "创建成功：", res)
        return res
    }).catch(err => {
        console.log(event.eventname, "创建失败")
        console.log(err)
        return err
    });
};
