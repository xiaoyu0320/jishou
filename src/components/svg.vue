<!--  -->
<template>
  <div class="svg">
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enable-background="new 0 0 100 100"
      xml:space="preserve"
    >
      <rect
        fill="#4680f9"
        width="3"
        height="100"
        transform="translate(0) rotate(180 3 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="17"
        fill="#4680f9"
        width="3"
        height="100"
        transform="translate(0) rotate(180 20 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
          begin="0.1s"
        />
      </rect>
      <rect
        x="40"
        fill="#4680f9"
        width="3"
        height="100"
        transform="translate(0) rotate(180 40 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </rect>
      <rect
        x="60"
        fill="#4680f9"
        width="3"
        height="100"
        transform="translate(0) rotate(180 58 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
          begin="0.5s"
        />
      </rect>
      <rect
        x="80"
        fill="#4680f9"
        width="3"
        height="100"
        transform="translate(0) rotate(180 76 50)"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          dur="1s"
          values="30; 100; 30"
          repeatCount="indefinite"
          begin="0.1s"
        />
      </rect>
    </svg>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {}
}
</script>
<style lang="scss" scoped>
.svg {
  width: 20px;
  height: 20px;
  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
