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
                <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" />
            </van-tabbar-item> -->
            <van-tabbar-item to="/personalcenter">
                <span>个人中心</span>
                <img slot="icon" slot-scope="props" :src="props.active4 ? icon.active4 : icon.inactive4" />
            </van-tabbar-item>
        </van-tabbar>
        <div class="homecenter">
            <div class="center">
                <div class="father center1">
                    <img src="./../img/add.png" alt="" srcset="" class="fl">
                    <p class="centerp fl">
                    <span class="span1">{{addresslist.name}}</span><br>
                    <span class="span2">{{addresslist.province + addresslist.city + addresslist.area + addresslist.detailed_address}}</span>
                    </p>
                    <p class="fr centerp2">{{addresslist.mobile}}</p>
                </div>
                <div class="father center1" @click="currentState(detailed.orderno)">
                    <img src="./../img/wuliu.png" alt="" srcset="" class="fl">
                    <p class="centerp centerp1 fl">
                    <!-- <span class="span1">{{addresslist.name}}</span><br> -->
                    <span class="span2">物流派送：{{addresslist.province + addresslist.city + addresslist.area + addresslist.detailed_address}}</span>
                    </p>
                    <!-- <p class="fr centerp2">{{addresslist.mobile}}</p> -->
                </div>
            </div>
            <div class="dibu" v-for="(order,index) in orderlist" :key="index">
                <p class="ordertop father"><span class="fl orderspan">订单信息</span><span class="fr orderspan1">{{detailed.state}}</span></p>
                <div class="ordercenter father">
                    <img :src="img + order.cover" alt="" srcset="" class="fl">
                    <div class="fl ordercenteryou">
                        <p>{{order.title}}</p>
                        <span class="youspan">￥{{order.price}}</span>
                        <span class="youspan2 fr">x{{order.num}}</span>
                    </div>
                </div>
                <p class="p1 father">
                    <span class="fl">支付金额</span>
                    <span class="fr">共计：{{order.price}}元</span>
                </p>
                <p class="p1 father">
                    <span class="fl">备注：{{order.remarks}}</span>
                </p>
                <p class="p2">
                    <span>订单编号：{{detailed.orderno}}</span>
                </p>
                <p class="p2">
                    <span>下单时间：{{detailed.created_at}}</span>
                </p>
                <p class="p2">
                    <span>支付方式：微信支付</span>
                </p>
            </div>
        </div>
        <van-popup v-model="logisticsShow">
            <div class="wai">
                <div class="center">
                    <div class="centerimg">
                        <p class="centertitle">运输中</p>
                        <div class="center-center father" >
                            <img class="center-zuo fl" :src="img + titleimg" alt="" srcset="">
                            <p class="center-you fl" >
                                <span class="youspan">{{title}}</span><br>
                                <span class="youspan">{{deliver_source}}快递包裹：{{deliver_no}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="bottom">
                        <ul>
                            <li v-for="(order,index) in datalist" :key="index">
                                <div class="bottomp" v-if="order.order_state !== '3'">
                                    <a class="xian"></a>
                                    <img class="bottomimg" v-show="order.order_state == '0'" src="./../img/icon_a.png" alt="" srcset="">
                                    <img class="bottomimg" v-show="order.order_state == '1'" src="./../img/icon_b.png" alt="" srcset="">
                                    <img class="bottomimg" v-show="order.order_state == '8'" src="./../img/shou.png" alt="" srcset="">
                                    <p>
                                         <!-- :src="props.active2 ? icon.active2 : icon.inactive2" -->
                                        <span class="bottomspan" v-show="order.order_state == '0'">待支付</span>
                                        <span class="bottomspan" v-show="order.order_state == '1'">包裹已出库</span>
                                        <span class="bottomspan" v-show="order.order_state == '8'">已收货</span><br>
                                        <span class="bottomspan bottomspan1">{{order.enter_time}}</span>
                                    </p>
                                </div>
                                <div class="bottomp" v-else v-for="(info, index) in order.delivery_info[0].deliver_desc" :key="index">
                                    <a class="xian"></a>
                                    <img class="bottomimg" src="./../img/icon_c.png" alt="" srcset="">
                                    <P>
                                        <span class="bottomspan">{{ info.content }}</span><br>
                                        <span class="bottomspan bottomspan1">{{info.accept_time}}</span>
                                    </P>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { ordersdetail, currentState } from "./services/home";
import { Popup, Tabbar, TabbarItem, Dialog } from 'vant'
export default {
    components: {
        [Popup.name]: Popup,
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [Dialog.name]: Dialog,
    },
    data () {
        return {
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
            addresslist: [],
            goods: [],
            detailed: [],
            img: "http://esimwx.10010sh.cn:8999/wxunicom/esim_shop/public/",
            titleimg:'',
            title:'',
            orderlist:[],
            logisticsShow: false,
            datalist: [],
            deliver_source:'',
            deliver_no:'',
            orderno:''
        }
    },
    mounted () {
        this.ordersdetail()
    },
    methods: {
        ordersdetail () {
            let borderno = window.location.href;
            // var orderno = this.getUrlParam("orderno");
            let orderno = borderno.split('#')[1].split("?")[1].split('=')[1]
            this.orderno = orderno
            let ordernolist = {
               orderno: this.orderno
           }
            ordersdetail(ordernolist).then(resp => {
                let code = resp.data.code
                let addresslist = resp.data.orders.address
                let detailed = resp.data.orders
                let orderlist = resp.data.orders.goods
                this.titleimg = resp.data.orders.goods[0].cover
                this.title = resp.data.orders.goods[0].title
                if (code == 1) {

                }
                if (addresslist) {
                    this.addresslist = addresslist
                }
                if (orderlist) {
                    this.orderlist = orderlist
                }
                if (detailed) {
                    this.detailed = detailed
                }
            })
        },
        // 物流
        currentState(){
            // let orderno = '2019122423093190718654569707'
            currentState(this.orderno).then(resp => {
                let code = resp.code
                if (code == '200') { 
                    this.logisticsShow = true
                    let datalist = resp.data.reverse()
                    this.deliver_no = resp.data[1].delivery_info[0].deliver_no
                    this.deliver_source = resp.data[1].delivery_info[0].deliver_source
                    if (datalist && datalist.length > 0) {
                        this.datalist = datalist
                    }
                } else {
                    Dialog.alert({
                    message: '暂无物流信息'
                    }).then(() => {
                    // on close
                    });
                }
                if (code == '400') {
                    this.logisticsShow = false
                    Dialog.alert({
                    message: '该订单未同步BSS'
                    }).then(() => {
                    // on close
                    });
                } 
                // if (code == '1004') {
                //     this.logisticsShow = false
                //     Dialog.alert({
                //     message: '暂无订单信息'
                //     }).then(() => {
                //     // on close
                //     });
                // }
            })
        }
    }
}
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
    margin: 0;
}
* {
    padding: 0;
}
.home {
    width: 750px;
    min-height: 101vh;
    background-color: #efefef;
    color: #333;
    .homecenter {
        padding: 30px 30px;
        .center {
            padding: 10px 20px;
            background-color: #fff;
            border-radius: 20px;
            margin-bottom: 30px;
            .center1 {
                padding: 10px;
                border-bottom: 1px solid #efefef;
                img{
                    width: 30px;
                    height: 30px;
                    margin-top: 10px;
                }
                .centerp {
                    // width: 420px;
                    margin-left: 20px;
                    .span1 {
                        display: inline-block;
                        margin-bottom: 10px;
                        font-size: 24px;
                    }
                    .span2 {
                        font-size: 20px;
                    }
                }
                .centerp1 {
                    margin-top: 15px;
                }
                .centerp2 {
                    font-size: 24px;
                    margin-top: 20px;
                }
            }
            .center3{
                padding: 10px;
                height: 40px;
                img{
                    width: 30px;
                    margin-top: 5px;
                }
                .centerp {
                    // height: 30px;
                    line-height: 40px;
                    margin-left: 50px;
                }
            }
        }
        .dibu {margin-bottom: 30px;
            .ordertop {
                border-bottom: 1px solid #e0dede;
                height: 40px;
                line-height: 40px;
                
                .orderspan1 {
                    color: #e52424;
                }
            }
            padding: 20px;
            background-color: #fff;
            border-radius: 20px;
            .ordercenter {
                padding: 20px 30px;
                border-bottom:1px solid #e0dede;
                img{
                    width: 120px;
                    height: 120px;
                }
                .ordercenteryou {
                    margin-left: 30px;
                    height: 120px;
                    width: 420px;
                    p{
                        line-height: 40px;
                        font-size: 24px;
                        margin-bottom: 10px;
                    }
                    .youspan {
                        font-size: 24px;
                        color: #e52424;
                    }
                    .youspan1 {
                        font-size: 22px;
                        color:#333;
                        text-decoration: line-through;
                        margin-left: 30px;
                    }
                }
            }
            .p1{
                padding: 20px;
                border-bottom: 1px solid #e0dede;
            }
            .p2{
                padding: 10px 20px;
            }
        }
    }
    .van-popup {
        width: 600px;
        border-radius: 10px;
        .wai {
            height: 100%;
            .center {
                height: 700px;
                text-align: center;
                .centerimg {
                    height: 170px;
                    background: url('./../img/wuliubj.png') no-repeat;
                    background-size: 100% 100%;
                    padding: 20px 30px 0;
                    .centertitle {
                        font-size: 35px;
                        margin-bottom: 20px;
                    }
                    .center-center {
                        .center-zuo {
                            display: inline-block;
                            width: 72px;
                            height: 84px;
                            border: 2px solid #fff;
                        }
                        .center-you {
                            text-align: left;
                            // width: 450px;
                            margin-left: 15px;
                            .youspan {
                                font-size: 26px;
                                line-height: 1.7;
                            }
                        }
                    }
                }
                .bottom {
                    padding: 50px 40px 0;
                    ul {
                        text-align: left;
                        li {
                            // padding: 5px 10px;
                            width: 100%;
                            vertical-align: middle;
                            box-sizing: border-box;
                            display: block;
                            .bottomp {
                                position: relative;
                                .xian {
                                    position: absolute;
                                    left: 20px;
                                    top: 20px;
                                    display: inline-block;
                                    width: 1px;
                                    height: 100%;
                                    background-color: #d2d2d2;
                                    z-index: -1;
                                }
                                .bottomimg {
                                    width: 40px;
                                    height: 40px;
                                    display: inline-block;
                                    box-sizing: border-box;
                                    vertical-align: middle;
                                    margin-bottom: 30px;
                                    z-index: 99;
                                }
                                P {
                                    width: 450px;
                                    height: 100%;
                                    display: inline-block;
                                    box-sizing: border-box;
                                    vertical-align: middle;
                                    margin-left: 20px;
                                    margin-bottom: 30px;
                                    .bottomspan{
                                        font-size: 22px;
                                        line-height: 1.5;
                                    }
                                    .bottomspan1 {
                                        font-size: 20px;
                                    }
                                }
                            }
                        }
                    }
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