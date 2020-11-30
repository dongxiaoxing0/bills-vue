<template>
<Layout>
    <div>
        <Tabs :dataSource="typeList" :selectedValue.sync="typeValue" :classPrefix="'type'" />
        <Tabs :dataSource="intervalList" :selectedValue.sync="intervalValue" :classPrefix="'interval'" />
        <ol>
            <li v-for="(group,index) in result" :key="index">
                <h2>{{group.title}}</h2>
               <ol>
                   <li v-for="item in group.items" :key="item.createdAt">{{item.tags}}{{item.notes}}{{item.amount}}</li>
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
</style>