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
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="support-count">
      <span class="count">{{seller.supports.length}}个</span>
      <i class="icon-keyboard_arrow_right"></i>
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

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  @import '../../common/stylus/mixin.styl';

  .header
    position relative
    color: #fff
    background: rgba(7,17,27,.5)
    .content-wrapper
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
            bg-image('./img/decrease_1')
            background-size: 12px 12px
            background-repeat: no-repeat
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
      background: rgba(0,0,0,.2)
      border-radius: 14px
      text-align center
      .count
        vertical-align top
        font-size: 10px  
      i 
        line-height 24px
        margin-left: 2px 
        font-size 10px                              
      







































</style>

