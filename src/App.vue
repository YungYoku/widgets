<template>
  <div id="app">
    <widgets-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WidgetsView from "@/views/WidgetsView.vue";

export default Vue.extend({
  name: "App",

  components: { WidgetsView }
});
</script>

<style lang="scss" scoped>
#app {
  isolation: isolate;
}
</style>
