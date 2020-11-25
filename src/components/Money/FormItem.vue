<template>
      <label class="formItem">
        <span class="name">{{this.filedName}}</span>
        <input 
        v-model="value" 
        type="text" 
        :placeholder="this.placeholder"
        >
      </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component,Prop,Watch } from 'vue-property-decorator';
  @Component
  export default class FormItem extends Vue{
    @Prop({required:true}) filedName!: string
    @Prop(String) placeholder?: string
    @Prop(String) content!: string
    value = ''
    @Watch('value')
    onValueChange(value: string){
      this.$emit('update:content',value);
    }
    @Watch('content')
    onContentChanged(){
      this.value = this.content;
    }
  }

</script>

<style lang="scss" scoped>
 .formItem {
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    .name {
      padding-right: 16px;
    }
    input {
      height: 40px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>