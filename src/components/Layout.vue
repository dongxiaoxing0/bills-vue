<template>
    <div class="nav-wrapper">
        <div class="content">
            <slot></slot>
        </div>
        <Nav class="nav"></Nav>
    </div>
</template>

<script>
    export default {
        name: 'Layout'
    }
</script>

<style lang="scss" scoped>
.nav-wrapper{
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.content{
    border: 1px solid red;
    flex-grow: 1;
    overflow: auto;
}
</style>