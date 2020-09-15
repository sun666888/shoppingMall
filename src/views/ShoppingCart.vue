<template>
    <div class="home">
        <div class="kong" v-show="isAddress">
            <img src="./../img/cart-2.png" alt="" srcset="">
            <p class="pp">购物车空空如也，快来挑选好货呗~</p>
            <p class="pp1" @click="entresim">看看eSIM手表</p>
        </div>
         <div id="app" v-show="!isAddress">
            <!-- <p>共{{shoppingList.length}}件宝贝</p> -->
            <div class="shoppingMain" v-for="(item,index) in shoppingList" :key="index">
                <div class="shoppingItem"><!--列表项-->
                    <img src="./../img/pitchup1.png" alt="" srcset="" class="selectCircle" :class="{checked:item.isSelect}"  @click="selectGoods(item)">
                    <!-- <div class="selectCircle" :class="{checked:item.isSelect}" @click="selectGoods(item)"></div> -->
                    <div class="shoppingImg">
                        <img :src="img + item.cover" alt="">
                    </div>
                    <div class="itemRight">
                        <p class="title">{{item.title}}</p>
                        <p class="jieshao"><span>{{item.colour}}</span><span  class="jieshaospan">{{item.size}}</span><span  class="jieshaospan">{{item.setmeal}}</span></p>
                        <div class="numAndMoney">
                            <p class="fl numAndMoneyp">￥{{item.price}}</p>
                            <div class="numberControl fr">
                                <a class="btn" @click="numDel(item,index)">-</a>
                                <input type="text" v-model="item.num" readonly="readonly">
                                <a class="btn" @click="numAdd(item,index)">+</a>
                            </div>
                        </div>
                    </div>
                    <div class="delete" @click="delGoods(item.id,item)">
                        <img src="./../img/delete.png" alt="" srcset="">
                    </div>
                </div>
                <div class="bottomMain">
                <div class="bottomMaincenter">
                    <img src="./../img/pitchup1.png" alt="" srcset="" class="selectCircle selectCircle1" :class="{checked:allSelect}" @click="allGoodsSelect">
                    <span>全选</span>
                    <p class="bottombtn2"><span>实付金额：</span><span class="bottombtnspan">￥{{sum}}</span></p>
                    <button class="bottombtn1" @click="buyGoods(item,index)">&nbsp;结算</button>  
                </div>
            </div>
            </div>
        </div>
         <!-- 猜你喜欢 -->
            <div class="like">
                <div class="likecenter">
                    <p><img src="./../img/cainiyihuan.png" alt="" srcset="" class="img2"></p>
                    <div class="details">
                        <ul class="father">
                            <li  v-for="(order,index) in orders" :key="index">
                                <img :src="img+order.cover" alt="" srcset="" class="img1" @click="ShoppingCart(order.id)">
                                <div class="licenter">
                                    <p class="seckilltitle">{{order.title}}</p>
                                    <p class="seckillcenter father">
                                        <span class="jiage fl">￥{{order.price}}</span>
                                        <img class="fr img" src="./../img/cart.png" alt="" srcset="" @click="ShoppingCart(order.id)">
                                        <!-- <img class="fr " src="./../img/cart.png" alt="" srcset=""> -->
                                    </p>
                                </div>  
                            </li>
                        </ul>
                    </div>
                </div>
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
import { shoppingcartlist, delshoppingcart, cartgoodsnumplus, cartgoodsnumreduce, guessgoods } from "./services/home";
import { Tabbar, TabbarItem, Toast, Dialog  } from "vant";

export default {
    name: "home",
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [Toast.name]: Toast,
        [Dialog.name]: Dialog,
    },
    data() {
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
        shoppingList:[],
        img: 'http://esimwx.10010sh.cn:8999/wxunicom/test_terminal_shop/public',
        allSelect:false,
        sum:0,
        isAddress: true,
        orders: [],
        addlist :[]
        };
    },
    mounted () {
        this.shoppingcartlist()
        this.guessgoods()
    },
    methods: {
        shoppingcartlist (){
            shoppingcartlist().then(resp => {
                // console.log(resp)
                let shoppingList = resp.data.user_goods
                for (let i =0; i<shoppingList.length; i++) {
                    shoppingList[i].flag = 0;
                }
                if (shoppingList && shoppingList.length > 0) {
                    if (shoppingList) {
                        this.isAddress = false
                        this.shoppingList = shoppingList
                    } else {
                        this.isAddress = true
                    }
                }
            })
        },
        selectGoods(item){        //商品选择方法.
            if (item.flag == 0) {
                item.flag = 1
            } else {
                item.flag = 0
            }
            console.log(item.flag)
            // this.addlist = item.id
            // console.log(this.addlist)
            item.isSelect = !item.isSelect    //改变选择状态
            this.allSelect = false
            if(item.isSelect == true){
                this.sum = this.sum+(item.price*item.num)
            }else{
                this.sum = this.sum-(item.price*item.num)
            }                                //结算处商品总额计算
        },
        allGoodsSelect(){                    //全选商品方法
            this.allSelect = !this.allSelect    //改变选择状态
            if(this.allSelect == true){
                this.sum=0
                for(var i=0;i<this.shoppingList.length;i++){
                    this.shoppingList[i].isSelect = true;
                    this.sum = this.sum+(this.shoppingList[i].price*this.shoppingList[i].num)
                }
            }else{
                for(var i=0;i<this.shoppingList.length;i++){
                    this.sum = this.sum-(this.shoppingList[i].price*this.shoppingList[i].num)
                    this.shoppingList[i].isSelect = false;
                }
            }                                    //结算处商品总额计算
        },
        // 商品数量增加
        numAdd(item,index){
            let cart_id = item.id
            cartgoodsnumplus(cart_id).then(resp => {
                let code = resp.code
                let num = resp.data.num
                if (code == '200') {
                    item.num++
                    if(item.isSelect == true){
                        this.sum = Number(this.sum)+Number(item.price)
                    }
                    item.num = num
                } 
                if (code == '400') {
                    item.num = num
                    Toast.fail(resp.data.msg);
                    return false
                }
               
            })
        },
        // 商品数量减少
        numDel(item,index){
            let cart_id = item.id
            cartgoodsnumreduce(cart_id).then(resp => {
                if(item.isSelect == true){
                    this.sum = this.sum-item.price
                }
                let num = resp.data.num
                item.num = num
                if (item.num == 1) {
                    Toast.fail('宝贝不能再减少了~');
                    return false
                }
            })
        },
        buyGoods(item){
            console.log(item)
            let id = [];
            this.shoppingList.find(ele => {
                if(ele.flag == 1){
                    id.push(ele.id)
                }
            })
            console.log(id)
            if (id.length !== 0) {
                let addid = id.join(",")
                this.$router.push({
                    path: "/detailssettlement", 
                    query: { id: addid}
                })
            }else { 
                Toast.fail('请选择商品~');
            }
            
        },
        // 删除
        delGoods(id,item){
            console.log(id)
            Dialog.confirm({
            message: '是否删除商品'
            }).then(() => {
                delshoppingcart(id).then(resp => {
                    let data = resp.data.success
                    if (data == 1) {
                        Toast.success('删除成功');
                        this.shoppingcartlist()
                        location.reload();
                    }
                })
            }).catch(() => {
            // on cancel
            });
        },
        // 猜你喜欢
        guessgoods () {
            guessgoods().then(resp => {
                let orders = resp.data.goods
                if (orders && orders.length > 0) {
                    this.orders = orders
                }
            })
        },
        ShoppingCart (id) {
            console.log(id)
            this.$router.push({
                path: "/details", 
                query: { id: id }
            })
        },
        entresim () {
            this.$router.push({
                path: "/allShang",
            })
        }
    }
};
</script>

<style>
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
    min-height: 100vh;
    background-color: #efefef;
    color: #333;
    padding-bottom: 95px;
    padding: 20px 0;
}
.kong {
    text-align: center;
}
.kong img{
    width: 114px;
    height: 114px;
    margin-top: 40px;
}
.kong .pp {
    margin-top: 30px;
    margin-bottom: 40px;
    font-size: 26px;
    color: #a5a0a0;
}
.kong .pp1 {
    width: 200px;
    padding: 10px;
    border: 2px solid #e52424;
    border-radius: 10px;
    font-size: 30px;
    color: #e52424;
    background-color: #fff;
}
.like {
    padding: 20px;
    
}
.likecenter {
    background-color: #fff;
    border-radius: 20px;
    padding-bottom: 40px;
    text-align: center;
}
.likecenter p .img2 {
    width: 260px;
    height: 29px;
    margin-top: 30px;
    /* margin-bottom: 30px; */
}
.details {
    /* padding-left: 20px;
    padding-right: 20px; */
    height: 100%;
    margin-top: 30px;
    text-align: left;
}

.details ul {
    width: 100%;
}
.details ul li {
    width: 300px;
    border-radius: 20px;
    background-color: #fff;
    float: left;
    margin-left: 32px;
    padding-bottom: 20px;
    border: 2px solid #cccccc;
}
.details ul li .img1 {
    width: 300px;
    height: 298px;
    border-radius: 20px 20px 0 0;
}
.details ul li .licenter {
    padding: 0 20px;
}
.details ul li .licenter .seckilltitle {
    font-size: 22px;
    color: #000;
    margin-bottom: 10px;
}
.details ul li .licenter .seckillcenter .jiage{
    color: #ba2b18;
    font-size: 26px;
    line-height: 1.5;
}
.details ul li .licenter .seckillcenter .img {
    width: 38px;
    height: 31px;
}
      
#app{
    margin: 0;
    padding: 0;
    width: 100%;
    margin-bottom: 60px;
    
}
.shoppingMain{
    width: 100%;
    height: auto;
}
.shoppingItem{
    /* height: 150px; */
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    background: #fff;
    border-radius:20px;
    display: flex;
    padding: 20px;
}
.selectCircle{
    width: 20px;
    height: 20px;
    margin: auto 0px auto 10px;
}
.shoppingImg{
    width: 100px;
    height: 100px;
    margin-top: 30px;
    margin-left: 20px;
    /* background-color: #e26411; */
}
.shoppingImg img{
    height: 100%;
    width: 100%;
}
.itemRight{
    font-size: 10px;
    width: 380px;
    margin-left: 40px;
    padding-top: 20px;
}
.title{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 26px;
    margin-bottom: 10px;
    color: #000;
}
.jieshao {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
}
.jieshao .jieshaospan {
    margin-left: 20px;
}
.numAndMoney{
    /* display: flex; */
}
.numAndMoneyp {
    color: #e52424;
    font-size: 24px;
}


.numberControl{
    padding: 20px;
    text-align: center;
    /* height: 80px;
    line-height: 80px; */
}
 input{
    text-align: center;
    width: 40px;
    height: 25px;
    font-size: 24px;
    margin-left: 10px;
    margin-right: 10px;
}
.numberControl .btn {
    display: inline-block;
    border: 1px solid #afafaf;
    width: 40px;
    /* height: 40px; */
    font-size: 24px;
}
.delete {
    margin-top: 60px;
    margin-left: 40px;
}
.delete img {
    width: 30px;
    height: 35px;
}
.bottomMain{
    position: fixed;
    width: 750px;
    height: 60px;
    bottom: 90px;
    left: 0;
    background: #fff;
    padding: 20px;
}
.bottomMaincenter {
    width: 100%;
    position: relative;
}
.selectCircle1 {
    position: absolute;
    top: 20px;
    left: 0;
}
.bottomMaincenter span{
    position: absolute;
    top: 20px;
    left: 50px;
    
}
.bottomMaincenter .bottombtn2 {
    position: absolute;
    left: 250px;
    width: 100%;
    font-size: 24px;
}
.bottomMaincenter .bottombtn2 .bottombtnspan {
    color: #e52424;
    margin-left: 110px;
}
.bottombtn1{
    position: absolute;
    right: 6%;
    height: 60px;
    width: 180px;
    background-color: #e52424;
    color: #fff;
    border: none;
    border-radius: 30px;
    font-size: 30px;

}
/* .bottombtn2{
    font-size: 24px;
    margin: auto 0;
} */
/* .bottombtnspan {
    color: #e52424;
} */
.checked{
    background: url('./../img/pitchup.png') no-repeat;
    background-size: 100%;
}
.van-hairline--top-bottom.van-tabbar.van-tabbar--fixed {
    background-color: #343740;
  }
.van-tabbar-item.van-tabbar-item--active {
    color: #e52424;
}
.van-tabbar-item {
    color: #fff;
}
</style>