<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item , index) in goods" :key="index"  class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
          <span class="text">
            <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="food-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(item , index) in goods" :key="index" class="food-list food-list-hook">
          <h3 class="title">{{item.name}}</h3>
          <ul>
            <li v-for="(food ,index) in item.foods" :key="index" class="food-item">
              <div class="icon">
                <img :src="food.icon" width="57" height="57" alt="">
              </div>
              <div class="content">
                <div class="name">{{food.name}}</div>
                <div class="description" v-show="food.description">
                  {{food.description}}
                </div>
                <div class="extra">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="newPrice">￥{{food.price}}</span>
                  <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="control-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods : [],
        listHeight: [],
        scrollY: 0
      }
    },

    created() {
      this.classMap = ['decrease','discount','special','invoice','guarantee'];

      this.$axios.get('/api/goods').then((response) => {
        response = response.data;
        if(response.errno === ERR_OK) {
          this.goods = response.data;
          // 异步触发，等待dom完成加载后
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          })
        }
      })
    },

    computed:{
      currentIndex() {
        for(let i=0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if(!height2 || (this.scrollY > height1 && this.scrollY < height2)) {

            return i
          }
        }
        return 0
      }

    },

    methods: {
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          click: true,
          probeType: 3
        });

        this.foodScroll.on('scroll',(pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },

      _calculateHeight() {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for(let i=0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },

      selectMenu(index,event){
        // 自己默认派发事件的时候，_constructed被设置为true，但是浏览器并没有这个属性
        if(!event._constructed) {
          return
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        // 获取对应元素的列表
        let el = foodList[index];
        // 设置滚动时间
        this.foodScroll.scrollToElement(el,300);

      }
    },

    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl'
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    overflow hidden
    width 100%
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px  
        text-align center
        &.current
          margin-top -1px
          background-color #fff
          font-weight 700
        .icon
          display inline-block
          vertical-align top
          height 12px
          width 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('./goodsImg/decrease_3')
          &.discount
            bg-image('./goodsImg/discount_3')
          &.special
            bg-image('./goodsImg/special_3')
          &.invoice
            bg-image('./goodsImg/invoice_3')
          &.guarantee
            bg-image('./goodsImg/guarantee_3')
        .text
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
          border-1px(rgba(7, 17, 27, .1))
    .food-wrapper
      flex 1
      .title
        height 26px
        line-height 26px
        padding-left 14px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background-color #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,.1))
        &:last-child
          margin-bottom 0
          border-none()
        .icon
          flex 0 0 57px
        .content
          margin-left 10px
          margin-top 2px
          .name
            margin-bottom 8px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)  
          .description
            margin-bottom 8px
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)

          .extra
            font-size 0
            color rgb(147, 153, 159)
            .sellCount
              font-size 10px
            .rating
              margin-left 12px
              font-size 10px
          .price
            line-height 24px
            font-weight 700
            .newPrice
              font-size 14px
              color rgb(240, 20, 20)
            .oldPrice
              margin-left 8px
              text-decoration line-through
              font-size 10px 
              color rgb(147, 153, 159)
                    
</style>