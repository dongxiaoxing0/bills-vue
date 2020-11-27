<template>
    <button class="button" :class="classPrefix + '-button'"><slot/></button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop(String) classPrefix: string|undefined
}
</script>

<style lang="scss" scoped>
.button {
    background: #767676;
    color: white;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
    &-wrapper {
      text-align: center;
      padding: 16px;
      margin-top: 44-16px;
    }
  }

</style>