<h1 align="center">Widgets</h1>

## Description

Web app for adding, using and removing widgets.
<br/>
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

```
Soon...
```

<br>

___

<br>

## Exchange Rate

```
Soon...
```

<br>

___

<br>

## Exact Time

Function that loads time data using [WorldTimeApi](https://worldtimeapi.org/).

```vue
loadTimeByTimezone() {
  this.showLoading();

  this.$http
    .get(`${this.baseURL}timezone/${this.timezone}`)
    .then(response => {
      const time = response.data.datetime;

      this.setTime(this.getFormattedTime(time));

      this.hideLoading();
    })
    .catch(this.handleRequestErrors);
},
```

<br>

___

<br>

## Project setup

```
npm install
```

Also, you need to get your own api key from [OpenWeatherMap](https://openweathermap.org/)
and put it inside .env and .env.production files on the root of the project (Example shown in .env.example).

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```