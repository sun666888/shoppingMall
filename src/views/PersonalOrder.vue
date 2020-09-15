<template>
    <div class="home">
        <div>
            <van-tabs v-model="activeName" @click="dianji">
            <van-tab title="全部订单" name="all">
                <div class="kong" v-show="isAddress">
                    <img src="./../img/space.png" alt="" srcset="">
                    <p class="pp">暂无订单，看看<a @click="entresim">eSIM手表</a>吧~</p>
                </div>
                <div class="allorder" v-show="!isAddress" v-for="(order, index) in orders" :key="index" >
                    <div class="ordercenter"  @click="detailsorder(order.state,order.orderno)">
                        <p class="father ordercentertop"><span class="fl span1">{{order.created_at}}</span><span class="fr span2">{{order.state}}</span></p>
                        <div class="ordercenter1 father" v-for="(info, index) in order.goods_info" :key="index">
                            <img :src="img + info.cover"  alt="" srcset="" class="fl">
                            <div class="fl ordercenteryou">
                                <p class="ordercenterp">{{info.title}}</p>
                                <p class="ordercenterp"><span class="span3">￥{{info.price}}</span>
                                <!-- <span class="span4">￥{{info.ori_price}}</span> -->
                                <span class="span5 fr">x{{info.num}}</span></p>
                            </div>
                        </div>
                        <div class="orderbottom father">
                            <p class="fr">共计{{order.num}}件商品&nbsp;&nbsp;总计：{{order.price}}元</p><br>
                            <p class="fr orderbottomP">
                                <a class="a2" @click="detailsorder(order.state,order.orderno)">{{order.state1}}</a>
                                <!-- <a class="a1">查看物流</a>
                                <a class="a2">确认收货</a> -->
                            </p>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="待付款" name="waitfor">
                <div class="kong" v-show="isAddresstwo">
                    <img src="./../img/space.png" alt="" srcset="">
                    <p class="pp">暂无订单，看看<a @click="entresim">eSIM手表</a>吧~</p>
                </div>
                <div class="allorder" v-show="!isAddresstwo"  v-for="(order, index) in orderstwo" :key="index">
                     <!-- -->
                    <div class="ordercenter" @click="detailsorder(order.state,order.orderno)">
                        <p class="father ordercentertop"><span class="fl span1">{{order.created_at}}</span><span class="fr span2">{{order.state}}</span></p>
                        <div class="ordercenter1 father" v-for="(info, index) in order.goods_info" :key="index" >
                            <img :src="img + info.cover" alt="" srcset="" class="fl">
                            <div class="fl ordercenteryou">
                                <p class="ordercenterp">{{info.title}}</p>
                                <p class="ordercenterp"><span class="span3">￥{{info.price}}</span>
                                <!-- <span class="span4">￥{{info.ori_price}}</span> -->
                                <span class="span5 fr">x{{info.num}}</span></p>
                            </div>
                        </div>
                        <div class="orderbottom father">
                            <p class="fr">共计{{order.num}}件商品&nbsp;&nbsp;总计：{{order.price}}元</p><br>
                            <p class="fr orderbottomP">
                                <a class="a2" @click="detailsorder(order.state,order.orderno)">立即付款</a>
                                <!-- <a class="a1">查看物流</a>
                                <a class="a2">确认收货</a> -->
                            </p>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="待收货" name="Waitingforgoods">
                <div class="kong" v-show="isAddressthree">
                    <img src="./../img/space.png" alt="" srcset="">
                    <p class="pp">暂无订单，看看<a @click="entresim">eSIM手表</a>吧~</p>
                </div>
                <div class="allorder" v-show="!isAddressthree" v-for="(order, index) in ordersthree" :key="index">
                    <div class="ordercenter" >
                        <p class="father ordercentertop"><span class="fl span1">{{order.created_at}}</span><span class="fr span2">{{order.state}}</span></p>
                        <div class="ordercenter1 father" v-for="(info, index) in order.goods_info" :key="index" @click="detailsorder(order.state,order.orderno)">
                            <img :src="img + info.cover" alt="" srcset="" class="fl">
                            <div class="fl ordercenteryou">
                                <p class="ordercenterp">{{info.title}}</p>
                                <p class="ordercenterp"><span class="span3">￥{{info.price}}</span>
                                <!-- <span class="span4">￥{{info.ori_price}}</span> -->
                                <span class="span5 fr">x{{info.num}}</span></p>
                            </div>
                        </div>
                        <div class="orderbottom father">
                            <p class="fr">共计{{order.num}}件商品&nbsp;&nbsp;总计：{{order.price}}元</p><br>
                            <p class="fr orderbottomP">
                                <a class="a1" @click="detailsorder(order.state,order.orderno)">查看物流</a>
                                <a class="a2" @click="Eventconfirm(order.orderno)">确认收货</a>
                            </p>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="已完成" name="complete">
                <div class="kong" v-show="isAddressfour">
                    <img src="./../img/space.png" alt="" srcset="">
                    <p class="pp">暂无订单，看看<a @click="entresim">eSIM手表</a>吧~</p>
                </div>
                <div class="allorder" v-show="!isAddressfour"  v-for="(order, index) in ordersfour" :key="index">
                    <div class="ordercenter" @click="detailsorder(order.state,order.orderno)">
                        <p class="father ordercentertop"><span class="fl span1">{{order.created_at}}</span><span class="fr span2">{{order.state}}</span></p>
                        <div class="ordercenter1 father" v-for="(info, index) in order.goods_info" :key="index" >
                            <img :src="img + info.cover" alt="" srcset="" class="fl">
                            <div class="fl ordercenteryou">
                                <p class="ordercenterp">{{info.title}}</p>
                                <p class="ordercenterp"><span class="span3">￥{{info.price}}</span>
                                <!-- <span class="span4">￥{{info.ori_price}}</span> -->
                                <span class="span5 fr">x{{info.num}}</span></p>
                            </div>
                        </div>
                        <div class="orderbottom father">
                            <p class="fr">共计{{order.num}}件商品&nbsp;&nbsp;总计：{{order.price}}元</p><br>
                            <p class="fr orderbottomP">
                                <!-- <a class="a1">查看物流</a> -->
                                <a class="a2" @click="detailsorder(order.state,order.orderno)">查看订单</a>
                            </p>
                        </div>
                    </div>
                </div>
            </van-tab>
            </van-tabs>
        </div>
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
                <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" />
            </van-tabbar-item> -->
            <van-tabbar-item to="/personalcenter">
                <span>个人中心</span>
                <img slot="icon" slot-scope="props" :src="props.active4 ? icon.active4 : icon.inactive4" />
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { getorders, determine } from "./services/home";
import { Tabbar, TabbarItem, Tab, Tabs, Dialog } from "vant";
import { type } from 'os';

export default {
    name: "home",
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Dialog.name]: Dialog,
    },
    data() {
        return {
            activeName: "waitfor",
            active: 1,
            icon: {
                active1: require("./../img/coin1-1.png"),
                inactive1: require("./../img/coin1.png"),
                active2: require("./../img/coin2-1.png"),
                inactive2: require("./../img/coin2.png"),
                active: require("./../img/coin3-1.png"),
                inactive: require("./../img/coin3.png"),
                active4: require("./../img/coin4-1.png"),
                inactive4: require("./../img/coin4.png")
            },
            orders: [],
            orderstwo: [],
            ordersthree:[],
            ordersfour:[],
            img: 'http://esimwx.10010sh.cn:8999/wxunicom/test_terminal_shop/public',
            isAddress: true,
            isAddresstwo: true,
            isAddressthree: true,
            isAddressfour: true,
        };
    },
    mounted () {
        let type = this.$route.query.type
        this.activeName = type
        let type1 = {
            type : 5
        } 
        getorders(type1).then(resp => {
            let orders = resp.data.orders
            if (orders && orders.length > 0) {
                this.isAddress = false
                this.orders = orders
                console.log(this.isAddress)
            }else{
                this.isAddress = true
            } 
        })
        let type2 = {
            type : 0
        } 
        getorders(type2).then(resp => {
            let orderstwo = resp.data.orders
            if (orderstwo && orderstwo.length > 0) {
                if(orderstwo){
                    this.isAddresstwo = false
                    this.orderstwo = orderstwo
                } else{
                    this.isAddresstwo = true
                } 
            }
        })
        let type3 = {
            type : 1
        } 
        getorders(type3).then(resp => {
            let ordersthree = resp.data.orders
            if (ordersthree && ordersthree.length > 0) {
                if(ordersthree){
                    this.isAddressthree = false
                    this.ordersthree = ordersthree
                } else{
                    this.isAddressthree = true
                } 
            }
        })
        let type4 = {
            type : 4
        } 
        getorders(type4).then(resp => {
            let ordersfour = resp.data.orders
            if (ordersfour && ordersfour.length > 0) {
                if(ordersfour){
                    this.isAddressfour = false
                    this.ordersfour = ordersfour
                } else{
                    this.isAddressfour = true
                } 
            }
        })
    },
    methods: {
        dianji (name) {
            // 全部订单
            if (name == 'all') {
                let type1 = {
                    type : 5
                } 
                getorders(type1).then(resp => {
                    let orders = resp.data.orders
                    if (orders && orders.length > 0) {
                        if(orders){
                            this.isAddress = false
                            this.orders = orders
                        } else{
                            this.isAddress = true
                        } 
                    }
                })
            }
            // 待付款订单
            if (name == 'waitfor') {
                let type1 = {
                    type : 0
                } 
                getorders(type1).then(resp => {
                    let orderstwo = resp.data.orders
                    if (orderstwo && orderstwo.length > 0) {
                        if(orderstwo){
                            this.isAddresstwo = false
                            this.orderstwo = orderstwo
                        } else{
                            this.isAddresstwo = true
                        } 
                    }
                })
            }
            // 待收货订单
            if (name == 'Waitingforgoods') {
                let type1 = {
                    type : 1
                } 
                getorders(type1).then(resp => {
                    let ordersthree = resp.data.orders
                    if (ordersthree && ordersthree.length > 0) {
                        if(ordersthree){
                            this.isAddressthree = false
                            this.ordersthree = ordersthree
                        } else{
                            this.isAddressthree = true
                        } 
                    }
                })
            }
            // 已完成订单
            if (name == 'complete') {
                let type1 = {
                    type : 4
                } 
                getorders(type1).then(resp => {
                    let ordersfour = resp.data.orders
                    if (ordersfour && ordersfour.length > 0) {
                        if(ordersfour){
                            this.isAddressfour = false
                            this.ordersfour = ordersfour
                        } else{
                            this.isAddressfour = true
                        } 
                    }
                })
            }
        },
        entresim () {
            this.$router.push({
                path: "/allShang",
            })
        },
        detailsorder (state,orderno) {
            console.log(state)
            if (state == '待付款') {
                this.$router.push({
                    path: "/detailssettlement",
                    query:{
                        orderno : orderno
                    }
                })
            }
            if(state == '待收货' || state == '已完成') {
                this.$router.push({
                    path: "/detailsorder",
                    query:{
                        orderno : orderno
                    }
                })
            }
        },
        // 确认收货
        Eventconfirm (orderno) {
            Dialog.confirm({
            message: '是否确认收货？'
            }).then(() => {
                determine(orderno).then(resp => {
                    console.log(resp)
                    let code = resp.code
                    if (code == '200') {
                        this.activeName= 'complete'
                    }
                })
            }).catch(() => {
            // on cancel
            });
        }
    }
};
</script>

<style lang="scss">
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
    .kong {
        text-align: center;
        margin-top: 50%;
        img {
            width: 150px;
        }
        p{
            font-size: 26px;
            margin-top: 20px;
            a {
                display: inline-block;
                color: #4377FF;
                font-size: 28px;
                font-weight: 600;
            }
        }
    }
    .allorder {
        padding: 0 20px;
        height: 100%;
        .ordercenter {
            background-color: #fff;
            // height: 300px;
            border-radius: 20px;
            margin-top: 40px;
            padding: 0 20px 10px;
            .ordercentertop{
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #efefef;
                .span1 {
                    font-size: 20px;
                }
                .span2 {
                    color: #e52424;
                }
            }
            .ordercenter1 {
                border-bottom: 1px solid #efefef;
                padding: 20px 30px;
                img {
                    height: 120px;
                }
                .ordercenteryou {
                    margin-top: 30px;
                    margin-left: 30px;
                    width: 75%;
                    .ordercenterp {
                        margin-bottom: 20px;
                        font-size: 24px;
                        .span3 {
                            font-size: 24px;
                            color: #e52424;
                        }
                        .span4 {
                            text-decoration:line-through;
                            font-size: 18px;
                            margin-left: 20px;
                        }
                        .span5{
                            font-size: 20px;
                        }
                    }
                }
            }
            .orderbottom {
                padding: 10px 0;
                p {
                    font-size: 18px;
                }
                .orderbottomP {
                    margin-top: 10px;
                    a {
                        display: inline-block;
                        width: 98px;
                        height: 30px;
                        line-height: 30px;
                        font-size: 16px;
                        border: 2px solid #333;
                        border-radius: 20px;
                    }
                    .a1 {
                        margin-right: 20px;
                        display: inline-block;
                        width: 120px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        font-size: 24px;
                    }
                    .a2 {
                        display: inline-block;
                        width: 120px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        border: 2px solid #e52424;
                        color: #e52424;
                        font-size: 24px;
                    }
                }
            }
        }
        .ordercenter:last-child {
            margin-bottom: 40px;
        }
    }
    .van-tabs__nav {
        background: #4377FF;
    }
    .van-tab {
        color: #fff;
    }
    .van-tabs__line {
        background: #A2DAFB;
    }
    .van-tab.van-tab--active {
        span {
            color: #fff;
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