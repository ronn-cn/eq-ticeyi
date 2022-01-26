<style scoped lang="scss"></style>

<template>
  <div>
    <audio ref="audio_A" preload="auto">
      <source :src="audiosrc" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    planstate: {
      type: [Number, String],
    },
    currentNum: {
      type: [Number, String],
    },
    recordScore: {
      type: Object,
    },
  },
  data() {
    return {
      audiosrc: '',
      audio_a: null,
      audio_b: null,
      audio_c: null,
      audioList: [],
      scoreList: [
        { type: 'A', num: 0 },
        { type: 'B', num: 0 },
        { type: 'C', num: 0 },
        { type: 'D', num: 0 },
      ],
    }
  },
  computed: {
    ...mapGetters(['publicPath', 'evenfPublic', 'projecttype']),
    audio_dom() {
      return this.$refs.audio_A
    },
    cuetoneText() {
      return [this.planstate, this.currentNum]
    },
  },
  watch: {
    cuetoneText(val) {
      switch (val[0]) {
        case 0:
          this.play_audioA(val)
          break
        case 1:
          console.log('')
          break
        case 2:
          this.play_audiob(val)
        case 3:
          this.play_audiob(val)
          break
        case 4:
          this.play_audioA(val)
          break
      }
    },
    currentNum(val) {
      // console.log(this.planstate, val)
    },
    recordScore: {
      handler(val) {
        // console.log(val)
        // console.log(this.audioList)
        this.scoreList.map((item) => {
          if (item.type == val.score) {
            item.num += 1
            if (item.num == 4) {
              console.log('播放,然后清空')
              switch (val.score) {
                case 'A':
                  this.play_encourage('A')
                  break
                case 'B':
                  this.play_encourage('B')
                  break
                case 'C':
                  this.play_encourage('C')
                  break
                case 'D':
                  this.play_encourage('D')
                  break
              }
            }
          } else {
            item.num = 0
          }
        })
        // console.log(this.scoreList)
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    this.Render()
    if (this.planstate == 0) {
      this.initStart()
    }
  },
  unmounted: function () {},
  methods: {
    //准备
    Render() {
      // this.audio_dom.play()
      this.$axios
        .get(`${this.publicPath}powerStatic/js/audio.json`)
        .then((res) => {
          const info = res.data.filter((item) => item.type == this.projecttype)
          console.log(info[0].data)
          this.audioList = info[0].data
        })
    },
    //背景音乐
    back_music(name) {
      this.audio_music = new Audio()
      this.audio_music.src = ''
      this.audio_music.play()
      this.audio_music.volume = 0.6
    },
    initStart() {
      this.audio_a = new Audio()
      this.audio_a.src = `${this.evenfPublic}fd57a4b1acfa40a665a28686d746789e/audio/首页/07开始训练.mp3`
      this.audio_a.play()
    },
    //激励话术
    play_encourage(score) {
      let data = this.audioList[2]
      let playList = data[`${score}`]
      let encourageUrl = playList[Math.floor(Math.random() * playList.length)]
      if (!this.audio_c) {
        this.audio_c = new Audio()
      }
      this.audio_c.src = `${this.evenfPublic}fd57a4b1acfa40a665a28686d746789e/audio/激励话术/${score}/${encourageUrl}.mp3`
      this.audio_c.play()
    },
    //热身与辅助
    play_audioA(val) {
      if (this.audio_c) {
        this.audio_c.pause()
      }
      // const index = { 1: 0, 5: 1, 10: 2, 15: 3 }
      // if(index[`${val[1]}`]){

      // }
      let info = this.audioList[0]

      if (info[`${val[1]}`]) {
        // console.log(info[`${val[1]}`])
        let playsrc = info[`${val[1]}`]

        if (!this.audio_a) {
          this.audio_a = new Audio()
        }
        this.audio_a.src = `${this.evenfPublic}fd57a4b1acfa40a665a28686d746789e/audio/${this.projecttype}/话术弹框/${playsrc}.mp3`
        this.audio_a.play()
      }
    },
    //负重与金字塔组音频
    play_audiob(val) {
      if (this.audio_c) {
        this.audio_c.pause()
      }
      let data = this.audioList[1]
      if (val[1] % 3 == 0) {
        // console.log(data[Math.floor(Math.random() * data.length)])
        let playurl1 = data[Math.floor(Math.random() * data.length)]
        if (!this.audio_b) {
          this.audio_b = new Audio()
        }
        this.audio_b.src = `${this.evenfPublic}fd57a4b1acfa40a665a28686d746789e/audio/${this.projecttype}/话术弹框/${playurl1}.mp3`
        this.audio_b.play()
      }
    },
  },
}
</script>
