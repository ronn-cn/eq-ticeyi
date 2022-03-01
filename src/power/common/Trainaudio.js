export default {
  data () {
    return {
      audio_1: null,
    }
  },
  methods: {
    //音频
    playAudio () {
      if (this.audio_1) {
        this.audio_1.pause()
        this.audio_1 = null
      }
      this.audio_1 = new Audio()
      this.audio_1.src = `${this.publicPath}powerStatic/audio/首页/1RM值测试.mp3`
      this.audio_1.play()
    }
    //开始训练音频
    // initStart () {
    //   this.audio_free = new Audio()
    //   this.audio_free.src = `${this.publicPath}powerStatic/audio/首页/07开始训练.mp3`
    //   this.audio_free.play()
    // },
  }
}