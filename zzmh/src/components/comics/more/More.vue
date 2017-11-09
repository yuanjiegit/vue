<template>
  <transition name="more">
    <div class="more">
      <div class="title">
        <span @click="fallback">&lt;</span>
        <div class="titlename">{{lists[index].name}}</div>
        <span></span>
      </div>
      <div class="comics-list" v-if="lists[index].obj_type==2" ref="more">
        <div class="scroll">
          <span class="listsname">{{lists[index].name}}</span>
          <div class="list"><p><span></span></p>漫画列表</div>
          <ul>
            <li class="comics" v-for="item in lists[index].comics">
              <div class="img">
                <img :src="item.cover_img">
              </div>
              <div class="text">
                <div class="comics-name">{{item.name}}</div>
                <div class="author">作者:{{item.name}}</div>
                <div class="type">类型:科幻、搞笑</div>
                <div class="time">更新:2017-09-21</div>
                <div class="last_volume">更新至{{item.last_volume}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="theme-list" v-if="lists[index].obj_type==1" ref="more">
        <div class="scroll">
          <ul>
            <li class="lis" v-for="item in lists[index].theme_list">
              <div class="cover"><img :src="item.cover" alt=""></div>
              <div class="text"><span>{{item.name}}</span><span class="right">&gt;</span></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  import IScroll from 'iscroll/build/iscroll'
  export default {
    props: {
      lists: Array,
      index: Number
    },
    data () {
      return {}
    },
    created() {
      this.$nextTick(() => {
        this.initiscroll()
      })
    },
    methods: {
      ...mapMutations(['GET_ISSHOW']),
      fallback(){
        this.GET_ISSHOW(!this.getshowmore)
      },
      initiscroll(){
        if (this.$refs.more) {
          this.moreScroll = new IScroll(this.$refs.more, {
            click: true
          })
          let th = this
          setTimeout(function () {
            th.moreScroll.refresh();
          }, 0)
        }
      },
    },
    computed: {
      ...mapGetters(['getshowmore']),
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  .more {
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    transition: all 0.5s;
    &.more-enter, &.more-leave-to {
      opacity: 0;
    }
    z-index: 500;
    .title {
      position: relative;
      top: 0;
      display: flex;
      height: 40px;
      background-color: #f3f5f7;
      border-bottom: 1px solid #dddddd;
      z-index: 120;
      span {
        flex: 0 0 40px;
        text-align: center;
        line-height: 40px;
        font-size: 26px;
        font-weight: 900;
      }
      .titlename {
        flex: 1;
        font-size: 14px;
        color: #888a8c;
        text-align: center;
        line-height: 40px;
      }
    }
    .comics-list {
      width: 100%;
      height: 100%;
      overflow: hidden;
      .scroll{
        padding-bottom: 40px;
        .listsname {
          display: inline-block;
          padding-left: 10px;
          width: 100%;
          height: 25px;
          border-bottom: 1px solid #bebebe;
          font-size: 12px;
          color: #a0cc56;
          line-height: 25px;
        }
        .list {
          position: relative;
          display: inline-block;
          padding-left: 10px;
          width: 100%;
          height: 25px;
          background-color: #efefef;
          border-bottom: 1px solid #bebebe;
          font-size: 12px;
          color: #7a7a7a;
          line-height: 25px;
          p {
            display: inline-block;
            width: 10px;
            height: 10px;
            border: 1px solid #a0cc56;
            border-radius: 50%;
            vertical-align: text-top;
            span {
              position: absolute;
              top: 8px;
              left: 12px;
              display: inline-block;
              width: 6px;
              height: 6px;
              border: 1px solid #a0cc56;
              border-radius: 50%;
              background-color: #a0cc56;
            }
          }
        }
        ul {
          .comics {
            display: flex;
            padding: 10px 10px;
            width: 100%;
            height: 120px;
            border-bottom: 1px solid #d0d0d0;
            .img {
              flex: 0 0 90px;
              img {
                width: 100%;
              }
            }
            .text {
              flex: 1;
              padding: 5px 0 0 10px;
              color: #979797;
              .comics-name {
                margin-bottom: 5px;
                font-size: 14px;
                color: #000;
              }
              .author, .type, .time, .last_volume {
                margin-bottom: 5px;
                font-size: 12px;
                letter-spacing: 1px;
              }
              .last_volume {
                color: red;
              }
            }
          }
        }
      }
    }
    .theme-list {
      padding: 5px;
      background-color: #eeeaeb;
      height: 100%;
      .scroll{
        /*padding-bottom: 40px;*/
        ul {
          padding-bottom: 60px;
          .lis {
            padding: 5px;
            background-color: #fff;
            margin-bottom: 10px;
            border: 1px solid #d0d0d0;
            &:last-child {
              margin-bottom: 0px;
            }
            .cover {
              width: 100%;
              img {
                width: 100%;
              }
            }
            .text {
              height: 20px;
              font-size: 12px;
              line-height: 20px;
              color: #9c9c9c;
              .right {
                float: right;
                margin-right: 5px;
                color: #747474;
                font-weight: bold;
                font-size: 16px;
              }
            }
          }
        }
      }

    }
  }
</style>
