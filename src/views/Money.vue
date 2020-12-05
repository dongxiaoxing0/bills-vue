<template>
  <Layout class-prefix="layout" :style="{height:h+'px'}">
    <NumberPad :value.sync="record.amount" @new-record="updateRecordList"/>
    <Tabs :dataSource="typeList" :selectedValue.sync="record.type" />
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
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component,Watch } from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';



  @Component({
  components: { NumberPad, FormItem, Tags, Tabs}
  })
  export default class Money extends Vue {
    typeList = [
            {text:'支出',value:'-'},
            {text:'收入',value:'+'}
        ]
    record: RecordItem = {
      tags:[] as Tag[],
      notes:'',
      type:'-',
      amount: 0,
    }
    h: number|undefined = undefined
    beforCreated(){
      this.h = document.body.clientHeight; 
    }
    created(){
      this.$store.commit('fetchTagList');
      this.$store.commit('fetchRecordList');
    }
    updateRecordList(){
      this.$store.commit('createRecord',this.record);
      if(this.$store.state.createRecordError === null){
        this.record.notes = '';
        this.record.tags = [];
        this.record.amount = 0;
      }
    }
  }
  
</script>

<style lang="scss" scoped>
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes{
    padding: 12px 0;
  }
</style>
