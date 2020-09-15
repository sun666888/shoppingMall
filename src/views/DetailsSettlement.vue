<template>
    <div class="home">
        <van-tabbar v-model="active" route>
            <van-tabbar-item to="/">
                <span>首页</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.active : icon.inactive"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/allShang">
                <span>全部商品</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active2 ? icon.active2 : icon.inactive2"
                >
            </van-tabbar-item>
            <!-- <van-tabbar-item to="/shoppingcart">
                <span>购物车</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active3 ? icon.active3 : icon.inactive3"
                >
            </van-tabbar-item> -->
            <van-tabbar-item to="/personalcenter">
                <span>个人中心</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active4 ? icon.active4 : icon.inactive4"
                >
            </van-tabbar-item>
        </van-tabbar>
        <div class="hmoediv">
            <div class="address">
                <div class="address1" v-show="isAddress" @click="Eventaddreskong(ordersdetails.orderno)">
                    <p class="father">
                        <span class="fl">新建收货地址，确保商品顺利达到！</span><span class="fr">></span>
                    </p>
                </div>
                <div class="address1" v-show="!isAddress" @click="Eventaddres(ordersdetails.orderno)">
                    <img src="./../img/add.png" alt="" srcset="" class="fl">
                    <p class="address1P">
                        <span>{{addresslist.name}}</span> <span>{{addresslist.mobile}}</span><br>
                        <span>{{addresslist.province + addresslist.city + addresslist.area + addresslist.detailed_address}}</span>
                    </p>
                </div>
            </div>
            <div class="weChat father">
                <img src="./../img/weixin.png" alt="" srcset="" class="fl">
                <p class="weChatp fl">
                    <span class="wechatspan">微信支付</span><br>
                    <span>推荐已在微信中绑定银行卡的用户使用</span>
                </p>
                <img src="./../img/pitchup.png" alt="" srcset="" class="fr weChatimg">
            </div>
            <div class="order father">
                <p class="ordertop"><span class="fl orderspan">订单信息</span><span class="fr orderspan1">待支付</span></p>
                <div class="ordercenter father" v-for="(order, index) in orderslist" :key="index">
                    <img :src="img + order.cover" alt="" srcset="" class="fl">
                    <div class="fl ordercenteryou">
                        <p>{{order.title}}</p>
                        <span class="youspan">￥{{order.price}}</span>
                        <!-- <span class="youspan1">￥{{order.ori_price}}</span> -->
                        <span class="youspan2 fr">x{{order.num}}</span>
                    </div>
                </div>
                <p class="ordercentertwo father">
                    <span class="fl two1">支付金额</span>
                    <span class="fl two2">共计{{ordersdetails.num}}件商品</span>
                    <span class="fr two3">总价：{{ordersdetails.amount}}元</span>
                </p>
                <p class="ordercentertwo father">
                    <span class="fl">优惠金额</span>
                    <span class="fr three2">优惠：{{ordersdetails.discount}}元</span>
                </p>
                <p class="ordercenterthree father">
                    <span class="fl three1">备注：</span>
                    <textarea class="input" v-model="remarks" name="comment_content" id="comment_content" placeholder="备注"></textarea>
                </p>
            </div>
            <form :action="payUrl">
                <input type="hidden" name="data" :value="datavalue">
                <input type="hidden" name="serviceId" :value="serviceId">
                <div class="bottom father">
                    <p class="bottomp1 fl">
                        <span>实付金额：<a>￥{{ordersdetails.amount}}</a></span><br>
                        <span class="bottomspan">优惠金额：<a>￥{{ordersdetails.discount}}</a></span>
                    </p>
                    <button class="bottomp fr" type="submit"  @click="Eventpurchase" v-show="noAd">立即购买</button>
                    <span class="bottomptwo fr" @click="Eventpurchase" v-show="!noAd">立即购买</span>
                </div>
            </form>
            <van-popup v-model="showpopup" class="vanpopup">
                <p>请先添加收货地址</p>
                <p class="btn" @click="Eventadd(ordersdetails.orderno)">添加地址</p>
            </van-popup>
        </div>
    </div>
</template>

<script>
import { Popup, Button, Dialog, Tabbar, TabbarItem } from 'vant'
import { orders, addorders } from "./services/home";

export default {
    components: {
        [Popup.name]: Popup,
        [Button.name]: Button,
        [Dialog.name]: Dialog,
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
    },
    data () {
        return {
            active: 0,
            icon: {
                active: require('./../img/coin1-1.png'),
                inactive:require('./../img/coin1.png'),
                active2: require('./../img/coin2-1.png'),
                inactive2:require('./../img/coin2.png'),
                active3: require('./../img/coin3-1.png'),
                inactive3:require('./../img/coin3.png'),
                active4: require('./../img/coin4-1.png'),
                inactive4: require('./../img/coin4.png')
            },
            ordersdetails: {},
            addresslist: {},
            goodsCoupon: [],
            img: 'http://esimwx.10010sh.cn:8999/wxunicom/test_terminal_shop/public/',
            showpopup: false,
            isAddress: true,
            payUrl:'',
            datavalue: '',
            serviceId:'',
            addressid : '',
            orderno: '',
            noAd: false,
            orderslist:[],
            gid:'',
            aid:'',
            price:'',
            goodsId:'',
            size:'',
            color:'',
            remarks:''
        }
    },
    mounted () {
        let price = this.$route.query.price
        let goodsId = this.$route.query.goodsId
        let size = this.$route.query.size
        let color = this.$route.query.color
        let id = this.$route.query.id
        let aid = this.$route.query.aid
        let orderno = this.$route.query.orderno
        this.price = price
        this.goodsId = goodsId
        this.size = size
        this.color = color
        this.gid = id
        this.aid = aid
        this.orderno = orderno
        this.orders()
    },
    methods: {
        hasAddress () {
           let add =  window.localStorage.getItem('address')
           console.log(add)
           if (add !== 'null') {
               this.noAd = true
           } else {
               this.noAd = false
           }
        },
        orders () {
            console.log(this.gid)
            // const price = window.sessionStorage.getItem('price')
            // const goodsId = window.sessionStorage.getItem('goodsId')
            // const size = window.sessionStorage.getItem('size')
            // const color = window.sessionStorage.getItem('color')
            // const token = window.sessionStorage.getItem('token')
            // alert(token)
            const orderParam = {
                amount: this.price,
                goodsid: this.goodsId,
                goods_size: this.size,
                goods_colour: this.color,
                cart_id : this.gid,
                aid : this.aid,
                orderno : this.orderno
                // token: token
            };
            orders(orderParam).then( resp => {
                let code = resp.code
                this.orderslist = resp.data.goodsInfo
                if (code == 6001) {
                    Dialog.alert({
                    message: '该商品库存已售完！'
                    }).then(() => {
                        this.$router.push({
                            path: "/", 
                        })
                    });
                } else {
                    let ordersdetails = resp.data
                    let addresslist = resp.data.address.address
                    let goodsCoupon = resp.data.goodsCoupon
                    this.payUrl = resp.data.payUrl
                    this.datavalue = resp.data.data
                    this.serviceId = resp.data.serviceId
                    let orderslist = this.orderslist
                    if (orderslist && orderslist.length > 0) {
                        this.orderslist = orderslist
                    }
                    // this.addressid = resp.data.address.address.id
                    if (resp.data.address.address && resp.data.address.address.id) {
                        this.addressid = resp.data.address.address.id
                    }
                    this.orderno = resp.data.orderno
                    window.localStorage.setItem('address', resp.data.address.address)
                    this.hasAddress()
                    if (ordersdetails) {
                        this.ordersdetails = ordersdetails
                    }
                    if (goodsCoupon) {
                        this.goodsCoupon = goodsCoupon
                    }
                    if (addresslist) {
                        this.isAddress = false
                        this.addresslist = addresslist
                    } else {
                        this.isAddress = true
                    }
                }
            })
        },
        Eventaddreskong (orderno) {
            this.$router.push({
                path: "/addressmanagement",
                query: { 
                    orderno: orderno,
                }
            })
        },
        Eventaddres (orderno) {
            this.$router.push({
                path: "/addressmanagement", 
                query: { 
                    orderno: orderno,
                }
            })
        },
        Eventpurchase () {
            const address = window.localStorage.getItem('address')
            // const token = window.sessionStorage.getItem('token')
            if (address == "null") {
                this.showpopup = true
            } else {
                addorders(this.addressid,this.orderno,this.remarks).then( resp => {
                    console.log(resp)
                })
            }
            
        },
        Eventadd (orderno) {
            this.$router.push({
                path: "/detailsaddress", 
                query: {
                    orderno: orderno,
                }
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
.home {
    width: 750px;
    min-height: 101vh;
    background-color: #efefef;
    color: #333;
    padding: 0;
    .hmoediv {
        padding: 30px;
        .address{
            margin-bottom: 30px;
            .address1 {
                padding: 20px 30px;
                background-color: #fff;
                border-radius: 20px;
                // margin-bottom: 30px;
                img {
                    width: 30px;
                    height: 40px;
                    margin-top: 10px;
                }
                .address1P {
                    margin-left: 40px;
                    span {
                        display: inline-block;
                        margin-bottom: 5px;
                        margin-left: 10px;
                        font-size: 24px;
                    }
                }
            }
        }
        .weChat{
            padding: 20px 30px;
            background-color: #fff;
            border-radius: 20px;
            margin-bottom: 30px;
            img {
                width: 38px;
                height: 34px;
                margin-top: 5px;
            }
            .weChatp {
                margin-left: 30px;
                .wechatspan {
                    display: inline-block;
                    margin-bottom: 10px;
                }
            }
            .weChatimg{
                width: 20px;
                height: 20px;
                margin-top: 15px;
            }
        }
        .order{
            padding:20px;
            background-color:#fff;
            border-radius: 20px;
            .ordertop {
                height: 30px;
                border-bottom:1px solid #e0dede;
                .orderspan {
                    font-size: 20px;
                }
                .orderspan1{
                    font-size: 20px;
                    color: #e52424;
                }
            }
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
                    .youspan2 {
                        font-size: 24px;
                    }
                }
            }
            .ordercentertwo {
                padding: 10px 0;
                border-bottom:1px solid #e0dede;
                span {
                    font-size: 24px;
                }
                .two2 {
                    margin-left: 30px;
                }
            }
            .ordercenterthree {
                padding: 10px 0;
                span {
                    font-size: 20px;
                }
                .input {
                    width: 500px;
                    height: 100px;
                    border-radius: 10px;
                    padding: 10px;
                }
            }
        }
        .bottom {
            width: 630px;
            // height: 98px;
            background-color: #fff;
            position: fixed;
            bottom: 100px;
            padding: 20px 60px;
            text-align: center;
            border-top: 2px solid #e5e5e5;
            margin-left: -30px;
            .bottomp1 {
                line-height: 35px;
                margin-right: 20px;
                span {
                    font-size: 24px;
                a{
                        color: #e52424;
                    } 
                }
                .bottomspan {
                    font-size: 20px;
                }
            }
            .bottomp {
                width: 225px;
                height: 65px;
                line-height: 65px;
                background-color: #e52424;
                color: #fff;
                border-radius: 40px;
                font-size: 32px;
                border: none;
            }
            .bottomptwo {
                width: 225px;
                height: 65px;
                line-height: 65px;
                background-color: #6824e5;
                color: #fff;
                border-radius: 40px;
                font-size: 32px;
                border: none;
            }
        }
        // 弹框
        .vanpopup {
            width: 50%;
            text-align: center;
            border-radius: 20px;
            
            p{
                font-size: 30px;
                margin-top: 40px;
                margin-bottom: 30px;
            }
            .btn {margin: 0 auto;
                width: 150px;
                height: 50px;
                line-height: 50px;
                color: #fff;
                font-size: 24px;
                border-radius: 10px;
                background-color: #e52424;
                margin-bottom: 30px;
            }
        }
    }
    .van-hairline--top-bottom.van-tabbar.van-tabbar--fixed {
            background-color: #343740;
        .van-tabbar-item {
            color:#fff; 
        }
        .van-tabbar-item.van-tabbar-item--active {
            color: #e52424;
        }
    }
}
</style>