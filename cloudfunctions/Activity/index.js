// 云函数入口文件
const CreateNewEvent = require('./CreateNewActivities');
// const getMiniProgramCode = require('./getMiniProgramCode/index');
// const createCollection = require('./createCollection/index');
// const selectRecord = require('./selectRecord/index');
// const updateRecord = require('./updateRecord/index');
// const sumRecord = require('./sumRecord/index');

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.op) {
        case 'CreateNewActivities':
            return await CreateNewEvent.main(event, context);
        case 'CreateNewGroup':
          return await getMiniProgramCode.main(event, context);
        case 'UpdateSingleEvent':
          return await createCollection.main(event, context);
        case 'AdminApplyEvent':
          return await selectRecord.main(event, context);
        // case 'updateRecord':
        //   return await updateRecord.main(event, context);
        // case 'sumRecord':
        //   return await sumRecord.main(event, context);
    }




    // const wxContext = cloud.getWXContext()

    // return {
    //     event,
    //     openid: wxContext.OPENID,
    //     appid: wxContext.APPID,
    //     unionid: wxContext.UNIONID,
    // }
}