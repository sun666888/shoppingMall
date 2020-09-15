<template>
    <div class="home">
        <div class="address father">
            <p class="addressp father">
                <label class="addresslabel fl" for="">收货人：</label>
                <input class="addressinput" type="text" placeholder="请输入收货人姓名" v-model="username">
            </p>
            <p class="addressp father">
                <label class="addresslabel fl" for="">手机号码：</label>
                <input class="addressinput" type="tel" placeholder="请输入手机号" v-model="mobile">
            </p>
            <p class="addressp father">
                <label class="addresslabel fl" for="">所在地区：</label>
                <!-- <span class="addressinput1" @click="area">{{address}}</span> -->
                <input class="addressinput" type="text" placeholder="请选择地址" @click="area" v-model="address">
            </p>
            <p class="addressp father">
                <label class="addresslabel fl" for="">详细地址：</label>
                <textarea class="addressinput1"  row='10' placeholder="请输入详细地址(5-120字)" v-model="detailsaddress"></textarea>
            </p>
           
            <div class="center-bottom" @click="wancheng">确定</div>
        </div>
        <van-popup v-model="showpopup" position="bottom">
            <van-area
                :area-list="areaList"
                :columns-placeholder="['请选择', '请选择', '请选择']"
                title="选择地址"
                @confirm="confirm"
                @cancel="cancel"
            />
        </van-popup>
    </div>
</template>

<script>
import { Button, Area, Popup, Toast } from 'vant'
import { books, getuseraddress } from "./services/home";
import area from './../assets/area'

export default {
    components: {
        [Button.name]: Button,
        [Area.name]: Area,
        [Popup.name]: Popup,
        [Toast.name]: Toast,
    },
    data () {
        return {
            areaList: {},
            address: "",
            username: "",
            mobile: "",
            detailsaddress: "",
            showpopup: false,
            areaNamelist1: "",
            areaNamelist2: "",
            areaNamelist3: "",
            goods_id: '',
            orderno: '',
            is_default: 0,
        }
    },
    mounted () {
        this.getuseraddress()
    },
    methods: {
        getuseraddress () {
           let url = window.location.href;
      this.goods_id = url
        .split("#")[1]
        .split("?")[1]
        .split("=")[1];
        },
        area () {
            this.showpopup = true
            this.areaList = area
        },
        // 确定
        confirm (picker) {
            let areaName = "";
            for (var i = 0; i < picker.length; i++) {
                areaName = areaName + picker[i].name + " ";
            }
            this.address = areaName;
            this.showpopup = false
            this.areaNamelist1 = picker[0].name
            this.areaNamelist2 = picker[1].name
            this.areaNamelist3 = picker[2].name
            // console.log(this.areaNamelist1)
            // console.log(this.areaNamelist2)
            // console.log(this.areaNamelist3)
        },
        // 取消
        cancel () {
            this.showpopup = false
        },
        wancheng () {
            let addaddressrlist = {
                username : this.username,
                mobile : this.mobile,
                address : this.address+this.detailsaddress,
                goods_id : this.goods_id,
            }
            let reg = /^1[0-9]{10}$/g
            if (reg.test(this.mobile)) {
                books(addaddressrlist).then(resp => {
                    let code = resp.code
                    if (code == 200) {
                     this.$toast.success('预约成功')
                        this.$router.push({
                            path: "/"
                        })
                    }
                })
            } else if (this.username == "" || this.mobile =="" ||  this. detailsaddress == ""){
                this.$toast.fail('都不能为空')
            }
            else {
                this.$toast.fail('请输入11位手机号')
            }
        }
    }
}
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
    margin: 0;
}
* {
    padding: 0;
}
.home {
    width: 690px;
    min-height: 100vh;
    background-color: #fff;
    color: #333;
    padding: 0 30px ;
    .address {
        // background-color: #fff;
        padding: 40px 10px;
        border-radius: 20px;
        .addressp {
            // height: 60px;
            line-height: 60px;
            margin: 20px 0;
            // border-bottom: 1px solid #cccccc;
            .addresslabel {
                display: inline-block;
                font-size: 24px;
                // 字体宽度自适应
                width: 130px;
                text-align:justify;
                text-justify:distribute-all-lines;/*ie6-8*/
                text-align-last:justify;/* ie9*/
                -moz-text-align-last:justify;/*ff*/
                -webkit-text-align-last:justify;/*chrome 20+*/
            }
            @media screen and (-webkit-min-device-pixel-ratio:0){/* chrome*/
                .test1:after{
                    content:".";
                    display: inline-block;
                    width:100%;
                    overflow:hidden;
                    height:0;
                }
            }
            .addressinput {
                height: 60px;
                width: 70%;
                font-size: 22px;
                border: 2px solid #507DFC;
                border-radius: 15px;
                padding-left: 20px;
                background-color: #fff;
                margin-left: 30px;
                text-align: left;
            }
            .addressinput1 {
                display: inline-block;
                // height: 40px;
                width: 70%;
                font-size: 22px;
                border-radius: 15px;
                padding-left: 20px;
                border: 2px solid #507DFC;
                background-color: #fff;
                margin-left: 30px;
            }
        }
        .addressptwo {

            img {
                width: 30px;
                // margin-top: 40px;
                margin-right: 40px;
            }
            span {
                font-size: 24px;
                // margin-top: 40px;
            }
        }
        .van-button {
            height: 50px;
            line-height: 50px;
            border-radius: 30px;
            margin-top: 30px;
            margin-right: 30px;
        }
        .center-bottom {
            width: 80%;
            height: 80px;
            margin: 150px auto 0 auto;
            border-radius: 40px;
            background: #527FFD;
            box-shadow: 0 0 10px #527FFD;
            color: #fff;
            text-align: center;
            line-height: 80px;
            font-size: 26px;
            letter-spacing: 2px;
        }
    }
}
</style>