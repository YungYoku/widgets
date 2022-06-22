<template>
  <div
    :class="[
      isCollapsed ? 'collapsed' : '',
    ]"
    class="widget exchange-rate"
  >
    <widget-navigation
      :rules="navigationRules"
      class="navigation"
      @closeWidget="closeWidget"
      @collapseWidget="collapseWidget"
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
      isCollapsed: false,
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
      return ["Выход", "Сворачивание"];
    }
  },

  mounted() {
    this.updateDate();
    this.loadExchangeRate();
  },

  methods: {
    collapseWidget() {
      this.isCollapsed = !this.isCollapsed;
    },

    exchangeCurrencies() {
      const currencyFrom = this.currencies.find(currency => currency.code === this.from);
      const currencyTo = this.currencies.find(currency => currency.code === this.to);

      if (this.from === "RUB") {
        if (this.to === "RUB") {
          return 1;
        } else {
          return (1 / currencyTo.value).toFixed(2);
        }
      } else if (this.to === "RUB") {
        if (currencyFrom) {
          return currencyFrom.value;
        }
      } else {
        return (currencyFrom.value / currencyTo.value).toFixed(2);
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
      let currencies = [...xml.childNodes[0].childNodes] || [];

      currencies = currencies.map(_currency => {
        const attrs = [..._currency.childNodes];

        const currency = {};
        attrs.forEach(attr => currency[attr.localName] = attr.textContent);

        return currency;
      });

      return currencies;
    },

    formatCurrencies(currencies) {
      this.currenciesList.push("RUB");

      return currencies.map(currency => {
        const code = currency.CharCode;
        const nominal = parseInt(currency.Nominal);
        const value = parseInt(currency.Value);

        this.currenciesList.push(code);

        return {
          code,
          name: currency.Name,
          nominal: nominal / nominal,
          numCode: currency.NumCode,
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
          const json = this.xmlToJson(xml);

          this.currencies = this.formatCurrencies(json);
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

  &.collapsed {
    max-width: 110px;
    max-height: 70px;
    padding: 20px;
    overflow: hidden;

    transition: all 0.3s;
  }

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