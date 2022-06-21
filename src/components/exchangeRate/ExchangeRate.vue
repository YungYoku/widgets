<template>
  <div class="widget exchange-rate">
    <widget-navigation
      :rules="navigationRules"
      class="navigation"
      @closeWidget="closeWidget"
    />

    <h2 class="title">
      Курс валют
    </h2>


    <widget-loading v-if="loading" />

    <div
      v-else
      class="exchange-rate__currencies"
    >
      <select
        id="from"
        v-model="from"
        class="exchange-rate__from"
        name="from"
        title="Сконвертировать из"
      >
        <option
          v-for="currency in currenciesList"
          :key="currency"
          :value="currency"
        >
          {{ currency }}
        </option>
      </select>

      ->

      <select
        id="to"
        v-model="to"
        class="exchange-rate__to"
        name="to"
        title="Сконвертировать в"
      >
        <option
          v-for="currency in currenciesList"
          :key="currency"
          :value="currency"
        >
          {{ currency }}
        </option>
      </select>
    </div>


    <widget-loading v-if="loading" />

    <div
      v-else
      class="text"
    >
      {{ exchangedCurrencies }}
    </div>
  </div>
</template>

<script>
import WidgetNavigation from "@/components/WidgetNavigation";
import WidgetLoading from "@/components/WidgetLoading";

export default {
  name: "ExchangeRate",

  components: { WidgetLoading, WidgetNavigation },

  props: {
    id: {
      type: Number,
      required: true,
      default: 0
    }
  },

  data() {
    return {
      baseURL: "https://www.cbr.ru/",
      loading: true,
      date: "01.01.2022",
      currencies: [],
      currenciesList: [],
      from: "USD",
      to: "RUB"
    };
  },

  computed: {
    exchangedCurrencies() {
      const result = this.exchangeCurrencies();
      return `
        1 ${this.from} = ${result} ${this.to}
      `;
    },

    navigationRules() {
      return ["Выход"];
    }
  },

  mounted() {
    this.updateDate();
    this.loadExchangeRate();
  },

  methods: {
    exchangeCurrencies() {
      const currency = this.currencies.find(currency => currency.code === this.from);

      if (currency) {
        return currency.value;
      }

      return 0;
    },

    normalizeNumber(num) {
      if (num < 10) {
        return "0" + num;
      }
      return num;
    },

    updateDate() {
      const year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();

      month = this.normalizeNumber(month);
      day = this.normalizeNumber(day);

      this.date = `${day}/${month}/${year}`;
    },

    stringToXML(xmlString) {
      return (new DOMParser()).parseFromString(xmlString, "text/xml");
    },

    xmlToJson(xml) {
      let obj = {};

      if (xml.nodeType === 1) {
        if (xml.attributes.length > 0) {
          obj.attributes = {};
          for (let j = 0; j < xml.attributes.length; j++) {
            const attribute = xml.attributes.item(j);
            obj.attributes[attribute.nodeName] = attribute.nodeValue;
          }
        }
      } else if (xml.nodeType === 3) {
        obj = xml.nodeValue;
      }

      if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
          const item = xml.childNodes.item(i);
          const nodeName = item.nodeName;

          if (typeof (obj[nodeName]) === "undefined") {
            obj[nodeName] = this.xmlToJson(item);
          } else {
            if (typeof (obj[nodeName].push) === "undefined") {
              const old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(this.xmlToJson(item));
          }
        }
      }
      return obj;
    },

    formatCurrencies(currencies) {
      this.currenciesList.push("RUB");

      return currencies.map(currency => {
        const code = currency.CharCode["#text"];
        const nominal = parseInt(currency.Nominal["#text"]);
        const value = parseInt(currency.Value["#text"]);

        this.currenciesList.push(code);

        return {
          code,
          name: currency.Name["#text"],
          nominal: nominal / nominal,
          numCode: currency.NumCode["#text"],
          value: value / nominal,
          attributes: currency.attributes
        };
      });
    },

    loadExchangeRate() {
      this.loading = true;

      this.$http.get(`${this.baseURL}scripts/XML_daily.asp`)
        .then(response => {
          this.loading = false;

          const xml = this.stringToXML(response.data);
          const json = this.xmlToJson(xml).ValCurs;

          this.date = json.attributes.Date;
          this.currencies = this.formatCurrencies(json.Valute);
        });
    },

    closeWidget() {
      this.$emit("closeWidget", this.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.exchange-rate {
  max-width: 400px;

  background-color: #ffffff;

  &__currencies {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    .exchange-rate__from,
    .exchange-rate__to {
      display: flex;
      justify-content: center;
      align-items: center;

      min-width: 10px;
      min-height: 10px;
      padding: 10px;

      text-align: center;

      border: 1px solid #999999;
      border-radius: 10px;
    }
  }
}
</style>