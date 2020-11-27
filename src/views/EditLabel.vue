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
            :content="this.tag.name"
            @update:content="update"
            />
        </div>
        <div class="button-wrapper">
            <Button @click.native="removeTag">删除标签</Button>
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
        created(){
            const id = this.$route.params.id;
            this.$store.commit('fetchTags');
            const tags = this.$store.state.tagList;
            console.log(tags)
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
        }
        removeTag(){
            const tagId = this.$route.params.id;
            this.$store.commit('removeTag',tagId);
            console.log(1)
            this.$router.back();
            console.log(2)
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
  }

</style>