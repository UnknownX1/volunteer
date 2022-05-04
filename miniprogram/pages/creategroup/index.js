// page/creategroup/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        groupid: "",
        events: [],
        eventsingroups: [],
        global: { //全局数据
            eventname: "",
            eventtype: "",
        }
        
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    //提交上传
    commitchange() {
        //上传组数据
        wx.cloud.callFunction({
            name: 'Activity',
            data: {
                op: "CreateNewGroup",
                a: 12,
                b: 19
            }
        }).then(res => {
            console.log(res.data)
            //返回组ID
            if (res.data != "") {
                //设置组id
                this.data.groupid = res.data
                //循环添加活动
                for (i=0;i<10;i++) {
                    //上传活动数据
                    wx.cloud.callFunction({
                        name: 'Activity',
                        data: {
                            op: "CreateNewEvent",
                            groupid: this.data.groupid,




                        }
                    }).then(res => {
                        console.log(res.data)
                        //返回活动ID
                        if (res.data != "") {

                            event0 = {
                                "id": res.data,
                                "eventplace": event.eventplace, //活动地点
                                "starttime": event.starttime, //活动开始时间
                                "endtime": event.endtime, //活动结束时间
                                "voluntarytime": event.voluntarytime, //志愿时长
                            }
                            this.data.eventsingroups.push(event0)
                        }


                    })
                }

            } else {
                console("活动创建失败")
            }


        })
    }

})
