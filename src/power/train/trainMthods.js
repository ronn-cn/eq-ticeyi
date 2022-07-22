import { mapActions, mapGetters, mapMutations } from 'vuex'
import Format from '@/assets/js/Format'
export default {
  computed: {
    ...mapGetters([
      'actionValue',
      'coursegroup',
      'loginState',
      'user_rmvalue',
      'userInfo',   //
      'projecttype',
      'lesson_id',    //
      'powerEndData',
      'publicPath',   //公用路径
      'moloopval',    //下压的值
      'powerHieght', //器械下压最大高度
      'temporary',    //选择的啥
      'weight_rm'    //最大rm值
    ]),
  },
  methods: {
    ...mapMutations(['set_couserTimer', 'set_resGenerateLesson', 'SEND_SOCKET', 'set_resHeightWeight']),
    ...mapActions(['click_effects']),
    //时间计时
    timestart () {
      this.windowtimer = setInterval(() => {
        this.timeMeter += 0.1
        this.timevalue = Format.FormatTime(this.timeMeter.toFixed())
      }, 100)
    },
    //来个方法看看是否全部完成了
    isInComplete () {
      if (this.inCompleteNum == 0) {
        this.recordUpGroup()
      } else {
        this.recordUpGroup('未完成')
      }
      this.inCompleteNum = 0
    }
  }
}