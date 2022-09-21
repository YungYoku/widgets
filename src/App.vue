<template>
  <widgets-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WidgetsView from "@/views/WidgetsView.vue";

export default defineComponent({
  name: "App",

  components: { WidgetsView }
});
</script>
