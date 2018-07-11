<template>
  <div>
    <ele-header :seller='seller'></ele-header>
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
    
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
  import header from './components/header/header'
  import {urlParse} from './common/js/util.js'

  const ERR_OK =0;
  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            // console.log(queryParam);
            return queryParam.id
          })()
        }
      }
    },
    created() {
      this.$axios.get('/api/seller?id=' + this.seller.id)
        .then((response) => {
          response = response.data;
          // console.log(response);
          if(response.errno === ERR_OK) {
            this.seller = Object.assign({},this.seller,response.data);
            // console.log(this.seller);
          }
        });
    },
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