<!--THREEJS组件-->
<template>
  <div id="d3Container" ref="mainContent"> </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { mapGetters } from 'vuex'
// import tcymo from "../../../assets/glb/体测仪模型.glb"
export default {
  name: 'ThreePage',
  props: {
    /*模型资源地址*/
    ossPath: {
      type: String,
      default () {
        return ''
      },
    },
    /*文件类型*/
    suffix: {
      type: String,
      default () {
        return 'gltf'
      },
    },
    AutoFresh: {
      type: Boolean,
      default () {
        return true
      },
    },
    /*是否开启自动旋转*/
    autoAnimate: {
      type: Boolean,
      default () {
        return true
      },
    },
    /*当前模型的颜色*/
    currentColor: {
      type: String,
      default () {
        return ''
      },
    },
    /*配准后的颜色*/
    matchedColor: {
      type: String,
      default () {
        return ''
      },
    },
    /*配准后的地址*/
    matchedOssPatch: {
      type: String,
      default () {
        return ''
      },
    },
    showMatchWatch: {
      type: Boolean,
      default () {
        return false
      },
    },
  },
  data () {
    return {
      loading: false,
      // publicPath: process.env.BASE_URL,
      mesh: null,
      camera: null,
      scene: null,
      originX: 0,
      originY: 0,
      originZ: 20,
      renderer: null,
      controls: null,
    }
  },
  computed: {
    ...mapGetters(['publicPath']),
  },
  mounted () {
    this.init()
  },
  watch: {
    //监听地址变化时需要更新地址,防止多次点击同一个渲染多次;
    ossPath (val, oldVal) {
      if (val != oldVal) {
        this.init()
      }
    },
    //监测是否更新整个场景
    AutoFresh (val, oldVal) {
      if (val) {
        this.init()
      } else {
        //自我清理
        this.destroyed()
      }
    },
    //监测是否展示配准,更新场景,该属性的变化只负责更新场景，具体业务交给按钮的最终展现结果，按钮勾中就展示配准，没有勾中就不展示配准，属性没变就是原来的状态。
    showMatchWatch (val, oldVal) {
      this.init()
    },
    //由于上传标签时,CAD会绕过。
    currentColor (val, oldVal) {
      if (val != oldVal) {
        this.init()
      }
    },
  },
  //组件被销毁时,干掉所有3D资源；
  methods: {
    destroyed () {
      this.clear()
    },
    // 初始化
    init () {
      /*利用vue单项数据流的特性做最后的守卫,在最底层监听是否需要展示配准图,只影响该组件的内部数据而不影响外部的matchedOssPatch*/
      if (!this.showMatchWatch) {
        this.matchedOssPatch = ''
      }
      this.createScene() // 创建场景
      this.loadLoader() // 加载P模型
      this.createLight() // 创建光源
      this.createCamera() // 创建相机
      this.createRender() // 创建渲染器
      this.createControls() // 创建控件对象
      this.render() // 渲染
    },
    //清除当前所有场景
    clear () {
      this.mesh = null
      this.camera = null
      this.scene = null
      this.renderer = null
      this.controls = null
      cancelAnimationFrame(this.animationId)
      console.log('我要清除啦')
    },
    // 创建场景
    createScene () {
      // this.loading = true
      this.scene = new THREE.Scene()
      // var grid = new THREE.GridHelper(24, 24, 0xff0000, 0x444444)
      // grid.material.opacity = 0.4
      // grid.material.transparent = true
      // grid.rotation.x = Math.PI / 2.0
      // this.scene.add(grid)
    },

    // 加载PLY模型
    async loadLoader () {
      let loader = new GLTFLoader()
      // let path = `${this.publicPath}bodytesterStatic/glb/体测仪模型.glb`
      // let url = '../../../assets/glb/体测仪模型.glb'
      // console.log('111222', window.commonPublic)
      // let url = `${this.publicPath}bodytesterStatic/glb/体测仪模型.glb`
      // let url = 'http://test.shenqingtao.com/bodytesterStatic/glb/体测仪模型.glb'
      let url = 'https://www.evinf.cn/body_model.glb'
      // let url = window.commonPublic
      // console.log(url)
      await loader.load(
        url,
        (geometry) => {
          console.log('模型数据', geometry)
          this.$emit("loadtitle", url)
          // this.loading = false
          // this.isLoading = false;//关闭载入中效果
          this.mesh = geometry.scene
          this.mesh.scale.set(0.2, 0.12, 0.2) //设置大小比例
          this.mesh.position.set(0, 0, 0) //设置位置
          this.scene.add(this.mesh) // 将模型引入three、
          // this.animate();
        }
      )
      //如果有配准结果,加载配准结果,配准结果未ply格式;
    },
    // 创建光源
    createLight () {
      // 环境光
      let pointColor = '#ffffff'
      const ambientLight = new THREE.AmbientLight(0xffffff) // 创建环境光
      this.scene.add(ambientLight) // 将环境光添加到场景
      const spotLight = new THREE.SpotLight(0xffffff) // 创建聚光灯
      spotLight.position.set(50, 50, 50)
      spotLight.castShadow = true //平行光开启阴影
      spotLight.receiveShadow = true
      this.scene.add(spotLight)
    },

    // 创建相机
    createCamera () {
      // 摄像机
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
      // x横轴y纵轴z前后纵深
      this.camera.position.set(0, 15, 30)
      //相机看向哪个坐标
      this.camera.lookAt({ x: 0, y: 30, z: 0 })
      // this.camera.up.set(0, 0, 1)
      this.scene.add(this.camera)
    },
    // 创建渲染器
    createRender () {
      const element = this.$refs.mainContent
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      })
      this.renderer.setSize(element.clientWidth, element.clientHeight) // 设置渲染区域尺寸
      this.renderer.shadowMap.enabled = true // 显示阴影
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.renderer.setClearColor(new THREE.Color(0x2f3443)) // 设置背景颜色
      element.innerHTML = ''
      element.appendChild(this.renderer.domElement)
    },
    render () {
      this.controls.update()
      this.animationId = requestAnimationFrame(this.render) //旋转动画;
      this.renderer.render(this.scene, this.camera)
    },
    // 创建控件对象
    createControls () {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      this.controls.target = new THREE.Vector3(0, 0, 0)
      // this.controls.enablePan = false
      // this.controls.enableZoom = false
      // this.controls.enableRotate = false;
      // this.controls.rotateSpeed = 0.5
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 5;
      this.controls.screenSpacePanning = true
    },
    onWindowResize () {
      this.camera.aspect = this.aspect
      this.camera.updateProjectionMatrix()
    },
  },
}
</script>

<style scoped>
#d3Container {
  width: 100%;
  height: 100%;
  z-index: 888;
}
</style>
