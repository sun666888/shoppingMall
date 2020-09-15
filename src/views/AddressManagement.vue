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
        <div class="center">
            <div class="center-center" v-show="!isAddress" v-for="(order, index) in orders" :key="index">
                <div @click="ChoiceAddress(order.id)">
                    <div class="address1 father">
                        <img src="./../img/add.png" alt="" srcset="" class="fl">
                        <p class="address1P">
                            <span>{{order.name}}</span> <span>{{order.mobile}}</span><br>
                            <span>{{order.province + order.city + order.area + order.detailed_address}}</span>
                        </p>
                    </div>
                    <div class="address2 father">
                        <p class="add2p">
                            <img :src="order.is_default == 1 ? pitchup : pitchup1 " @click="tab(index,order.id)" alt="" srcset="" class="fl" >
                            <span class="fl moren">设置默认地址</span>
                            <span class="bianji" @click="editAddress(order.id)">编辑</span>
                            <span class="gang">|</span>
                            <span class="bianji del" @click="deleteAddress(order.id)">删除</span>
                        </p>
                        
                    </div>
                </div>
            </div>
            <div class="center-map" v-show="isAddress">
                <img class="map" src="./../img/map.png" alt="">
                <p>暂时还没有任何地址</p>
            </div>
            <div class="center-bottom" @click="detailsaddress">
                添加收货地址
            </div>
        </div>
    </div>
</template>
<script>
import { adduseraddressrlist, isdefault, deladdress } from "./services/home";
import { Tabbar, TabbarItem, Dialog} from 'vant'
export default {
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [Dialog.name]: Dialog,
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
            isAddress: true,
            orders: [],
            pitchup: require('./../img/pitchup.png'),
            pitchup1: require('./../img/pitchup1.png'),
            orderno:'',
            type: ''
        }
    },
    mounted() {
        let orderno = this.$route.query.orderno
        this.orderno = orderno
        this.adduseraddressrlist()
        let type = this.$route.query.type
        type ? this.type = type : ''
    },
    methods: {
        adduseraddressrlist () {
            adduseraddressrlist().then(resp =>{
                let orders= resp.data.address_list
                if (orders && orders.length > 0) {
                    if (orders) {
                        this.isAddress = false
                        this.orders = orders
                    }
                }
            })
        },
        tab(ind,id) {
            isdefault(id).then (resp => {
                this.orders.find((ele,index) => {
                    if (index == ind) {
                        ele.is_default = 1
                    } else {
                        ele.is_default = 0
                    }
                })
            })
        },
        // 编辑
        editAddress (id) {
            console.log(id)
            this.$router.push({
                path: "/detailsaddress", 
                query: { 
                    id: id,
                    orderno: this.orderno
                }
            })
        },
        // 删除地址
        deleteAddress (id) {
            console.log(id)
            Dialog.confirm({
            message: '是否删除地址'
            }).then(() => {
                deladdress (id).then(resp => {
                    console.log(resp)
                    let data = resp.data.success
                    if (data == "success") {
                        Toast.success('删除成功');
                        this.adduseraddressrlist()
                    }
                })
            }).catch(() => {

            });
        },
        detailsaddress (){
            this.$router.push({
                path: "/detailsaddress",
                query: {
                    orderno: this.orderno
                } 
            })
        },
        // 选择地址
        ChoiceAddress (id) {
            console.log(id)
            if (window.event.currentTarget === window.event.target) {
                if (this.type == 'personal') {
                    console.log('111')
                } else {
                    this.$router.push({
                        path: "/detailssettlement",
                        query: {
                            aid: id,
                            orderno: this.orderno
                        } 
                    })
                }
            }
            
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
    margin: 0 auto;
    padding: 0;
}
.home {
    width: 750px;
    min-height: 101vh;
    background-color: #efefef;
    color: #333;
    padding: 0;
    text-align: center;
    .center {
        padding: 40px 30px 0;
        .center-center {
            padding: 30px 30px;
            background-color: #fff;
            border-radius: 20px;
            margin-bottom: 30px;
            .address1 {
                text-align: left;
                border-bottom: 1px solid #e0dede;
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
                        font-size: 26px;
                    }
                }
            }
            .address2{
                // height: 100px;
                .add2p{
                    margin-top: 20px;
                    font-size: 24px;
                    text-align: right;
                    img {
                        width: 25px;
                        height: 25px;
                        z-index: 99;
                    }
                    .moren {
                        margin-left: 10px;
                    }
                    .bianji {
                        display: inline-block;
                        width: 100px;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        color: #e52424;
                    }
                    .del{
                        color: #333;
                    }
                    .gang {
                        // height: 50px;
                        // margin-left: 20px;
                        // margin-right: 20px;
                    }
                }
                
            }
        }
        .center-map {
            width: 100%;
            margin: 30% auto 50% auto;
            .map {
                display: block;
                width: 60%;
            }
            p {
                font-size: 26px;
                letter-spacing: 2px;
                color: #666;
            }
        }
        
        .center-bottom {
            width: 80%;
            height: 80px;
            margin: 50px auto 20px auto;
            border-radius: 40px;
            background: #527FFD;
            box-shadow: 0 0 10px #527FFD;
            color: #fff;
            text-align: center;
            line-height: 80px;
            font-size: 26px;
            letter-spacing: 2px;
            // border: 2px solid #b6b5b5;
            // .p1 {
            //     margin-top: 12px;
            //     font-size: 100px;
            //     line-height: 60px;
            //     color: #999;
            // }
            // .p2{
            //     font-size: 22px;
            //     color: #999;
            //     margin-top: 5px;
            // }
        }
    }
    .van-hairline--top-bottom.van-tabbar.van-tabbar--fixed {
            background-color: #343740;
        .van-tabbar-item {
            color:#fff; 
        }
        .van-tabbar-item.van-tabbar-item--active {
            color: #5b78e8;
        }
    }
}
</style>