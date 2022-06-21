<template>
  <div class="widgetsView">
    <component
      :is="widget.type"
      v-for="(widget, i) in widgets"
      :id="widget.id"
      :key="widget + i"
      @closeWidget="closeWidget"
    />

    <add-widget
      @addWidget="addWidget"
    />
  </div>
</template>

<script>
import ExactTime from "@/components/exactTime/ExactTime";
import ExchangeRate from "@/components/exchangeRate/ExchangeRate";
import WeatherForecast from "@/components/weatherForecast/WeatherForecast.vue";
import AddWidget from "@/components/addWidget/AddWidget";

export default {
  name: "WidgetsView",

  components: { AddWidget, ExchangeRate, ExactTime, WeatherForecast },

  data() {
    return {
      widgets: []
    };
  },

  methods: {
    closeWidget(id) {
      this.widgets = this.widgets.filter(widget => widget.id !== id);
    },

    addWidget(type) {
      this.widgets.push({
        type,
        id: this.widgets.length
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.widgetsView {
  position: relative;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;

  box-sizing: border-box;

  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 30px;
  overflow-x: hidden;
  overflow-y: auto;

  background-color: #222222;

  gap: 30px;

  @media (max-width: 1000px), (max-height: 900px) {
    padding: 10px;
  }

  @media (max-width: 768px) {
    padding: 5px;
  }

  @media (max-width: 600px) {
    padding: 0;
  }
}
</style>
