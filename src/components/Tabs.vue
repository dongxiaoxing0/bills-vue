<template>
    <ul class="tabs" :class="{[`${classPrefix}-tabs`]:classPrefix}">
        <li v-for="item in dataSource " :key="item.text"
            @click="select(item)"
            :class="classList(item)"
        >{{item.text}}</li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop} from 'vue-property-decorator';
    type DataSourceItem = {
        text: string;
        value: string;
    }

    @Component
    export default class Tabs extends Vue {
        @Prop({type: Array,required: true,}) dataSource: DataSourceItem[]|undefined
        @Prop(String) selectedValue: string|undefined
        @Prop(String) classPrefix?: string|undefined
        select(item: DataSourceItem){
            this.$emit('update:selectedValue',item.value);
        }
        classList(item: DataSourceItem){
            return {
            selected:item.value === this.selectedValue,
            [`${this.classPrefix}-tab-item`]:this.classPrefix,
            }
        }
        
    }
</script>

<style lang="scss" scoped>
    .tabs {
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;
    > li {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;
      }
    }
  }
</style>