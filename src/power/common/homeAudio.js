export default {
  data () {
    return {
      homeAudio: null
    }
  },
  methods: {
    indexAudio (index) {
      if (!this.homeAudio) {
        this.homeAudio = new Audio()
      }
      this.homeAudio.src = `${this.publicPath}powerStatic/audio/首页/${index}.mp3`
      this.homeAudio.play()
    },
  }
}