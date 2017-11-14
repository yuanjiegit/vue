<template>
  <div class="comics">
    <div class="top">
      <div class="recommend">
        <router-link to="/comics/recommend">推荐</router-link>
      </div>
      <div class="recommend sort">
        <router-link to="/comics/sort" class="sort">分类</router-link>
        <router-link to="/comics/search" class="search icon-search"></router-link>
      </div>
    </div>
    <router-view :recommend="recommend" :sort="sort"></router-view>
  </div>
</template>

<script>
  export default {
    props: {
      recommend: {
        type: Object
      },
      sort: {
        type: Object
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>
  .comics {
    width: 100%;
    height: 100%;
    .top {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      width: 100%;
      height: 43px;
      background-color: #fff;
      font-weight: 700;
      z-index: 50;
      .recommend {
        flex: 1;
        display: inline-block;
        line-height: 40px;
        text-align: right;
        & > a {
          display: inline-block;
          padding: 0 20px;
          color: #000;
          font-size: 14px;
          &.active {
            border-bottom: 2px solid #c7e299;
            color: #c7e299;
            box-sizing: border-box;
          }
        }
        .search {
          line-height: 40px;
          font-size: 16px;
          color: #2b343c;
        }
      }
      .sort {
        text-align: left;
        .search {
          float: right;
          margin-right: 15px;
        }
      }
    }
  }
</style>
