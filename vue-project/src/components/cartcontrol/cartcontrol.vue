<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent='decreaseCart'>
        <transition name="rotate">
          <span class="inner icon-remove_circle_outline"></span>
        </transition>
      </div>
    </transition>
    <div class="cart-count" v-show='food.count > 0'>{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent='addCart'></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: {
      food :{
        type: Object
      }
    },
    methods: {
      addCart(e){
        if(!e._constructed) {
          return;
        }

        if(!this.food.count) {
          Vue.set(this.food,'count',1);
        }else {
          this.food.count++;
        }
      },

      decreaseCart(e) {
        if(!e._constructed) {
          return;
        }
        this.food.count--;
      }
    }
  }
</script>

<style lang='stylus'>
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      &.move-enter-active, &.move-leave-active
        transition all .3s linear 
      &.move-enter, &.move-leave-to
        opacity 1
        transform translate3d(24px, 0, 0)
      .inner
        display inline-block
        line-height 24px
        font-size 24px
        color rgb(0, 160, 220)
        &.rotate-enter-active, &.rotate-leave-active
          transition all .3s linear
          transform rotate(0)
        &.rotate-enter, &.rotate-leave-to
          transform rotate(180deg)
    .cart-count
      display inline-block
      width 12px
      vertical-align top
      padding-top 6px
      line-height 24px
      font-size 10px
      text-align center
      color rgb(147, 153, 159)
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)


</style>