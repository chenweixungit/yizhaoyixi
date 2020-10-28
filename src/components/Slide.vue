<template>
  <div id="drag-box">
    <drag-verify
      :width="width"
      :height="height"
      :text="text"
      :success-text="successText"
      :background="background"
      :progress-bar-bg="progressBarBg"
      :completed-bg="completedBg"
      :handler-bg="handlerBg"
      :handler-icon="handlerIcon"
      :text-size="textSize"
      :success-icon="successIcon"
      ref="Verify"
      class="slide-right"
    >
    </drag-verify>
  </div>
</template>

<script>
import dragVerify from 'vue-drag-verify'
export default {
  name: 'SlideComponent',
  components: {
    dragVerify
  },
  data () {
    return {
      handlerIcon: 'fa fa-angle-double-right',
      successIcon: 'fa fa-check',
      background: '#cccccc',
      progressBarBg: '#4b0',
      completedBg: '#66cc66',
      handlerBg: '#fff',
      text: '请将滑块拖动到右侧',
      successText: '验证成功',
      width: 250,
      height: 30,
      textSize: '14px',
      isCircle: 'true'
    }
  },
  methods: {
    con () {
      // 这里判断是否完成验证。使用元素获取其中的。isPassing:
      console.log(this.$refs.Verify.isMoving)
      console.log(this.$refs.Verify.isPassing)
      console.log(this.$refs.Verify.handlerIconClass)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .slide-right
    margin 0 auto
</style>
