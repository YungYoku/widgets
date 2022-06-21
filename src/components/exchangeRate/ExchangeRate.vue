<template>
  <div class="widget exchange-rate">
    <h2 class="title">
      Курс валют
    </h2>

    <div class="exchange-rate__currencies">
      <select
        id="from"
        v-model="from"
        class="exchange-rate__from"
        name="from"
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

    <div>
      {{ exchangedCurrencies }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ExchangeRate",

  data() {
    return {
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
      this.$http.get("https://www.cbr.ru/scripts/XML_daily.asp")
        .then(response => {
          const xml = this.stringToXML(response.data);
          const json = this.xmlToJson(xml).ValCurs;

          this.date = json.attributes.Date;
          this.currencies = this.formatCurrencies(json.Valute);
        });
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