<template>
  <div
    class="widgets-view"
    @drop="onDrop"
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
      :hidden="widget.hidden"
      :order="widget.order"
      @closeWidget="closeWidget"
      @dragstart="startDrag($event, widget.id)"
    />

    <widget-adding
      @addWidget="addWidget"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ExactTime from "@/components/exactTime/ExactTime.vue";
import ExchangeRate from "@/components/exchangeRate/ExchangeRate.vue";
import WeatherForecast from "@/components/weatherForecast/WeatherForecast.vue";
import widgetAdding from "@/components/widgetAdding/widgetAdding.vue";
import type { WidgetItem } from "@/interfaces/widgetItem";

export default defineComponent({
  name: "WidgetsView",

  components: { widgetAdding, ExchangeRate, ExactTime, WeatherForecast },

  data() {
    return {
      newId: 0,
      widgets: [] as Array<WidgetItem>,
      widgetTypes: [
        "weather-forecast",
        "exact-time",
        "exchange-rate"
      ],
      drag: false
    };
  },

  methods: {
    detectWidgetType(classNames: Array<string>) {
      for (const className of classNames) {
        for (const widgetType of this.widgetTypes) {
          if (className.includes(widgetType)) {
            return widgetType;
          }
        }
      }

      return "";
    },

    startDrag(event: DragEvent, id: number) {
      const dataTransfer = event.dataTransfer as DataTransfer;

      dataTransfer.dropEffect = "move";
      dataTransfer.effectAllowed = "move";
      dataTransfer.setData("itemID", id.toString());
    },

    onDrop(event: DragEvent) {
      const dataTransfer = event.dataTransfer as DataTransfer;
      const itemID = parseInt(dataTransfer.getData("itemID"));
      let target = event.target as HTMLElement;
      let toWidget;
      let toWidgetId: number;
      let toWidgetType: string;

      while (target) {
        if (target.nodeName.toLowerCase() === "body") {
          break;
        }

        if (target.className && !target.id.includes("Svg")) {
          let classNames = [...target.className.split(" ")];

          if (classNames.includes("widget")) {
            toWidgetType = this.detectWidgetType(classNames);
            classNames = classNames.filter(el =>
              el !== "widget" &&
              el !== "cityError" &&
              el !== toWidgetType
            );
            toWidgetId = parseInt(classNames[0].replace(toWidgetType, ""));
            toWidget = this.widgets.find(item => item.id === toWidgetId);
          }
        }

        if (target.parentNode) {
          target = target.parentNode as HTMLElement;
        }
      }

      const fromWidget = this.widgets.find(item => item.id === itemID);

      if (toWidget && fromWidget) {
        const tempOrder = fromWidget.order;
        fromWidget.order = toWidget.order;
        toWidget.order = tempOrder;
      }
    },

    closeWidget(id: number) {
      this.animateDisappearance(id);
    },

    animateDisappearance(id: number) {
      const targetWidget = this.widgets.find(widget => widget.id === id);

      if (targetWidget) {
        const target = document.querySelector("." + targetWidget.type + targetWidget.id);

        if (target) {
          target.classList.add("closed");

          setTimeout(() => {
            targetWidget.hidden = true;
          }, 500);
        }
      }
    },

    addWidget(type: string) {
      this.widgets.push({
        type,
        id: this.newId,
        order: this.newId,
        hidden: false
      });

      this.newId++;
    }
  }
});
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
