<template>
  <div
    v-if="!hidden"
    :class="[
      uniqueClassName,
      isCollapsed ? 'collapsed' : '',
    ]"
    :style="{order}"
    class="widget exchange-rate"
    @dragstart="startDrag($event)"
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

    <exchange-rate-form
      :currencies-list="currenciesList"
      :loading="loading"
      @updateExchangeRate="updateExchangeRate"
    />

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
import ExchangeRateForm from "@/components/exchangeRate/ExchangeRateForm";

export default {
  name: "ExchangeRate",

  components: { ExchangeRateForm, WidgetLoading, WidgetNavigation },

  props: {
    id: {
      type: Number,
      required: true,
      default: 0
    },

    order: {
      type: Number,
      required: true,
      default: 0
    },

    hidden: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data() {
    return {
      baseURL: process.env.VUE_APP_EXCHANGE_BASE_URL,
      loading: true,
      isCollapsed: false,
      currencies: [],
      currenciesList: [],
      exchangedCurrencies: ""
    };
  },

  computed: {
    uniqueClassName() {
      return `exchange-rate${this.id}`;
    },

    navigationRules() {
      return ["close", "collapse"];
    }
  },

  methods: {
    startDrag(e) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("itemID", this.id.toString());
    },

    showLoading() {
      this.loading = true;
    },

    hideLoading() {
      this.loading = false;
    },

    collapseWidget() {
      this.isCollapsed = !this.isCollapsed;
    },

    async updateExchangeRate(exchangeRate) {
      if (!this.currencies.length) {
        await this.loadExchangeRate();
      }

      const fromCode = exchangeRate.from;
      const toCode = exchangeRate.to;
      let result = 1;

      const currencyFrom = this.currencies.find(currency => currency.code === fromCode);
      const currencyTo = this.currencies.find(currency => currency.code === toCode);

      if (fromCode === toCode) {
        result = 1;
      } else if (fromCode === "RUB") {
        result = (1 / currencyTo.value).toFixed(2);
      } else if (toCode === "RUB") {
        result = currencyFrom.value;
      } else {
        result = (currencyFrom.value / currencyTo.value).toFixed(2);
      }

      this.exchangedCurrencies = `1 ${fromCode} = ${result} ${toCode}`;
    },

    stringToXML(xmlString) {
      return (new DOMParser()).parseFromString(xmlString, "text/xml");
    },

    xmlToJson(xmlString) {
      const xml = this.stringToXML(xmlString);
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

    handleRequestErrors(error) {
      console.error(error);
    },

    async loadExchangeRate() {
      this.showLoading();

      await this.$http
        .get(`${this.baseURL}scripts/XML_daily.asp`)
        .then(response => {
          const json = this.xmlToJson(response.data);

          this.currencies = this.formatCurrencies(json);
        })
        .catch(this.handleRequestErrors)
        .finally(this.hideLoading);
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
    max-width: 96px;
    max-height: 62px;
    padding: 20px;
    overflow: hidden;

    transition: all 0.3s;
  }
}
</style>