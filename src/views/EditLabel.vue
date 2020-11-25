<template>
    <Layout>
        <div class="edit">
            <Icon name="left"></Icon>
            <span>编辑</span>
        </div>
        <Notes 
        filedName="标签名"
        placeholder="请输入标签名"
        ></Notes>
    </Layout>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import tagListModel from '@/Models/tagListModel.ts';
    import Notes from '@/components/Money/Notes.vue';

    @Component({components:{Notes}})
    export default class EditLabel extends Vue {
        created(){
            const id = this.$route.params.id;
            tagListModel.fetch();
            const tag = tagListModel.data.filter(item => item.id === id)[0];
            if(tag){
                console.log(tag);
            }else{
                this.$router.replace('/404');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>