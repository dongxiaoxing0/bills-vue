<template>
    <nav>
      <router-link to="/labels" class="item" active-class="selected">
        <Icon name="label"></Icon>
        <p>标签</p> 
      </router-link>
      <router-link to="/money" class="item" active-class="selected">
        <Icon name="money"></Icon>
        <p>记账</p> 
      </router-link>
      <router-link to="/statistics" class="item" active-class="selected">
        <Icon name="statistics"></Icon>
        <p>统计</p> 
      </router-link>
    </nav>
</template>

<script lang="ts">

    export default {
        name: 'Nav'
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav{
    display: flex;
    flex-direction: row;
    box-shadow: 0 0 3px rgba(0,0,0,0.25);
    font-size: 12px;
    > .item{
        width:33.333333%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;    
    }
        .icon{
            width: 32px;
            height: 32px;
        }
    > .item.selected{
        color:$color-highlight;
    }
}
</style>
