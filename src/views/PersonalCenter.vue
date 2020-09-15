<template>
    <div class="home">
        <van-tabbar v-model="active" route>
            <van-tabbar-item to="/">
                <span>首页</span>
                <img slot="icon" slot-scope="props" :src="props.active1 ? icon.active1 : icon.inactive1" />
            </van-tabbar-item>
            <van-tabbar-item to="/allShang">
                <span>全部商品</span>
                <img slot="icon" slot-scope="props" :src="props.active2 ? icon.active2 : icon.inactive2" />
            </van-tabbar-item>
            <!-- <van-tabbar-item to="/shoppingcart">
                <span>购物车</span>
                <img slot="icon" slot-scope="props" :src="props.active3 ? icon.active3 : icon.inactive3" />
            </van-tabbar-item> -->
            <van-tabbar-item to="/personalcenter">
                <span>个人中心</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" />
            </van-tabbar-item>
        </van-tabbar>
        <div class="banner">
            <img :src="data.headimgurl" alt="" srcset="">
            <!-- <img src="./../img/hptouxiang.png" alt="" srcset=""> -->
            <p class="title">{{data.nickname}}</p>
            <!-- <p class="title">xxxxx</p> -->
        </div>
        <div class="order">
            <div class="ordercenter">
                <!-- <p class="tltle1"> -->
                    <!-- <span class="fl span1">我的订单</span> -->
                    <!-- <span class="fr span2" @click="AllOrders">全部订单 ></span> -->
                <!-- </p> -->
                <van-row type="flex" justify="space-between">
                    <van-col @click.native="PendingPayment">
                        <span>
                            <img src="./../img/obligation.png" alt="" srcset="">
                            <p>待付款</p>
                        </span>
                    </van-col>
                    <van-col @click.native="ReceivingGoods">
                        <span>
                            <img src="./../img/Sendout.png" alt="" srcset="">
                            <p>待收货</p>
                        </span>
                    </van-col>
                    <van-col @click.native="Completed">
                        <span>
                            <img src="./../img/finish.png" alt="" srcset="">
                            <p>已完成</p>
                        </span>
                        
                    </van-col>
                    <!-- <van-col @click="AllOrders">
                        <span>
                            <img src="./../img/icon-8.png" alt="" srcset="">
                            <p>全部订单</p>
                        </span>
                    </van-col> -->
                    <van-col >
                        <a href="https://m.10010.com/mfront/views/my-order/main.html#/orderlist?oneKey=t">
                            <img src="./../img/search.png" alt="" srcset="">
                            <p>订单查询</p>
                        </a>
                    </van-col>
                </van-row>
                <!-- <ul class="father">
                    <li @click="PendingPayment">
                        <img src="./../img/icon-1.png" alt="" srcset="">
                        <p>待付款</p>
                    </li>
                    <li @click="ReceivingGoods">
                        <img src="./../img/icon-2.png" alt="" srcset="">
                        <p>待收货</p>
                    </li>
                    <li @click="Completed">
                        <img src="./../img/icon-3.png" alt="" srcset="">
                        <p>已完成</p>
                    </li>
                    <li @click="AllOrders">
                        <img src="./../img/icon-8.png" alt="" srcset="">
                        <p>全部订单</p>
                    </li>
                    <li>
                        <img src="./../img/icon-9.png" alt="" srcset="">
                        <p>订单查询</p>
                    </li>
                </ul> -->
            </div>
            <div class="ordercentertwo">
                <p class="ptwo father" @click="AllOrders">
                    <img src="./../img/MyCente-icon-1.png" alt="" srcset="">
                    <span>全部订单</span>
                    <img class="jiantou" src="./../img/jiantou.png" alt="">
                </p>
                <p class="ptwo father" @click="address">
                    <img src="./../img/MyCente-icon-2.png" alt="" srcset="">
                    <span>收货地址</span>
                    <img class="jiantou" src="./../img/jiantou.png" alt="">
                </p>
                <a href="tel:400-021-0356" class="twoa">
                    <p class="ptwo father">
                        <img src="./../img/MyCente-icon-4.png" alt="" srcset="">
                        <span>客服热线</span>
                        <img class="jiantou" src="./../img/jiantou.png" alt="">
                    </p>
                </a>
                
                <!-- <p class="ptwo father"><img src="./../img/icon-6.png" alt="" srcset=""><span>系统设置</span></p> -->
            </div>
        </div>
    </div>
</template>

<script>
import { userinfo } from "./services/home";
import { Tabbar, TabbarItem, Toast, Col, Row } from "vant";

export default {
    name: "home",
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [Toast.name]: Toast,
        [Col.name]: Col,
        [Row.name]: Row,
    },
    data() {
        return {
            active: 1,
            icon: {
                active1: require("./../img/coin1-1.png"),
                inactive1: require("./../img/coin1.png"),
                active2: require("./../img/coin2-1.png"),
                inactive2: require("./../img/coin2.png"),
                active3: require("./../img/coin3-1.png"),
                inactive3: require("./../img/coin3.png"),
                active: require("./../img/coin4-1.png"),
                inactive: require("./../img/coin4.png")
            },
            data: []
        };
    },
    mounted () {
        this.userinfo()
    },
    methods: {
        userinfo() {
            userinfo().then(resp => {
                let data = resp.data.userInfo
                this.data = data
                console.log(resp)
            })
        },
        // 全部订单
        AllOrders () {
            this.$router.push({
                path: "/personalorder", 
                query: { type: 'all' }
            })
        },
        // 待付款
        PendingPayment () {
            console.log("giao进来了")
            this.$router.push({
                path: "/personalorder", 
                query: { type: 'waitfor' }
            })
        },
        // 待收货
        ReceivingGoods () {
            this.$router.push({
                path: "/personalorder", 
                query: { type: 'Waitingforgoods' }
            })
        },
        // 已完成
        Completed () {
            this.$router.push({
                path: "/personalorder", 
                query: { type: 'complete' }
            })
        },
        // 售后
        shouHou(){
            Toast.fail('暂未开放~');
        },
        address () {
            this.$router.push({
                path: "/addressmanagement", 
                query: { type: 'personal' }
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.father:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
}
.father {
    zoom: 1;
}
.fr {
    float: right;
}
.fl {
    float: left;
}
p {
    margin: 0 auto;
}
.home {
    width: 750px;
    min-height: 101vh;
    background-color: #ebeef5;
    color: #333;
    padding-bottom: 95px;
    text-align: center;
    padding: 0;
    .banner {
        width: 750px;
        height: 300px;
        background: url("./../img/MyCenter-bg.png") no-repeat;
        background-size: 100%;
        text-align: center;
        margin-bottom: 20px;
        img {
            width: 125px;
            // border:2px solid #fff;
            box-shadow: 0 0 20px rgba($color: #fff, $alpha: .5);
            border-radius: 50%;
            margin-top: 45px;
        }
        .title{
            font-size: 30px;
            margin-top: 10px;
            color: #fff;
        }
    }
    // 订单
    .order{
        margin-top: -60px;
        width: 100%;
        .ordercenter {
            width: 80%;
            margin: 20px auto;
            padding: 10px 40px;
            height: 160px;
            background-color: #fff;
            border-radius: 20px;
            margin-bottom: 40px;
            .tltle1 {
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #efefef;
                .span1 {
                    font-size: 24px;
                }
                .span2 {
                    font-size: 18px;
                }
            }
            .van-row {
                .van-col {
                    margin-top: 20px;
                    span {
                        display: inline-block;
                        img {
                            width: 100px;
                            // height: 100px;
                        }
                    }
                    a{
                        display: inline-block;
                        color: #333;
                        p {
                            color: #333;
                        }
                        img {
                            width: 100px;
                            // height: 41px;
                        }
                    }
                }
            }
            // ul {
            //     li {
            //         float: left;
            //         // margin-left: 35px;
            //         // margin-right: 25px;
            //         margin-left: 30px;
            //         margin-right: 30px;
            //         margin-top: 20px;
            //         img {
            //             width: 47px;
            //             height: 41px;
            //         }
            //     }
            //     // li:nth-child(5n){
            //     //     margin-right: 0;
            //     //     margin-left: 25px;

            //     // }
            // }
        }
        .ordercentertwo {
            width: 100%;
            // height: 280px;
            // background-color: #fff;
            // border-radius: 20px;
            // padding: 20px;
            .ptwo {
                height: 72px;
                line-height: 37px;
                background: #fff;
                margin: 20px 0;
                // border-bottom: 1px solid #efefef;
                img {
                    // height: 32px;
                    width: 34px;
                    float: left;
                    margin-top: 18px;
                    margin-left: 30px;
                }
                span { 
                    display: inline-block;
                    font-size: 24px;
                    float: left;
                    margin-left: 10px;
                    margin-top: 18px;
                    color: #333;
                }
                .jiantou {
                    float: right;
                    margin: 0;
                    width: 15px;
                    height: 30px;
                    margin: 21px 40px 0 0;
                }
            }
            .twoa {
                display: inline-block;
                width: 100%;
                .ptwo {
                    margin: 0;
                }
            }
        }
    }
    .van-hairline--top-bottom.van-tabbar.van-tabbar--fixed {
    background-color: #343740;
    .van-tabbar-item {
      color: #fff;
    }
    .van-tabbar-item.van-tabbar-item--active {
            color: #5b78e8;
        }
  }
}
</style>