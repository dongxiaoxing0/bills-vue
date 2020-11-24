<template>
    <ul class="types">
        <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
        <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component,Prop,Watch} from 'vue-property-decorator';

  @Component
  export default class Types extends Vue{
    @Prop(String) type: string|undefined//'-'表示支出，'+'表示收入
    selectType(type: string){//type只能是'-'和'+'中的一个
      if(type !== '-' && type !== '+'){
        throw new Error('type is unknown');
      }else{
        this.type = type;
      }
    }
    @Watch('type')
    onTypeChange(value: string){
      this.$emit('update:type',value);
    }
  }
</script>

<style lang="scss" scoped>
  .types {
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;
    > li {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;
      }
    }
  }
</style>