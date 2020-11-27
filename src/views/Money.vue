<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @new-record="updateRecordList"/>
    <Types :type.sync="record.type"/>
    <div class="notes">
      <FormItem filedName="备注"
                placeholder="请输入备注"
                :content.sync="record.notes"
      />
    </div>

    <Tags :currentSelectedTags.sync="record.tags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component,Watch } from 'vue-property-decorator';



  @Component({
  components: { NumberPad, Types, FormItem, Tags}
  })
  export default class Money extends Vue {
    record: RecordItem = {
      tags:[] as Tag[],
      notes:'',
      type:'-',
      amount: 0,
    }
    created(){
      this.$store.commit('fetchTagList');
      this.$store.commit('fetchRecordList');
    }
    updateRecordList(){
      this.$store.commit('createRecord',this.record);
      this.record.notes = '';
      this.record.tags = [];
    }
  }
  
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes{
    padding: 12px 0;
  }
</style>
