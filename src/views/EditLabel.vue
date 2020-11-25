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
    import tagListModel from '@/Models/tagListModel.ts';
    import FormItem from '@/components/Money/FormItem.vue';
    import Button from '@/components/Button.vue';


@Component({components:{FormItem,Button}})
    export default class EditLabel extends Vue {
        tag: Tag|undefined
        created(){
            const id = this.$route.params.id;
            tagListModel.fetch();
            const tag = tagListModel.data.filter(item => item.id === id)[0];
            if(tag){
               this.tag = tag;
            }else{
                this.$router.replace('/404');
            }
        }
        removeTag(){
            const tagId = this.$route.params.id;
            const result = tagListModel.remove(tagId)    
            if(result){
                window.alert('删除成功')
                this.$router.back();
            }else{
                window.alert('删除失败')
            }

        }
        update(tagName: string){
            if(this.tag){
                const result = tagListModel.update(this.tag.id,tagName);
                if(result === 'success'){
                    this.tag.name = tagName;
                    window.alert('修改成功');
                }else if(result === 'duplicated'){
                    window.alert('标签名已经存在');
                }else{
                    window.alert('标签不存在');
                }
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