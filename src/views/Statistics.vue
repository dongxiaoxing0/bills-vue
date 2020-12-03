<template>
<Layout>
    <div>
        <Tabs :dataSource="typeList" :selectedValue.sync="typeValue" :classPrefix="'type'" />
        <Tabs :dataSource="intervalList" :selectedValue.sync="intervalValue" :classPrefix="'interval'" />
        <ol>
            <li v-for="group in result" :key="group.title">
                <h2 class="title">{{titleFormat(group.title)}}</h2>
               <ol>
                   <li class="record" v-for="item in group.items" :key="item.createdAt">
                       <span>{{tagString(item.tags)}}</span>
                       <span class="notes">{{item.notes}}</span>
                       <span>￥{{item.amount}}</span>
                    </li>
               </ol>
            </li>
        </ol>
    </div>
</Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import dayjs from 'dayjs';

    @Component({
        components:{ Tabs }
    })
    export default class Statistics extends Vue {
        typeList = [
            {text:'支出',value:'-'},
            {text:'收入',value:'+'}
        ]
        typeValue = '-'
        intervalList = [
            {text:'按天',value:'day'},
            {text:'按周',value:'week'},
            {text:'按月',value:'month'},
        ]
        intervalValue = 'day'
        get recordList(){
            return (this.$store.state as MyState).recordList;
        }
        get result(){
            const {recordList} = this;
            const result: {[key: string]: {title: string;items: RecordItem[]}} = {}
            for(let i = 0; i < recordList.length; i++){
                const date = recordList[i].createdAt!.split('T')[0];
                result[date] = result[date] || {title:date,items:[]};
                result[date].items.push(recordList[i]);
            }
            return result;
        }
        beforeCreate(){
            this.$store.commit('fetchRecordList');
        }
        tagString(tags: Tag[]){
            const tagNames = tags && tags.map(item => item.name);
            return tagNames.length === 0 ? '无' : tagNames.join(',');
        }
        titleFormat(title: string){
            const day = dayjs(title);
            const now = dayjs();
            if(day.isSame(now,'day')){
                return '今天';
            }else if(day.isSame(now.subtract(1,'day'),'day')){
                return '昨天';
            }else if(day.isSame(now.subtract(2,'day'),'day')){
                return '前天';
            }else if(day.isSame(now,'year')){
                return day.format('M月D日');
            }else{
                return day.format('YYYY年M月D日');
            }
        }
    }
</script>

<style lang="scss" scoped>
::v-deep {
    .type-tabs{
        background-color: #fff;
        > li.type-tab-item.selected{
            background-color:#c4c4c4;
        }
        > li.selected::after{
            display:none;
        }
    }
    ul.interval-tabs > li.interval-tab-item{
        height:48px;
    }
}
%item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title {
    @extend %item;
  }
  .record {
    background: white;
    @extend %item;
  }
  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
</style>