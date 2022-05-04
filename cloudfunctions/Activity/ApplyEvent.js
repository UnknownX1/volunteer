//报名活动
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

    // 判断人数是否满人
    await db.collection('events').where({
        "_id": event._id
    }).get().then(res1 => {
        // 满人则报名失败
        console.log("res1")
        console.log(res1.data)
        if (res1.data.actual >= res1.data.limit) {
            console.log("活动满人，报名失败")
            return "活动已满人"
        }

        // 匹配个人信息
        await db.collection('volunteers').where({
            "_openid": openid
        }).get().then(res2 => {
            console.log("res2")
            console.log(res2.data)
            // 构建对象
            var volunteer = {
                "openid": openid,
                "name": res2.data.name,
                "stuid": res2.data.stuid,
                "volunteerid": res2.data.volunteerid,
                "phone": res2.data.phone,
                "type": "正常报名"
            };

            // 报名
            await db.collection('events').where({
                "_id": event._id
            }).update({
                "volunteers": _.push(volunteer)    //增加志愿者
            }).then(res3 => {
                console.log(event.eventname, "报名成功：", res3)
                return "报名成功"

            }).catch(err => {
                console.log(event.eventname, "写入数据失败")
                console.log(err)
                return err
            });

        }).catch(err => {
            console.log(event.eventname, "个人信息查询失败")
            console.log(err)
            return err
        });

    }).catch(err => {
        console.log(event.eventname, "查询活动信息失败")
        console.log(err)
        return err
    });

};
