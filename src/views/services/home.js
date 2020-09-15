import request from '../../util/request'
import qs from 'qs'

// 登录
export function login (code) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/api/login',
    method: 'post',
    data: {code}
  })
}
// 验证码
export function verify (mobile) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/api/verify',
    method: 'post',
    data: {mobile}
  })
}
// 绑定手机号
export function binding (mobile,verify) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/api/binding',
    method: 'post',
    data: {mobile,verify}
  })
}

// 首页
export function homePage () {
  return request({
    // url: '/twelve_game/public/wxunicom/test_terminal_shop/public/index.php/index/goods/home_page',
    url: '/wxunicom/test_terminal_shop/public/index.php/index/goods/home_page',
    method: 'post',
    data: {}
  })
}

// 全部商品
export function goodsSort (sort) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/goods/goods_sort',
    method: 'post',
    data: sort 
  })
}

// 首页四类型
export function gettypegoods (type) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/goods/get_type_goods',
    method: 'post',
    data: type 
  })
}

// 首页四类型
export function shoppingcartlist () {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/goods/shopping_cart_list',
    method: 'post',
    data: {}
  })
}

// 加入购物车
export function shoppingcart (detailslist) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/goods/shopping_cart',
    method: 'post',
    data: detailslist
  })
}

// 删除购物车商品删除
export function delshoppingcart (cart_id) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/goods/del_shopping_cart',
    method: 'post',
    data: {cart_id}
  })
}

// 增加购物车商品数量 
export function cartgoodsnumplus (cart_id) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/goods/cart_goods_num_plus',
    method: 'post',
    data: {cart_id}
  })
}

// 减少购物车商品数量 
export function cartgoodsnumreduce (cart_id) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/goods/cart_goods_num_reduce',
    method: 'post',
    data: {cart_id}
  })
}

// 商品详情
export function goodsdetail (gid) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/goods/goods_detail',
    method: 'post',
    data: gid
  })
}
// 提交预约
export function books (data) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/api/books',
    method: 'post',
    data: data
  })
}

// 预订单详情
export function orders (orderlist) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/orders/orders',
    method: 'post',
    data: orderlist
  })
}

// 立即购买 生成订单
export function addorders (address_id,orderno,remarks) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/orders/order_address',
    method: 'post',
    data: {address_id,orderno,remarks}
  })
}

// 添加收货地址
export function adduseraddressr (addaddressrlist) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/address/add_user_address',
    method: 'post',
    data: addaddressrlist
  })
}

// 查询地址信息
export function getuseraddress (aid) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/address/get_user_address',
    method: 'post',
    data: {aid}
  })
}

// 查询地址信息
export function isdefault (aid) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/address/is_default',
    method: 'post',
    data: {aid}
  })
}

// 删除地址
export function deladdress (aid) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/address/del_address',
    method: 'post',
    data: {aid}
  })
}

// 添加收货地址列表
export function adduseraddressrlist () {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/address/get_user_address_list',
    method: 'post',
    data: {}
  })
}

// 订单详情线上
export function ordersdetail (ordernolist) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/orders/orders_detail',
    method: 'post',
    data: ordernolist
  })
}

// 用户信息
export function userinfo () {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/Users/user_info',
    method: 'post',
    data: {}
  })
}

// 我的订单
export function getorders (type) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/orders/get_orders',
    method: 'post',
    data: type
  })
}

// 确认收货
export function determine (orderno) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/orders/determine',
    method: 'post',
    data: { orderno }
  })
}

// 猜你喜欢
export function guessgoods () {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/goods/guess_goods',
    method: 'post',
    data: {}
  })
}

// 商品搜索
export function goodssearch (search) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/goods/goods_search',
    method: 'post',
    data: {search}
  })
}

// 物流
export function currentState (orderno) {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/api/currentState?orderno=' + orderno,
    method: 'get',
    data: {}
  })
}

// 耳机专区
export function erJiList () {
  return request({
    url: '/wxunicom/test_terminal_shop/public/index.php/index/goods/pingpai',
    method: 'get',
    data: {}
  })
}

