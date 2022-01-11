<template>
  <svg :viewBox="`0 0 ${2 * radius + srtokeWidth} ${radius + srtokeWidth}`">
    <path
      :d="`M ${srtokeWidth / 2} ${
        radius + srtokeWidth / 2
      } a ${radius} ${radius} 0 1 1 ${radius * 2} 0`"
      :stroke-width="srtokeWidth"
      :stroke="emptyColor"
      fill="none"
      stroke-linecap="round"
    ></path>
    <path
      :d="`M ${srtokeWidth / 2} ${
        radius + srtokeWidth / 2
      } a ${radius} ${radius} 0 1 1 ${radius * 2} 0`"
      :stroke-width="srtokeWidth"
      :stroke="valueColor"
      fill="none"
      stroke-linecap="round"
      :stroke-dasharray="strokeDasharray"
      :stroke-dashoffset="strokeDashoffset"
    >
      <animate
        attributeName="stroke-dashoffset"
        :dur="`${durTime}ms`"
        fill="freeze"
        :from="strokeDasharray"
        :to="strokeDashoffset"
      ></animate>
    </path>
  </svg>
</template>
<script>
export default {
  data() {
    return {
      defaultDurTime: 1200,
      defaultEmptyColor: '#EEEEEE',
      defaultNegativeColor: '#FF4456',
      defaultPositiveColor: '#56D5E4',
      defaultSrtokeWidth: 10,
      defaultRadius: 50,
    }
  },
  props: ['options', 'value'],
  computed: {
    durTime() {
      return this.options
        ? this.options.durTime || this.defaultDurTime
        : this.defaultDurTime
    },
    radius() {
      return this.options
        ? this.options.radius || this.defaultRadius
        : this.defaultRadius
    },
    emptyColor() {
      return this.options
        ? this.options.emptyColor || this.defaultEmptyColor
        : this.defaultEmptyColor
    },
    srtokeWidth() {
      return this.options
        ? this.options.srtokeWidth || this.defaultSrtokeWidth
        : this.defaultSrtokeWidth
    },
    valueColor() {
      if (this.value < 0) {
        return this.options
          ? this.options.negativeColor || this.defaultNegativeColor
          : this.defaultNegativeColor
      } else {
        return this.options
          ? this.options.positiveColor || this.defaultPositiveColor
          : this.defaultPositiveColor
      }
    },
    strokeDasharray() {
      return 3.1415926 * this.radius
    },
    strokeDashoffset() {
      return this.strokeDasharray - this.strokeDasharray * this.value
    },
  },
}
</script>
