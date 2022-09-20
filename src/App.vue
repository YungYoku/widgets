<template>
  <div id="app">
    <widgets-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WidgetsView from "@/views/WidgetsView.vue";

export default defineComponent({
  name: "App",

  components: { WidgetsView }
});
</script>

<style lang="scss" scoped>
#app {
  isolation: isolate;
}
</style>
