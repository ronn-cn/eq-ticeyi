<style scoped lang="scss">
@import "~assets/css/power_home.scss";
.user_value {
  width: 86%;
  padding-left: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  &_item {
    position: relative;
    .up1 {
      font-size: 36px;
      margin-bottom: 12px;
    }
    .up2 {
      font-size: 24px;
    }
  }
  :nth-child(2).user_value_item::after {
    content: "";
    position: absolute;
    right: -44px;
    top: 10px;
    width: 3px;
    height: 60px;
    background: #fff;
  }
  :nth-child(2).user_value_item::before {
    content: "";
    position: absolute;
    left: -44px;
    top: 10px;
    width: 3px;
    height: 60px;
    background: #fff;
  }
}
</style>

<template>
  <div id="main_cover">
    <div class="home"
         v-if="!trainstatic">
      <div class="home_nav"
           v-show="!showCover">
        <div class="home_nav_qrcode"
             v-show="!loginState">
          <div class="qr_img"
               id="qrdiv"></div>
          <!-- <p class="p1">微信扫码登陆</p> -->
        </div>
        <div class="home_nav_qrcode"
             v-if="loginState">
          <div class="qrcode_avatar">
            <div class="avatar_img">
              <img :src="userInfo.user_avatar || ''"
                   alt="" />
            </div>
            <p class="p2">{{ userInfo.user_name || '' }}</p>
          </div>
          <div class="user_value">
            <div class="user_value_item">
              <p class="up1">{{ user_data.data.vitality || 0 }}</p>
              <p class="up2">活力</p>
            </div>
            <div class="user_value_item">
              <p class="up1">{{ user_data.data.sport_power || 0 }}</p>
              <p class="up2">运动力</p>
            </div>
            <div class="user_value_item">
              <p class="up1">{{ user_data.total.star_count || 0 }}</p>
              <p class="up2">获星总数</p>
            </div>
          </div>
        </div>
        <ul>
          <!-- <li @click="itemindex = 4" :class="{ active: itemindex == 4 }">
            <div class="home_icon"></div>
            训练计划
          </li> -->
          <li v-for="(item, index) of patternList"
              :class="{ active: itemindex == index }"
              @click="swichType(index), click_effects()"
              :key="item.id">
            <div class="home_icon">{{ item.iconText }}</div>
            {{ item.title }}
          </li>
          <li class="user_liout"
              @click="logout(), click_effects()"
              v-if="loginState">
            <div class="home_icon">x</div>
            退出账号
          </li>
        </ul>
      </div>
      <home-view :itemindex="itemindex"
                 @set_startStep="set_startStep"></home-view>
    </div>
  </div>
</template>

<script>
import HomeView from './HomeView.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import QRCode from 'qrcodejs2'
import TrainPage from './TrainPage.vue'
import homeAudio from '@/power/common/homeAudio.js'
export default {
  name: 'Home',
  components: { HomeView, TrainPage },
  mixins: [homeAudio],
  data () {
    return {
      show: false,
      showCover: false,
      itemindex: 0,
      patternList: [
        {
          id: 1,
          title: '标准模式',
          iconText: 'S',
        },
        {
          id: 2,
          title: '自由模式',
          iconText: 'F',
        },
        {
          id: 3,
          title: '力量测试',
          iconText: 'T',
        },
      ],
      userValueList: [
        {
          value: 93,
          text: '活力',
        },
        {
          value: 93,
          text: '运动力',
        },
        {
          value: 93,
          text: '获星总数',
        },
      ],
      _beforeUnload_time: '',
      trainstatic: false,
    }
  },
  created () { },
  mounted () {
    if (!this.loginState) {
      const userinfo = window.localStorage.getItem('userInfo')
      if (userinfo) {
        this.setLoginStatus(userinfo)
      } else {
        if (this.Qrcode) {
          this.init_qrcode(this.Qrcode)
        }
      }
    }
  },
  //离开页面
  destroyed: function () {
    this.send_askLedState({
      r: 0,
      g: 0,
      b: 0,
    })
  },
  computed: {
    ...mapGetters([
      'Qrcode',
      'loginState',
      'userInfo',
      'publicPath',
      'user_data',
    ]),
  },
  watch: {
    Qrcode (val) {
      this.init_qrcode(val)
    },
    loginState (val) {
      this.itemindex = null
      this.$nextTick(() => {
        this.itemindex = 0
      })
      if (!val) {
        this.init_qrcode(this.Qrcode)
      } else {
        this.all_user()
      }
    },
  },
  methods: {
    ...mapMutations(['setLoginStatus', 'set_MakeCareInfo', 'set_lesson_id']),
    ...mapActions(['logout', 'send_askLedState', 'all_user', 'click_effects']),
    //调用二维码
    init_qrcode (text) {
      let box = document.getElementById('qrdiv')
      var contentHeight = window.getComputedStyle(box).height
      let ipx = contentHeight.indexOf('px')
      let widthheight = contentHeight.slice(0, ipx)
      // console.log(contentHeight, contentHeight.slice(0, ipx))
      //这里是调用的方法
      const qrid = document.getElementById('qrdiv')
      if (qrid) {
        if (qrid.hasChildNodes()) {
          console.log('有')
        } else {
          let qrlogin = new QRCode('qrdiv', {
            width: widthheight, // 设置宽度
            height: widthheight, // 设置高度
            text,
          })
        }
      }
    },
    swichType (index) {
      this.itemindex = index
      if (this.itemindex == 0) {
        this.indexAudio('04标准模式')
      } else if (this.itemindex == 1) {
        this.indexAudio('15自由模式')
      } else {
        this.indexAudio('09力量测试')
      }
    },
    set_startStep (val) {
      // console.log('接受', val)
      this.showCover = val
    },
  },
}
</script>
