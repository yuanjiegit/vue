<template>
  <div class="sort" ref="sort">
    <div class="scroll">
      <div class="topic">
        <div class="title">推荐专题</div>
        <ul class="clearfix">
          <li class="banners" v-for="banners in sort.banners">
            <img :src="banners.cover">
          </li>
        </ul>
      </div>
      <div class="popular">
        <div class="title">热门分类</div>
        <ul class="clearfix">
          <li class="themes" v-for="themes in sort.themes">
            <img :src="themes.cover" alt="">
            <div class="text">{{themes.name}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll'
  export default {
    props: {
      sort: {
        type: Object
      }
    },
    created() {
      this.$nextTick(() => {
        this.initiscroll()
      })
    },
    data () {
      return {}
    },
    methods: {
      initiscroll(){
        if (this.$refs.sort) {
          this.sortScroll = new IScroll(this.$refs.sort, {
            click: true
          })
          let th = this
          setTimeout(function () {
            th.sortScroll.refresh();
          }, 0)
        }
      },
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>
  .sort {
    position: absolute;
    top: 43px;
    bottom: 40px;
    width: 100%;
    z-index: 100;
    background-color: rgba(240, 240, 240, 0.52);
    overflow: hidden;
    touch-action:none;
    .scroll {
      padding: 10px 5px;
      .topic {
        margin-top: 5px;
        width: 100%;
        box-sizing: border-box;
        .title {
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        ul {
          width: 100%;
          &.clearfix {
            display: inline-block;
            &:after {
              display: block;
              content: ' ';
              height: 0;
              line-height: 0;
              clear: both;
              visibility: hidden;
            }
          }
          .banners {
            width: 48%;
            float: left;
            margin: 1%;
            img {
              border-radius: 5px;
              width: 100%;
            }
          }
        }
      }
      .popular{
        margin-top: 10px;
        width: 100%;
        box-sizing: border-box;
        .title {
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        ul{
          width: 100%;
          &.clearfix {
            display: inline-block;
            &:after {
              display: block;
              content: ' ';
              height: 0;
              line-height: 0;
              clear: both;
              visibility: hidden;
            }
          }
          .themes{
            width: 31%;
            float: left;
            margin:1%;
            &:nth-child(2n+0){
              margin-right: 1%;
              margin-left: 1%;
            }
            &:nth-child(3n+0){
              margin-right: 1%;
            }
            img {
              border-radius: 5px;
              width: 100%;
            }
            .text{
              margin: 5px 0;
              width: 100%;
              font-size: 12px;
              text-align: center;
              color: #888d93;
            }
          }
        }
      }
    }
  }
</style>
