<template>
    <div id="app">
        <Home />
    </div>
</template>

<script>
import Home from "./view/Home";
export default {
    name: "App",
    components: {
        Home,
    },
};
</script>

<style lang="less">
#app {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 100px 50px;
}
</style>
