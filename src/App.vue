<template>
  <div id="app">
    <widgets-view />
  </div>
</template>

<script>
import WidgetsView from "@/views/WidgetsView";

export default {
  name: "App",

  components: { WidgetsView }
};
</script>

<style lang="scss" scoped>
#app {
  isolation: isolate;
}
</style>
