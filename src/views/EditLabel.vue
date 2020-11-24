<template>
    <Layout>
        <div class="edit">
            <Icon name="left"></Icon>
            <span>编辑</span>
        </div>

    </Layout>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import tagListModel from '@/Models/tagListModel.ts';

    tagListModel.fetch();

    @Component
    export default class EditLabel extends Vue {
        tags = tagListModel.data
    }
</script>

<style lang="scss" scoped>

</style>