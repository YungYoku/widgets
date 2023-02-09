<h1 align="center">Widgets</h1>

## Description

Web app for adding, using and removing widgets.

Current list of widgets:

- :sunny: *Weather Forecast*,
- :dollar: *Exchange Rate*,
- :watch: *Exact Time*.

![All widgets](main-page.jpeg)

<br>

[Link to the site is here.](https://reliable-raindrop-761a7a.netlify.app/)

___

<br>

## Weather Forecast

This widget uses [OpenWeatherMapApi](https://api.openweathermap.org/),
and it does need an api key. After registration, you can get it
in your account api keys. You need to put it 
inside .env and .env.production files 
in the root of the project 
(Example shown in .env.example).


<br>

Function that loads weather forecast by coordinates.

```typescript
async loadWeatherForecast(lat: number, lon: number) {
  await this.$http
    .get(
      `${this.baseURL}data/2.5/onecall?appid=${this.apiKey}`,
      {
        params: {
          lat,
          lon,
          exclude: "hourly,minutely,alerts",
          units: "metric",
          lang: this.lang
        }
      }
    )
    .then((response: AxiosResponse<WeatherForecastResponse>) => {
      this.searchesAmount++;

      this.setLatLon(lat, lon);

      this.setWeather(response.data);

      this.geoAccessRequestShowing = false;
      this.cityExistError = false;
    })
    .catch(this.handleRequestErrors);
}
```

<br>

___

<br>

## Exchange Rate

This widget uses [CBR requests](https://www.cbr-xml-daily.ru/),
and it doesn't require any api key.

<br>

Function that loads currencies data.

```typescript
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
}
```

<br>

___

<br>

## Exact Time

This widget uses [WorldTimeApi](https://worldtimeapi.org/),
and it doesn't require any api key.

<br>

Function that loads time data by provided path,
it can be ip or timezone. This function is called
every time you add the widget.

```typescript
async request(path: string) {
  this.showLoading();

  await this.$http
    .get(`${this.baseURL}${path}`)
    .then((response: AxiosResponse<TimeResponse>) => {
      this.resetError();

      const time = response.data.datetime;

      this.setTime(this.getFormattedTime(time));
    })
    .catch(this.handleRequestErrors)
    .finally(this.hideLoading);
}
```

<br>

___

<br>

## Project setup

Project was made with Node 16.10.0.

```shell
npm install
```

### Compiles and hot-reloads for development

```shell
npm run serve
```

### Compiles and minifies for production

```shell
npm run build
```

<br>

___

<br>

## License

[MIT](https://opensource.org/licenses/MIT)