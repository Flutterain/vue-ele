<template>
  <div class='header'>
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width='64' height='64'  alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if='seller.supports'>
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div class="support-count" v-if="seller.supports">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width='100%' height='100%' alt="">
    </div>
  </div>
</template>

<script>
  export default {
    props : {
      seller:{
        type:Object
      }
    },
    created() {
      this.classMap = ['decrease','discount','special','invoice','guarantee']
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  @import '../../common/stylus/mixin.styl';

  .header
    position relative
    color: #fff
    background: rgba(7,17,27,.5)
    .content-wrapper
      position relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block;
        vertical-align: top;
        img
          border-radius: 2px
    
      .content
        display: inline-block 
        margin: 2px 0 2px 16px 
        .title
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('./img/brand')
            background-size: 30px 18px 
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin: 8px 0 10px
          font-size: 12px
          line-height: 12px
        .support
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('./img/decrease_1')
            &.discount
              bg-image('./img/discount_1')
            &.special
              bg-image('./img/special_1')
            &.invoice
              bg-image('./img/invoice_1')
            &.guarantee
              bg-image('./img/guarantee_1')    
          .text
            display: inline-block
            font-size: 10px
            line-height: 12px
            margin-left: 4px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        height 24px
        line-height 24px
        padding: 0 8px
        font-size 0
        background: rgba(0, 0, 0, .2)
        border-radius: 14px
        text-align center
        .count
          vertical-align top
          font-size: 10px  
        .icon-keyboard_arrow_right 
          line-height 24px
          margin-left: 2px 
          font-size 10px                              
    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      // font-size 0
      white-space nowrap
      overflow hidden
      text-overflow ellipsis 
      background rgba(7, 17, 27, .2)
      .bulletin-title
        display inline-block
        vertical-align top
        width 22px
        height 12px
        margin-top 8px
        bg-image('./img/bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        vertical-align top
        margin-left 4px
        font-size 10px
      .icon-keyboard_arrow_right
        position absolute
        font-size 10px
        right 12px
        top 8px
    .background
      position absolute
      top 0
      left 0
      z-index -1
      width 100%
      height 100%
      filter: blur(10px)


</style>

