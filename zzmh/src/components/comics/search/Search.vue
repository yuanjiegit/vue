<template>
  <div class="search">
    <div class="title">
      <div class="superior">
        <router-link to="/comics/recommend">&lt;</router-link>
      </div>
      <div class="input">
        <input type="text" placeholder="搜索漫画、专辑、帖子、资讯、用户" ref="input" @focus="timer(true)" @blur="timer()">
      </div>
      <div class="button" @click="addhistory">
        <span class="icon-search"></span>搜索
      </div>
    </div>
    <div class="record" v-show="getisfocus">
      <div class="lis" ref="history">
        <ul>
          <li class="history" v-for="(item1,index) in gethistory" :key="item1.id">
            <span class="text" @tap="clicktext(item1)">{{item1}}</span>
            <p class="icon-trash btn" @tap="deleteonehistory(index)"></p>
          </li>
        </ul>
      </div>
      <div class="delete init" v-if="(!showdelete&&comicsarr.length==0)">暂无搜索没有记录</div>
      <div class="delete" @click="DELETE_ALLHISTORY" v-if="showdelete">清除历史</div>
    </div>
    <div class="isnull" v-if="getisnull">
      <span>请输入内容</span>
    </div>
    <div class="box" v-if="(getshow&&!getisfocus&&!getisnull)">
      没有找到漫画
    </div>
    <transition name="comics">
      <div class="comics-list" v-if="!getshow" ref="comics" @tap="inputblur">
        <ul>
          <li class="comics" v-for="item in comicsarr">
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
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapMutations,mapActions} from 'vuex'
  import IScroll from 'iscroll/build/iscroll'
  export default {
    props: {
      recommend: {
        type: Object
      }
    },
    data () {
      return {
        t1: null,
        comicsarr: []
      }
    },
    created() {
      this.$nextTick(() => {
        this.initiscroll()
        this.timer(true)
      })
    },
    computed: {
      ...mapGetters(['gethistory', 'getisnull', 'getshow', 'getisfocus']),
      showdelete(){
        return this.gethistory.length > 0 ? true : false
      }
    },
    methods: {
      ...mapMutations(['ADD_HISTORY', 'IS_SHOW', 'DELETE_ALLHISTORY', 'DELETE_ONEHISTORY', 'SHOW_COMICS']),
      ...mapActions(['timer']),
      addhistory(){
        if (this.$refs.input.value.trim()) {
          this.ADD_HISTORY(this.$refs.input.value.trim())
          this.search(this.$refs.input.value.trim())
          this.$refs.input.value = null
        } else {
          this.IS_SHOW(121)
          let then = this
          setTimeout(function () {
            then.IS_SHOW()
          }, 2000)
        }
        this.timer(false)
      },
      initiscroll(){
        if (this.$refs.history) {
          this.historyScroll = new IScroll(this.$refs.history, {
            tap: true
          })
          let th = this
          setTimeout(function () {
            th.historyScroll.refresh();
          }, 0)
        }
        if (this.$refs.comics) {
          this.comicsScroll = new IScroll(this.$refs.comics, {
            tap: true
          })
          let th = this
          setTimeout(function () {
            th.comicsScroll.refresh();
          }, 0)
        }
      },
      deleteonehistory(index){
        if (this.t1 == null) {
          this.t1 = new Date().getTime();
        } else {
          var t2 = new Date().getTime();
          if (t2 - this.t1 < 100) {
            this.t1 = t2;
            return;
          } else {
            this.t1 = t2;
          }
        }
        /*自己的代码*/
        this.DELETE_ONEHISTORY(index)
      },
      search(value){
        let valuearr = value.split('')
        let is = false
        let comicsarr = []
        for (let i = 0; i < this.recommend.lists.length; i++) {
          let lists = this.recommend.lists[i]
          if (lists.obj_type == 2) {
            for (let j = 0; j < lists.comics.length; j++) {
              let namearr = lists.comics[j].name.split('')
              for (let q = 0; q < namearr.length; q++) {
                for (let w = 0; w < valuearr.length; w++) {
                  if (namearr[q] == valuearr[w]) {
                    is = true
                    if (comicsarr.length > 0) {
                      for (let r = 0; r < comicsarr.length; r++) {
                        if (comicsarr[r].name == lists.comics[j].name) {
                          break
                        } else {
                          comicsarr.push(lists.comics[j])
                          break
                        }
                      }
                    } else {
                      comicsarr.push(lists.comics[j])
                    }
                    break
                  }
                }
              }
            }
          }
        }
        if (is) {
          this.comicsarr = comicsarr
          this.SHOW_COMICS(!is)
        } else {
          this.SHOW_COMICS(!is)
        }
      },
      clicktext(val){
        if (this.t1 == null) {
          this.t1 = new Date().getTime();
        } else {
          var t2 = new Date().getTime();
          if (t2 - this.t1 < 100) {
            this.t1 = t2;
            return;
          } else {
            this.t1 = t2;
          }
        }
        this.$refs.input.blur()
        this.search(val)
        this.timer(false)
      },
      inputblur(){
        if (this.t1 == null) {
          this.t1 = new Date().getTime();
        } else {
          var t2 = new Date().getTime();
          if (t2 - this.t1 < 100) {
            this.t1 = t2;
            return;
          } else {
            this.t1 = t2;
          }
        }
        this.$refs.input.blur()
      }
    },
    watch: {
      gethistory(nv){
        if (nv.length > 0) {
          this.initiscroll()
        }
      },
      getisfocus(nv){
        this.initiscroll()
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>
  .search {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #ffffff;
    z-index: 150;
    .title {
      display: flex;
      padding: 10px 0;
      height: 30px;
      width: 100%;
      border-bottom: 1px solid #dbdbdb;
      .superior {
        flex: 0 0 20px;
        padding-left: 10px;
        height: 100%;
        font-size: 30px;
        font-weight: bold;
      }
      .input {
        flex: 1;
        input {
          padding-left: 10px;
          outline:none;
          width: 100%;
          height: 100%;
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          box-sizing: border-box;
          border: 1px solid #c0c0c0;
          caret-color:#c7e299;
          font-size: 12px;
          font-weight: 500;
          color: #5c5c5c;
        }
      }
      .button {
        flex: 0 0 50px;
        height: 100%;
        margin-right: 10px;
        background-color: #c7e299;
        text-align: center;
        font-size: 12px;
        line-height: 30px;
        color: #ffffff;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        .icon-search {
          font-size: 14px;
          vertical-align: text-top;
        }
      }
    }
    .record {
      position: absolute;
      top: 51px;
      height: 70%;
      width: 100%;
      z-index: 500;
      .lis {
        max-height: 30%;
        overflow: hidden;
        background-color: #ffffff;
        ul {
          width: 100%;
          .history {
            display: flex;
            padding: 10px;
            border-bottom: 1px solid #dbdbdb;
            .text {
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .btn {
              flex: 0 0 12px;
              display: inline-block;
              font-size: 12px;
              line-height: 16px;
            }
          }
        }
      }
      .delete {
        padding: 10px 0 10px 10px;
        text-align: center;
        font-size: 12px;
        color: #00a0dc;
        border-bottom: 1px solid #dbdbdb;
        background-color: #ffffff;
        &.init {
          color: #b0b0b0;
          font-size: 12px;
        }
      }
    }
    .isnull {
      position: absolute;
      bottom: 50px;
      text-align: center;
      width: 100%;
      height: 55px;
      z-index: 1000;
      span {
        display: inline-block;
        width: 80px;
        height: 20px;
        opacity: 0.5;
        filter: alpha(Opacity=50);
        -moz-opacity: 0.5;
        line-height: 20px;
        background-color: #000;
        color: #fff;
        font-size: 12px;
        border-radius: 5px;
      }
    }
    .comics-list {
      position: absolute;
      top: 51px;
      bottom: 0;
      width: 100%;
      z-index: 200;
      background-color: #fff;
      overflow: hidden;
      transition: all 0.5s;
      &.comics-enter, &.comics-leave-to {
        opacity: 0;
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
    .box {
      margin-top: 100px;
      width: 100%;
      color: #8f8f8f;
      font-weight: bold;
      text-align: center;
    }
  }
</style>
