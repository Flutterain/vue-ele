<template>
  <div>
    <ele-header></ele-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view keep-alive></router-view>
  </div>
</template>

<script>
  import header from './components/header/header'
  export default {
    components:{
      'ele-header':header
    }
  }
</script>

<style lang="stylus">
  .tab
    display: flex
    .tab-item
      flex: 1

</style>