<template>
  <div
    class="widgets-view"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
  >
    <h1 class="widgets-view__title">
      Виджеты
    </h1>

    <component
      :is="widget.type"
      v-for="(widget, i) in widgets"
      :id="widget.id"
      :key="widget.type + widget.id + i"
      :draggable="true"
      :order="widget.order"
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
      newId: 0,
      widgets: [],
      widgetsType: [
        "weather-forecast",
        "exact-time",
        "exchange-rate"
      ],
      drag: false
    };
  },

  methods: {
    onDrop(event) {
      const itemID = parseInt(event.dataTransfer.getData("itemID"));
      const item = this.widgets.find(item => item.id === itemID);
      console.log("Перетаскиваемый виджет: ", item);

      const path = [...event.path];

      path.forEach(el => {
        if (el.className) {
          const classNames = [...el.className.split(" ")];

          if (classNames.includes("widget")) {
            console.log("На виджет: ", classNames);
          }
        }
      });
      //item.sequenceId = 0; // найти элемент с помощью path и записать его sId, а потом увеличить sId всех последующих элементов на 1
    },

    closeWidget(id) {
      this.animateDisappearance(id);

      setTimeout(() => {
        this.widgets = this.widgets.filter(widget => widget.id !== id);
      }, 500);
    },

    animateDisappearance(id) {
      const targetWidget = this.widgets.find(widget => widget.id === id);
      const target = document.querySelector("." + targetWidget.type + targetWidget.id);
      target.classList.add("closed");
    },

    addWidget(type) {
      this.widgets.push({
        type,
        id: this.newId,
        order: this.newId
      });

      this.newId++;
    }
  }
};
</script>

<style lang="scss" scoped>
.widgets-view {
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

  gap: 20px;

  @media (max-width: 1000px), (max-height: 900px) {
    padding: 10px;
  }

  @media (max-width: 768px) {
    padding: 5px;
  }

  @media (max-width: 600px) {
    padding: 0;
  }

  &__title {
    width: 100%;
    margin: 0;

    font-size: 60px;
    font-weight: 700;
    color: #ffffff;
    overflow-wrap: break-word;
  }
}
</style>
