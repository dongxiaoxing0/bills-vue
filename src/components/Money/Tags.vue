<template>
    <div class="tags">
      <div class="new">
        <button @click="create">新增标签</button>
      </div>
      <ul class="current">
        <li v-for="tag in tags"
        @click="toggle(tag)"
        :class="{selected:isSelected(tag.name)}"
        :key="tag.id"
        >{{tag.name}}</li>
      </ul>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component,Prop,Watch } from 'vue-property-decorator';
  
  @Component
  export default class Tags extends Vue {
    @Prop(Array)currentSelectedTags!: Tag[];
    selectedTags = this.currentSelectedTags;
    get tags(){
        return this.$store.state.tagList;
    }
    created(){
      this.$store.commit('fetchTagList');
    }
    isSelected(tagName: string){
      return this.selectedTags.filter(item => item.name === tagName)[0];
    } 
    toggle(tag: Tag){
      const value = this.isSelected(tag.name)
      if(value){
        this.selectedTags = this.selectedTags.filter(item => item.name !== tag.name);
      }else{
        this.selectedTags.push(tag);
      }
      this.$emit('update:selectedTags',this.selectedTags)
    }
    create(){
      const newTag = window.prompt('请输入标签名');
      if(newTag ===''){
        window.alert('标签不能为空');
      }else if(newTag === null){
        return
      }{
        this.$store.commit('createTag',newTag); 
      }
    }
    @Watch('currentSelectedTags')
    onCurrentSelectedTagsChange(){
      this.selectedTags = this.currentSelectedTags;
    }
  }

</script>

<style lang="scss" scoped>
  .tags {
    background-color: white;
    font-size: 14px;
    padding: 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;
    > .current {
      display: flex;
      flex-wrap: wrap;
      > li {
        $bg: #d9d9d9;
        background:$bg;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;
        &.selected{
          background: darken($bg,50%);
          color:white;
        }
      }
    }
    > .new {
      padding-top: 16px;
      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }
</style>