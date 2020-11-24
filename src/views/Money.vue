<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @new-record="updateRecordList"/>
    <Types :type.sync="record.type"/>
    <Notes :notes-content.sync="record.notes"/>
    <Tags :data-source.sync="tags" :selectedTags="record.tags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component,Watch } from 'vue-property-decorator';
  import model from '@/model.ts';


  const recordList = model.fetch();

  @Component({
  components: { NumberPad, Types, Notes, Tags},
  })
  export default class Money extends Vue {
    tags = ['衣','食','住','行','房租']
    record: RecordItem = {
      tags:[],
      notes:'',
      type:'-',
      amount: 0,
    }
    recordList: RecordItem[] = recordList
    updateRecordList(){
      const recordCopy = JSON.parse(JSON.stringify(this.record));
      recordCopy.createdAt = new Date();
      this.recordList.push(recordCopy);
      this.record.notes = ''
    }
    @Watch('recordList')
    onRecordListChange() {
      model.save(this.recordList);
    }
  }
  
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
