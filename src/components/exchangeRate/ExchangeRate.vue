<template>
  <div
    v-if="!hidden"
    :class="[
      uniqueClassName,
      isCollapsed ? 'collapsed' : '',
    ]"
    :style="{order}"
    class="widget exchange-rate"
    @dragstart="startDrag"
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

    <widget-error
      v-if="errorExists"
      :text="errorText"
    />

    <div
      v-else
      class="exchange-rate__content"
    >
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WidgetNavigation from "@/components/WidgetNavigation.vue";
import WidgetLoading from "@/components/WidgetLoading.vue";
import ExchangeRateForm from "@/components/exchangeRate/ExchangeRateForm.vue";
import WidgetError from "@/components/WidgetError.vue";
import { UnformattedCurrency } from "@/interfaces/unformattedCurrency";
import { Currency } from "@/interfaces/currency";
import { ExchangeRate } from "@/interfaces/exchangeRate";
import { ExchangeError } from "@/interfaces/exchangeError";
import { AxiosResponse } from "axios";
import { UnformattedCurrencyAttribute } from "@/interfaces/unformattedCurrencyAttribute";

export default Vue.extend({
  name: "ExchangeRate",

  components: {
    WidgetError,
    ExchangeRateForm,
    WidgetLoading,
    WidgetNavigation
  },

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
      currencies: [] as Array<Currency>,
      currenciesList: [] as Array<string>,
      exchangedCurrencies: "",
      errorExists: false,
      errorText: ""
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
    startDrag(event: DragEvent) {
      const dataTransfer = event.dataTransfer as DataTransfer;

      dataTransfer.dropEffect = "move";
      dataTransfer.effectAllowed = "move";
      dataTransfer.setData("itemID", this.id.toString());
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

    addRubExchangePair() {
      this.currencies.push({
        code: "RUB",
        name: "Рубль РФ",
        nominal: 1,
        numCode: "0",
        value: 1
      });
    },

    async updateExchangeRate(exchangeRate: ExchangeRate) {
      if (!this.currencies.length) {
        await this.loadExchangeRate();
      }

      this.addRubExchangePair();

      const from: { code: string, currency: Currency | undefined } = {
        code: exchangeRate.from,
        currency: this.currencies.find(currency => currency.code === exchangeRate.from)
      };
      const to: { code: string, currency: Currency | undefined } = {
        code: exchangeRate.to,
        currency: this.currencies.find(currency => currency.code === exchangeRate.to)
      };
      let result = 1;

      if (from.currency && to.currency) {
        if (from.code === to.code) {
          result = 1;
        } else if (from.code === "RUB") {
          result = parseInt((1 / to.currency.value).toFixed(2));
        } else if (to.code === "RUB") {
          result = from.currency.value;
        } else {
          result = parseInt((from.currency.value / to.currency.value).toFixed(2));
        }

        this.exchangedCurrencies = `1 ${from.code} = ${result} ${to.code}`;
      }
    },

    stringToXML(xmlString: string) {
      return (new DOMParser()).parseFromString(xmlString, "text/xml");
    },

    xmlToJson(xmlString: string) {
      const xml = this.stringToXML(xmlString);
      const nodes = [...xml.childNodes[0].childNodes] || [];

      const currencies = nodes.map(_currency => {
        const childNodes = _currency.childNodes;
        const attrs = [...childNodes] as Array<UnformattedCurrencyAttribute>;

        const currency = {} as UnformattedCurrency;
        attrs.forEach((attr: UnformattedCurrencyAttribute) => {
          const attrName = attr.localName as string;

          currency[attrName] = attr.textContent;
        });

        return currency;
      });

      return currencies as Array<UnformattedCurrency>;
    },

    formatCurrencies(currencies: Array<UnformattedCurrency>) {
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
          value: value / nominal
        } as Currency;
      });
    },

    resetError() {
      this.errorExists = false;
      this.errorText = "";
    },

    handleRequestErrors(error: ExchangeError) {
      this.errorExists = true;

      const code = error.code;

      console.error(error);

      if (code === "ERR_NETWORK") {
        this.errorText = "Ошибка загрузки";
      }
    },

    async loadExchangeRate() {
      this.showLoading();

      await this.$http
        .get(`${this.baseURL}scripts/XML_daily.asp`)
        .then((response: AxiosResponse<string>) => {
          this.resetError();

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
});
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

  &__content {
    display: grid;

    grid-gap: 10px;
  }
}
</style>