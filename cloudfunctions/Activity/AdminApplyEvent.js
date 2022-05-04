//某活动中新增人
const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const _ = db.command

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
    // 获取openid
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID;

    // 管理员鉴权？


    // 匹配个人信息
    await db.collection('volunteers').where({
        "stuid": event.stuid
    }).get().then(res1 => {
        console.log("res1")
        console.log(res1)

        // 构建对象
        var volunteer = {
            "name": res1.data.name,
            "stuid": res1.data.stuid,
            "volunteerid": res1.data.volunteerid,
            "phone": res1.data.phone,
            "type": "后台录入"
        };

        // 报名
        await db.collection('events').where({
            "_id": event._id
        }).update({
            "volunteers": _.push(volunteer)    //增加志愿者
        }).then(res2 => {
            console.log(event.eventname, "报名成功：", res2)
            return "报名成功"

        }).catch(err => {
            console.log(event.eventname, "报名失败3")
            console.log(err)
            return err
        });

    }).catch(err => {
        console.log(event.eventname, "报名失败2")
        console.log(err)
        return err
    });
};
