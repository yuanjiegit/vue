<template>
  <div id="app">
    <div class="bottom">
    <span><router-link to="/home">首页</router-link></span>
    <span><router-link to="/comics">漫画</router-link></span>
    <span><router-link to="/group">小组</router-link></span>
    <span><router-link to="/mine">我的</router-link></span>
    </div>
    <router-view :recommend="recommend" :sort="sort"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        recommend: {},
        sort:{},
      }
    },
    created() {
      let self = this
      this.$axios.get('/api/recommend')
        .then((res) => {
          res = res.data
          if (res.error === 0) {
            self.recommend = res.data
          }
        })
        .catch((error) => {
          alert(error)
        })
      this.$axios.get('/api/sort')
        .then((res) => {
          res = res.data
          if (res.error === 0) {
            self.sort = res.data
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  #app {
    width: 100%;
    height: 100%;
    .bottom {
      position: absolute;
      display: flex;
      bottom: 0px;
      width: 100%;
      height: 39px;
      border-top: 1px solid #c1c3c5;
      background-color: #fff;
      z-index: 100;
      span {
        flex: 1;
        text-align: center;
        line-height: 39px;
        & > a {
          color: #4b4b4b;
          &.active {
            color: #c7e299;
            box-sizing: border-box;
          }
        }
      }
    }
  }
</style>
