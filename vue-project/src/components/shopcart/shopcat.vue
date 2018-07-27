<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需要配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="playClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h2 class="title">购物车</h2>
          <span class="empty">清空</span>
        </div>
        <div class="list-content" ref="list-content">
          <ul>
            <li class="food" v-for="(food,index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  export default {
    props: {
      selectFoods: {
        type: Array,
        defalut() {
          retuen [
            {
              price: 10,
              count: 1
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        defalut: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        fold: true
      }
    },

    computed: {
      //计算总价
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        });
        return total;
      },
      // 计算总数
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      // 支付详情
      payDesc() {
        if(this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`
        } else {
          return `去结算`
        }
      },
      // 支付样式
      playClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      // 购物车折叠列表
      listShow() {
        if(!this.totalCount) {
          this.fold = true;
          return false
        }
        let show = !this.fold;
        if(show) {
          this.$nextTick(() => {

          })
        }
      }
    },

    components: {
      cartcontrol
    }
  }
</script>

<style lang='stylus' scoped>
  @import '../../common/stylus/mixin.styl'
  .shopcart 
    position fixed
    left 0
    bottom 0
    z-index 20
    width 100%
    height 48px
    .content 
      display flex
      height 100%
      background-color #141d27
      font-size 0
      color rgba(255, 255, 255, .4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background-color #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background-color #2b343c
            &.highlight
              background-color rgb(0, 160, 220)
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight {
                color #fff
              }
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 8px
            font-size 9px
            font-weight 700
            color #ffffff
            background-color rgb(240, 20, 20) 
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, .4)
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          &.not-enough
            background-color #2b333b
          &.enough
            background-color #00b43c
            color #ffffff
    .shopcart-list 
      position absolute
      left 0
      top 0
      z-index -1
      width 100px
      &.fade-enter-active,&.fade-leave-active
        transition all .5s linear
        transform translate3d(0, -100%, 0) 
      &.fade-enter,&.fade-leave-active
        transform translate3d(0, 0, 0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background-color  #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, .1)  
        .title
          float left 
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right 
          font-size  12px
          color rgb(0, 160, 220)
        .list-content
          padding 0 1.125rem
            

</style>