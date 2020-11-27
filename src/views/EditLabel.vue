<template>
    <Layout>
        <div class="navBar">
            <span @click="goBack"><Icon class="leftIcon" name="left" ></Icon></span>
            <span class="title">编辑标签</span>
            <span class="rightIcon"></span>
        </div>
        <div class="form-wrapper">
            <FormItem 
            filedName="标签名"
            placeholder="请输入标签名"
            :content="tag.name"
            @update:content="newName = $event"
            />
        </div>
        <div class="button-wrapper">
            <Button class="buttons" @click.native="update(newName)">保存标签</Button>
            <Button :class-prefix="'editlabel'" class="buttons" @click.native="removeTag">删除标签</Button>
        </div>
    </Layout>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import FormItem from '@/components/Money/FormItem.vue';
    import Button from '@/components/Button.vue';


    @Component({
        components:{FormItem,Button}
    })
    export default class EditLabel extends Vue {
        tag: Tag|undefined
        newName: string|undefined
        get tags(){
            return this.$store.state.tagList;
        }
        created(){
            const id = this.$route.params.id;
            this.$store.commit('fetchTagList');
            const tags = this.$store.state.tagList;
            let tag: Tag|undefined;
            if(!tags){
                this.$router.replace('/404');
            }else{
                tag = tags.filter((item: Tag) => item.id === id)[0];
            }
            if(tag){
               this.tag = tag;
            }else{
                this.$router.replace('/404');
            }
            if(this.tag){
                this.newName = this.tag.name;
            } 
        }
        removeTag(){
            const tagId = this.$route.params.id;
            this.$store.commit('removeTag',tagId);
            this.$router.back();
        }
        update(tagName: string){
                if(this.tag){
                this.$store.commit('updateTag',{id:this.tag.id,name:tagName});
                }
        }
        goBack(){
            this.$router.back();
        }
    }
</script>

<style lang="scss" scoped>
 .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
      .leftIcon {
      width: 24px;
      height: 24px;
    }
    > .rightIcon {
      width: 24px;
      height: 24px;
    }
  }
  .form-wrapper{
    background: white;
    margin-top: 8px;
  }
  .button-wrapper{
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
    > .buttons{
        margin:0 10px;
    }
    > button.editlabel-button{
    background: darken(red,15%);
  }
  }

</style>