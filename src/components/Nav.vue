<template>
    <nav>
      <router-link to="/money" class="item">
      <Icon name="money"></Icon>
      记账
      </router-link>
      
      <router-link to="/labels" class="item">
      
        <Icon name="label"></Icon>
      标签
      </router-link>
      
      <router-link to="/statistics" class="item">
      
        <Icon name="statistics"></Icon>
      统计
      </router-link>
    </nav>
</template>

<script lang="ts">

    export default {
        name: 'Nav'
    }
</script>

<style lang="scss" scoped>
nav{
    border: 1px solid green;
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
}
</style>
