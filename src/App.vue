<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

body{
  font-family:$font-hei;
  font-size:16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;

}
#app{
  max-width: 500px;
  margin: 0 auto;
  background: #f5f5f5;
}
@media (min-width:(500px)) {
  #app{
    border: 1px solid #f5f5f5;
  }
}
</style>
