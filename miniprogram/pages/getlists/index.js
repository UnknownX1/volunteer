// page/getlists/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page:0,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        this.data.page+=1
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    GetGroups(){
        db=wx.cloud.database()

        //查询模型
        searchmodel={
            
        }
        db.collection("groups").where(searchmodel).field({
            "_id":true,
            "eventname": true,   //活动名称
            "eventtype": event.eventtype,   //活动类型
            "eventintroduction": event.eventintroduction,   //活动简介
            "starttime": event.starttime,   //总开始时间
            "endtime": event.endtime,   //总结束时间
        }).skip(20*this.data.page).limit(20).get().then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log("err:")
            console.log(err)
        })
    }
})