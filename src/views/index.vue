<template>
  <div class="page-container">
    <div class="sidebar-menu toggle-others fixed">
      <div class="sidebar-menu-inner">
        <header class="logo-env">
          <!-- logo -->
          <div class="logo">
            <a href="https://heroxin.xyz" class="logo-expanded">
              <img src="../assets/images/logo@2x.png" width="100%" alt="" />
            </a>
            <a href="javascript:void(0)" class="logo-collapsed">
              <img src="../assets/images/logo-collapsed@2x.png" width="40" alt="" />
            </a>
          </div>
          <div class="mobile-menu-toggle visible-xs">
            <a href="javascript:void(0)" data-toggle="user-info-menu">
              <i class="linecons-cog"></i>
            </a>
            <a href="javascript:void(0)" data-toggle="mobile-menu">
              <i class="fa-bars"></i>
            </a>
          </div>
        </header>
        <!-- 侧边栏 -->
        <ul id="main-menu" class="main-menu">
          <li v-for="(menu, idx) in items" :key="idx">
            <a :href="'#' + transName(menu)" class="smooth">
              <i :class="menu.icon"></i>
              <span class="title">{{ transName(menu) }}</span>
            </a>
            <ul v-if="menu.children">
              <li v-for="(submenu, idx) in menu.children" :key="idx">
                <a :href="'#' + transName(submenu)" class="smooth">
                  <span class="title">{{ transName(submenu) }}</span>
                  <span v-show="submenu.is_hot" class="label label-pink pull-right hidden-collapsed">Hot</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="https://heroxin.xyz">
              <i class="linecons-heart"></i>
              <span class="tooltip-blue">Heroxin</span>
              <span class="label label-Primary pull-right hidden-collapsed">♥︎</span>
            </a>

          </li>
          <!-- 关于本站 -->
          <!-- <li class="submit-tag">
            <router-link to="/about">
              <i class="linecons-heart"></i>
              <span class="tooltip-blue">关于本站</span>
              <span class="label label-Primary pull-right hidden-collapsed"
                >♥︎</span
              >
            </router-link>
          </li> -->
        </ul>
      </div>
    </div>

    <div class="main-content">
      <nav class="navbar user-info-navbar" role="navigation">
        <ul class="user-info-menu left-links list-inline list-unstyled">
          <li class="hidden-sm hidden-xs">
            <a href="javascript:void(0)" data-toggle="sidebar"><i class="fa-bars"></i></a>
          </li>
          <li class="dropdown hover-line language-switcher">
            <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
              <img :src="lang.flag" /> {{ lang.name }}
            </a>
            <ul class="dropdown-menu languages">
              <li :class="{ active: langItem.key === lang.key }" v-for="langItem in langList" :key="langItem.key">
                <a href="javascript:void(0)" @click="lang = langItem">
                  <img :src="langItem.flag" /> {{ langItem.name }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="user-info-menu right-links list-inline list-unstyled">
          <li class="hidden-sm hidden-xs">
            <a href="https://heroxin.xyz" target="_blank">
              <i class="fa-home"></i> Home
            </a>
          </li>
          <li class="hidden-sm hidden-xs">
            <a href="https://github.com/heroxin-59/heroxin-nav" target="_blank">
              <i class="fa-github"></i> GitHub
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <el-row style="display: flex; justify-content: center;">
          <el-col :span="12">
            <el-input placeholder="请输入查找的内容..." v-model="searchText" @keyup.enter.native="searchClick" class="">
              <el-select v-model="searchEngine" slot="prepend" placeholder="搜索引擎">
                <el-option v-for="item in iconList" :key="item.id" :value="item.id">
                  <img :src="item.icon" style="width: 16px; height: 16px; vertical-align: text-bottom;">&nbsp;&nbsp;{{ item.name }}
                </el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div v-for="(item, idx) in items" :key="idx">
        <div v-if="item.web">
          <WebItem :item="item" :transName="transName" />
        </div>
        <div v-else v-for="(subItem, idx) in item.children" :key="idx">
          <WebItem :item="subItem" :transName="transName" />
        </div>
      </div>

      <Footer />
    </div>
  </div>
</template>

<script>
import WebItem from "../components/WebItem.vue";
import Footer from "../components/Footer.vue";
import itemsData from "../assets/data.json";
import { loadJs } from '../assets/js/app.js'

export default {
  name: "Index",
  components: {
    WebItem,
    Footer,
  },
  data() {
    return {
      searchText: '',
      searchEngine: '',
      items: itemsData,
      lang: {},
      langList: [
        {
          key: "zh",
          name: "简体中文",
          flag: "./assets/images/flags/flag-cn.png",
        },
        {
          key: "en",
          name: "English",
          flag: "./assets/images/flags/flag-us.png",
        },
      ],
      iconList:[
        {id: 'bing', name: 'Bing',icon: 'https://static.monknow.com/newtab/searcher/ceb6c985-d09c-4fdc-b0ea-b304f1ee0f2d.svg'},
        // {id: 'google', name: 'Google',icon: 'https://static.monknow.com/newtab/searcher/e58b5a00-74fe-4319-af0a-d4999565dd71.svg'},
        // {id: 'baidu', name: '百度',icon: 'https://static.monknow.com/newtab/searcher/0eb43a90-b4c7-43ce-9c73-ab110945f47d.svg'},
        {id: 'bilibili', name: '哔哩哔哩',icon: 'https://www.bilibili.com/favicon.ico'},
        {id: 'zhihu', name: '知乎',icon: 'https://static.zhihu.com/heifetz/favicon.ico'},
        {id: 'csdn', name: 'CSDN',icon: 'https://g.csdnimg.cn/static/logo/favicon32.ico'},
        {id: 'kugou', name: '酷狗音乐',icon: 'https://www.kugou.com/root/favicon.ico'},
      ],
    };
  },
  created() {
    this.lang = this.langList[0];
    loadJs();
  },
  methods: {
    transName(webItem) {
      return this.lang.key === "en" ? webItem.en_name : webItem.name;
    },
    searchClick(){
      if(!this.searchText){
        return
      }
      switch (this.searchEngine) {
        case 'google':
          window.open('https://www.google.com/search?ie=utf-8&q=' + this.searchText , '_blank');
          break;
        case 'baidu':
          window.open('https://www.baidu.com/s?wd=' + this.searchText , '_blank');
          break;
        case 'bing':
          window.open('https://cn.bing.com/search?q=' + this.searchText , '_blank');
          break;
        case 'zhihu':
          window.open('https://www.zhihu.com/search?type=content&q=' + this.searchText , '_blank');
          break;
        case 'bilibili':
          window.open('https://search.bilibili.com/all?keyword=' + this.searchText , '_blank');
          break;
        case 'csdn':
          window.open('https://so.csdn.net/so/search?q=' + this.searchText , '_blank');
          break;
        case 'kugou':
          window.open('https://www.kugou.com/yy/html/search.html#searchType=song&searchKeyWord=' + this.searchText , '_blank');
          break;
        default:
          window.open('https://cn.bing.com/search?q=' + this.searchText , '_blank');
      }
    },
  },
};
</script>

<style></style>
