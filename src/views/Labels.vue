<template>
<Layout>
    <div class="tags">
        <router-link 
        class="tag" 
        v-for="tag in tags" 
        :to="`/labels/editLabel/${tag.id}`"  
        :key="tag.id"
        >
            <span>{{tag.name}}</span>
            <Icon name="right" /> 
        </router-link>  
        
    </div>
    <div class="createTag-wrapper">
        <Button class="createTag" @click.native="createTag">新建标签</Button>
    </div>
</Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Button from '@/components/Button.vue';



    @Component({
        components:{Button},
        })
    export default class Labels extends Vue{
        get tags(){
                return this.$store.state.tagList;
            }

        created(){
            this.$store.commit('fetchTagList');
        }
        createTag(){
            const tagName = window.prompt('请输入标签名');
            if(tagName === ''){
                window.alert('标签名不能为空');
                return;
            }else if(tagName === null){
                return;
            }else{
                this.$store.commit('createTag',tagName);
                if(this.$store.state.createTagError){
                    if(this.$store.state.createTagError.message === 'tag name duplicated'){
                        window.alert('标签名已经存在');
                    }
                }else{
                    window.alert('创建成功');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;
    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      svg {
        width: 18px;
        height: 18px;
        color: #666;
        margin-right: 16px;
      }
    }
  }
  .createTag {
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