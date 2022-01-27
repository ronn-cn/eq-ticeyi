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
    pagetype: {
      type: [Number, String],
    },
  },
  data() {
    return {
      audiosrc: '',
      audio_a: null,
      // audio_a: null,
      // audio_a: null,
      audioList: [],
      scoreList: [
        { type: 'A', num: 0 },
        { type: 'B', num: 0 },
        { type: 'C', num: 0 },
        { type: 'D', num: 0 },
      ],
      encourageList: [],
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
    weightList() {
      const data = this.audioList.slice(4, this.audioList.length)
      return data
    },
  },
  watch: {
    cuetoneText(val) {
      if (this.pagetype == 1) {
        switch (val[0]) {
          case 1:
            this.play_audioA(val)
            break
          case 2:
            this.play_audiob(val)
            break
          case 3:
            this.play_audiob(val)
            break
          case 4:
            this.play_audioA(val)
            break
        }
      } else {
        switch (val[0]) {
          case 0:
            this.play_audioA(val)
            break
          case 2:
            this.play_audiob(val)
            break
          case 3:
            this.play_audiob(val)
            break
          case 4:
            this.play_audioA(val)
            break
        }
      }
    },
    recordScore: {
      handler(val) {
        console.log(val)
        // console.log(this.audioList)
        this.scoreList.map((item, index) => {
          if (item.type == val.score) {
            item.num += 1
            if (item.num == 4) {
              item.num = 0
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
      this.$axios
        .get(`${this.publicPath}powerStatic/js/poweraudio.json`)
        .then((res) => {
          const info = res.data.filter(
            (item) => item.equipment == this.projecttype
          )
          this.audioList = info[0].audioKVs
          this.encourageList = res.data[0].encourage
        })
    },
    initStart() {
      this.audio_a = new Audio()
      this.audio_a.src = `${this.evenfPublic}fd57a4b1acfa40a665a28686d746789e/audio/首页/07开始训练.mp3`
      this.audio_a.play()
    },
    //激励话术
    play_encourage(score) {
      let data = this.encourageList

      let playList = data[`${score}`]
      let encourageUrl = playList[Math.floor(Math.random() * playList.length)]
      if (!this.audio_a) {
        this.audio_a = new Audio()
      }
      this.audio_a.src = `${this.evenfPublic}fd57a4b1acfa40a665a28686d746789e/audio/激励话术/${score}/${encourageUrl}.mp3`
      this.audio_a.play()
    },
    //热身与辅助
    play_audioA(val) {
      const index = { 1: 0, 5: 1, 10: 2, 15: 3 }
      if (index[`${val[1]}`]) {
        let i = index[`${val[1]}`]
        let playsrc = this.audioList[i].number
        if (!this.audio_a) {
          this.audio_a = new Audio()
        }
        this.audio_a.src = `${this.evenfPublic}fd57a4b1acfa40a665a28686d746789e/audio/${this.projecttype}/话术弹框/${playsrc}.mp3`
        this.audio_a.play()
      }
    },
    //负重与金字塔组音频
    play_audiob(val) {
      let data = this.weightList
      if (val[1] % 3 == 0) {
        let playurl1 = data[Math.floor(Math.random() * data.length)]

        if (!this.audio_a) {
          this.audio_a = new Audio()
        }
        this.audio_a.src = `${this.evenfPublic}fd57a4b1acfa40a665a28686d746789e/audio/${this.projecttype}/话术弹框/${playurl1.number}.mp3`
        this.audio_a.play()
      }
    },
  },
}
</script>
