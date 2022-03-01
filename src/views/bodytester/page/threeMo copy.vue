<style scoped lang="scss"></style>

<template>
  <div>123</div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.loadMo()
  },
  methods: {
    loadMo() {
      this.scene = new THREE.Scene()

      const loader = new GLTFLoader()
      loader.load(
        '/glb/体测仪模型.glb',
        (gltf) => {
          this.scene.add(gltf.scene)
        },
        undefined,
        undefined
      )
    },
  },
}
</script>
