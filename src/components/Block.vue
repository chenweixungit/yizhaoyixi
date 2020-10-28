<template>
  <div id="block"><slot></slot></div>
</template>

<script>
export default {
  name: 'Block'
}
</script>

<style lang="stylus" scoped>
#block
  width 100%
  height 60px
</style>
