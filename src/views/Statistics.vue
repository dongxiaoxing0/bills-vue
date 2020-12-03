<template>
<Layout>
    <div>
        <Tabs :dataSource="typeList" :selectedValue.sync="typeValue" :classPrefix="'type'" />
        <ol v-if="result.length !== 0">
            <li v-for="group in result" :key="group.title">
                <h2 class="title">{{titleFormat(group.title)}}<span>{{group.total}}</span></h2>
               <ol>
                   <li class="record" v-for="item in group.items" :key="item.createdAt">
                       <span>{{tagString(item.tags)}}</span>
                       <span class="notes">{{item.notes}}</span>
                       <span>￥{{item.amount}}</span>
                    </li>
               </ol>
            </li>
        </ol>
        <p v-else class="none">
            目前没有记录
        </p>
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
        get recordList(){
            return (this.$store.state as MyState).recordList;
        }
        get result(){
            const {recordList} = this;
            if(recordList.length === 0){return [];}
            const copy: RecordItem[] = JSON.parse(JSON.stringify(recordList));
            const sortList = 
                copy.filter(item => item.type === this.typeValue)
                    .sort((x: RecordItem,y: RecordItem) => dayjs(y.createdAt).valueOf() - dayjs(x.createdAt).valueOf());
            if(sortList.length === 0){return [];}
            const result: {title: string;total: number;items: RecordItem[]}[] = [];
            result.push({title:(sortList[0].createdAt)!,total:0,items:[sortList[0]]});
            for(let i = 1; i < sortList.length; i++){
                const current = sortList[i];
                const last = result[result.length-1];
                if(dayjs(current.createdAt).isSame(dayjs(last.title),'day')){
                    last.items.push(current);
                }else{
                    result.push({title:current.createdAt!,total:0,items:[current]});
                }
            }
            result.map(item => item.total = item.items.reduce((sum,value) => sum + value.amount,0))

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
        background-color: #c4c4c4;
        > li.type-tab-item.selected{
            background-color:#fff;
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
  .none{
      text-align: center;
      padding-top:10px;
  }
</style>