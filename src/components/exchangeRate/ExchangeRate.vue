<template>
  <div
    v-if="!closed"
    :class="[
      uniqueClassName,
      isCollapsed ? 'collapsed' : '',
    ]"
    :style="{order}"
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

    <widget-error
      v-if="errorExists"
      :text="errorText"
    />

    <div
      v-else
      class="exchange-rate__content"
    >
      <exchange-rate-form
        :currencies-codes="currenciesCodes"
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
import { defineComponent } from "vue";
import WidgetNavigation from "@/components/WidgetNavigation.vue";
import WidgetLoading from "@/components/WidgetLoading.vue";
import ExchangeRateForm from "@/components/exchangeRate/ExchangeRateForm.vue";
import WidgetError from "@/components/WidgetError.vue";
import { UnformattedCurrency } from "@/components/exchangeRate/interfaces/unformattedCurrency";
import { Currency } from "@/components/exchangeRate/interfaces/currency";
import { ExchangeRate } from "@/components/exchangeRate/interfaces/exchangeRate";
import { ExchangeError } from "@/components/exchangeRate/interfaces/exchangeError";
import axios, { AxiosResponse } from "axios";
import { Navigation } from "@/enums/navigation";
import { ExchangeRateResponse } from "@/components/exchangeRate/interfaces/exchangeRateResponse";

export default defineComponent({
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

    closed: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data() {
    return {
      baseURL: import.meta.env.VITE_EXCHANGE_BASE_URL,
      loading: true,
      isCollapsed: false,
      currencies: [] as Array<Currency>,
      currenciesCodes: [] as Array<string>,
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
      return [Navigation.Close, Navigation.Collapse];
    }
  },

  methods: {
    showLoading() {
      this.loading = true;
    },

    hideLoading() {
      this.loading = false;
    },

    async updateExchangeRate(exchangeRate: ExchangeRate) {
      if (!this.currencies.length) {
        await this.loadExchangeRate();
      }

      const currencyFrom = this.currencies.find(currency => currency.code === exchangeRate.from);
      const currencyTo = this.currencies.find(currency => currency.code === exchangeRate.to);

      if (currencyFrom && currencyTo) {
        let result = 1;

        if (currencyFrom.code === currencyTo.code) {
          result = 1;
        } else if (currencyFrom.code === "RUB") {
          const value = 1 / currencyTo.value;
          result = parseFloat(value.toFixed(3)) || 0;
        } else if (currencyTo.code === "RUB") {
          result = currencyFrom.value;
        } else {
          const value = currencyFrom.value / currencyTo.value;
          result = parseFloat(value.toFixed(3)) || 0;
        }

        this.exchangedCurrencies = `1 ${currencyFrom.code} = ${result} ${currencyTo.code}`;
      }
    },

    async loadExchangeRate() {
      this.showLoading();

      await axios
        .get(`${this.baseURL}daily_json.js`)
        .then((response: AxiosResponse<ExchangeRateResponse>) => {
          this.resetError();

          const currencies = Object.values(response.data.Valute);

          this.currencies = this.formatCurrencies(currencies);

          this.addRubExchangePair();
        })
        .catch(this.handleRequestErrors)
        .finally(this.hideLoading);
    },

    resetError() {
      this.errorExists = false;
      this.errorText = "";
    },

    formatCurrencies(currencies: Array<UnformattedCurrency>) {
      return currencies.map(currency => {
        const code = currency.CharCode;
        const nominal = currency.Nominal;
        const value = currency.Value;

        this.currenciesCodes.push(code);

        return {
          code,
          value: value / nominal
        } as Currency;
      });
    },

    addRubExchangePair() {
      this.currenciesCodes.push("RUB");

      this.currencies.push({
        code: "RUB",
        value: 1
      });
    },

    handleRequestErrors(error: ExchangeError) {
      this.errorExists = true;

      const code = error.code;

      console.error(error);

      if (code === "ERR_NETWORK") {
        this.errorText = "Ошибка загрузки";
      }
    },

    collapseWidget() {
      this.isCollapsed = !this.isCollapsed;
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