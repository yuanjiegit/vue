<template>
  <div class="lists" ref="section">
    <ul class="section">
      <li class="header">
        <template>
          <slider :pages="pages" :sliderinit="sliderinit" v-if="pages" >
          </slider>
        </template>
      </li>
      <li v-for="(item,index) in recommend.lists" class="lis" :key="item.id">
        <div class="title">
          <span class="name" :class="{'other-name':item.obj_type==1}">{{item.name}}</span>
          <span class="right" @click="getIndex(index)" v-if="item.theme_info">更多&gt;&gt;</span>
        </div>
        <div class="allcomics" ref="allcomics">
          <ul class="allcomics-ul">
            <li v-for="(comics,index) in item.comics" :key="comics.id" class="comics" v-if="index<3">
              <div class="coverimg"><img :src="comics.cover_img"></div>
              <div class="comicsname">{{comics.name}}</div>
              <div class="last-volume">{{comics.last_volume}}</div>
            </li>
            <li v-for="theme in item.theme_list" :key="theme.id" class="theme"
                v-if="(item.obj_type == 1 && !item.theme_info)">
              <div class="cover"><img :src="theme.cover"></div>
              <span class="themename">{{theme.name}}</span>
            </li>
            <li v-for="theme in item.theme_list" :key="theme.id" class="group"
                v-if="(item.obj_type == 1 && item.theme_info)">
              <div class="cover"><img :src="theme.cover"></div>
              <span class="themename">{{theme.name}}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <More :lists="recommend.lists" :index="index" v-if="getshowmore"></More>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  import slider from 'vue-concise-slider'
  import More from '../more/More'
  import IScroll from 'iscroll/build/iscroll'
  export default {
    props: {
      recommend: {
        type: Object
      }
    },
    data() {
      return {
        index: 0,
        sliderinit: {
          currentPage: 0,
          thresholdDistance: 100,
          thresholdTime: 300,
          autoplay: 2000,
          loop: true,
          direction: 'horizontal',
          infinite: 1,
          slidesToScroll: 1,
        }
      }
    },
    created() {
      this.$nextTick(() => {
        this.initiscroll()
      })
    },
    methods: {
      ...mapMutations(['GET_ISSHOW']),
      initiscroll(){
        if (this.$refs.section) {
          this.sectionScroll = new IScroll(this.$refs.section, {
            click: true
          })
          let th = this
          setTimeout(function () {
            th.sectionScroll.refresh();
          }, 0)
        }
      },
      getpagesFn(){
        let banners = this.recommend.banners
        let arr = []
        let obj = {}
        let style1 = {}
        if (banners) {
          banners.forEach(f => {
            obj.title = ''
            style1.background = 'url(' + f.theme_info.cover + ')'
            obj.style = style1
            arr.push(obj)
            style1 = {}
            obj = {}
          })
          return arr
        }
      },
      getIndex(index){
        this.index = index
        this.GET_ISSHOW(!this.getshowmore)
      },
    },
    computed: {
      ...mapGetters(['getshowmore']),
      pages(){
        return this.getpagesFn()
      }
    },
    watch: {
      getshowmore(nv){
        if (nv) {
          if (this.sectionScroll) {
            this.sectionScroll.destroy()
            this.sectionScroll = null
          }
        } else {
          this.$nextTick(() => {
            this.initiscroll()
          })
        }
      }
    },
    components: {
      More,
      slider
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>
  .lists {
    position: absolute;
    top: 0;
    bottom: 0px;
    width: 100%;
    overflow: hidden;
    background-color: #eeeaeb;
    .section {
      position: absolute;
      top: 43px;
      /*bottom: 40px;*/
      padding: 10px 0;
      width: 100%;
      &:first-child {
        padding: 0;
      }
      .header {
        margin-bottom: 10px;
        .slider-container {
          width: 100%;
          margin: 0;
        }
        .slider-item{
          background-repeat:no-repeat !important;
          background-size: 100% 100% !important;
        }
      }
      .lis {
        padding: 0 10px;
        margin-bottom: 10px;
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        &:last-child {
          margin-bottom: 80px;
        }
        .title {
          margin-bottom: 10px;
          width: 100%;
          height: 30px;
          line-height: 30px;
          background-color: #fff;
          border-bottom: 1px solid #eeeaeb;
          .name {
            font-size: 14px;
            font-weight: 700;
            color: #a0cc56;
            &.other-name {
              color: red;
            }
          }
          .right {
            float: right;
            margin-right: 5px;
            font-size: 12px;
            color: #c3c3c3;
          }
        }
        .allcomics {
          width: 100%;
          .allcomics-ul {
            display: flex;
            width: 100%;
            overflow: hidden;
            .comics {
              flex: 0 0 32%;
              margin-right: 2%;
              margin-bottom: 10px;
              overflow: hidden;
              &:last-child {
                margin-right: 0px;
              }
              .coverimg {
                margin-bottom: 5px;
                width: 100%;
                img {
                  width: 100%;
                  border-radius: 5px;
                }
              }
              .comicsname {
                margin-bottom: 5px;
                font-size: 10px;
                color: #808080;
                white-space: nowrap;
              }
              .last-volume {
                font-size: 8px;
                color: #bebebe;
                white-space: nowrap;
              }
            }
            .theme {
              flex: 0 0 49%;
              overflow: hidden;
              margin-right: 2%;
              margin-bottom: 10px;
              &:last-child {
                margin-right: 0;
              }
              .cover {
                width: 100%;
                img {
                  width: 100%;
                  border-radius: 5px;
                }
              }
              .themename {
                font-size: 8px;
                color: #bebebe;
                white-space: nowrap;
              }
            }
            .group {
              flex: 0 0 49%;
              margin-right: 2%;
              margin-bottom: 10px;
              .cover {
                width: 100%;
                img {
                  width: 100%;
                  border-radius: 5px;
                }
              }
              .themename {
                font-size: 8px;
                color: #bebebe;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
</style>
