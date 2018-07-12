<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item , index) in menu" :key="index" :class="{current:currentIndex === index}">
          <span class="text">
            <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
          </span>
        </li>
      </ul>
    </div>
    <div class="food-wrapper">
      <ul>
        <li>
          <h3></h3>
          <ul>
            <li></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods : []
      }
    },
    created() {
      this.classMap = ['decrease','discount','special','invoice','guarantee'];

      this.$axios.get('/api/goods').then((response) => {
        response = response.data;
        if(response.errno === ERR_OK) {
          this.goods = response.data;
        }
      })
    }
  }
</script>

<style scoped>

</style>