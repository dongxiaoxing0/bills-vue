<template>
    <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
        <div class="content" :class="classPrefix && `${classPrefix}-content`">
            <slot></slot>
        </div>
        <Nav class="nav"></Nav>
    </div>
</template>

<script>
    export default {
        props: ['classPrefix'],
        name: 'Layout',
    }
</script>

<style lang="scss" scoped>
.layout-wrapper{
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.content{
    flex-grow: 1;
    overflow: auto;
}
</style>