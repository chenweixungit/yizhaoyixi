<template>
  <el-card class="box-card"><slot></slot></el-card>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style lang="stylus" scoped>
.box-card
  width 1250px
  height 600px
  position relative
  left 100px
  border-radius 7px
</style>
