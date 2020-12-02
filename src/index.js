import React from "react";
import ReactDOM from "react-dom";

import locationsData from "./locations.json";

import axios from "axios";

import AtwHeader from "./modules/AtwHeader.es";
import AtwFlags from "./modules/AtwFlags.es";
import AtwNavbar from "./modules/AtwNavbar.es";
import AtwLocalData from "./modules/AtwLocalData.es";
import AtwFooter from "./modules/AtwFooter.es";

/**
 * This is the main entry point of the portlet.
 *
 * See https://tinyurl.com/js-ext-portlet-entry-point for the most recent
 * information on the signature of this function.
 *
 * @param  {Object} params a hash with values of interest to the portlet
 * @return {void}
 */

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      initialFlags: [],
      currentFlags: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.setCelsius = this.setCelsius.bind(this);
    this.setFahrenheit = this.setFahrenheit.bind(this);
    this.filterList = this.filterList.bind(this);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  componentDidMount() {

    if (!localStorage.getItem("lastLocationIndex") || localStorage.getItem("lastLocationIndex") === null) {
      localStorage.setItem("lastLocationIndex", 0);
    }

    let lastLocationIndex = localStorage.getItem("lastLocationIndex");
    let isDarkMode = false;

    if (localStorage.getItem("isDarkMode") === "true") {
      isDarkMode = true;
    }

    localStorage.setItem("lastLocationIndex", lastLocationIndex);
    localStorage.setItem("isDarkMode", isDarkMode);

    this.setState({
      initialFlags: locationsData.locations,
      currentFlags: locationsData.locations,
      lastLocationIndex: lastLocationIndex,
      isDarkMode: isDarkMode
    })

    this.fetchCurrentLocation(locationsData.locations[lastLocationIndex].title);
    this.fetchCurrentCountry(
      locationsData.locations[lastLocationIndex].country
    );
    this.fetchCurrentLocationISO_3166_1_alpha_2(
      locationsData.locations[lastLocationIndex].ISO_3166_1_alpha_2
    );
    this.fetchTime(
      locationsData.locations[lastLocationIndex].timezone_database_name
    );
    this.fetchGrowURL(locationsData.locations[lastLocationIndex].grow_URL);
    this.fetchWeather(
      locationsData.locations[lastLocationIndex].country,
      locationsData.locations[lastLocationIndex].location.lat,
      locationsData.locations[lastLocationIndex].location.lon
    );
    this.fetchWeatherForecast(
      locationsData.locations[lastLocationIndex].country,
      locationsData.locations[lastLocationIndex].location.lat,
      locationsData.locations[lastLocationIndex].location.lon
    );
    this.fetchMapCoordinates(
      locationsData.locations[lastLocationIndex].location.lat,
      locationsData.locations[lastLocationIndex].location.lon
    );
    this.fetchWebCamData(
      locationsData.locations[lastLocationIndex].ISO_3166_1_alpha_2
    );
    this.fetchWikiData(
      locationsData.locations[lastLocationIndex].wiki.description,
      locationsData.locations[lastLocationIndex].wiki.URL
    );
    this.fetchPictures(locationsData.locations[lastLocationIndex].country);
  }

  handleClick(
    currentLocationIndex,
    currentLocation,
    currentCountry,
    currentLocationISO_3166_1_alpha_2,
    currentTimeZoneDBName,
    currentGrowURL,
    currentWikiDescription,
    currentWikiURL,
    currentLatitude,
    currentLongitude
  ) {
    this.setLocationIndex(currentLocationIndex);
    this.fetchCurrentLocation(currentLocation);
    this.fetchCurrentCountry(currentCountry);
    this.fetchCurrentLocationISO_3166_1_alpha_2(
      currentLocationISO_3166_1_alpha_2
    );
    this.fetchTime(currentTimeZoneDBName);
    this.fetchGrowURL(currentGrowURL);
    this.fetchWeather(currentCountry, currentLatitude, currentLongitude);
    this.fetchWeatherForecast(
      currentCountry,
      currentLatitude,
      currentLongitude
    );
    this.fetchMapCoordinates(currentLatitude, currentLongitude);
    this.fetchWebCamData(currentLocationISO_3166_1_alpha_2);
    this.fetchWikiData(currentWikiDescription, currentWikiURL);
    this.fetchPictures(currentCountry);
  }

  filterList(event) { // Feature inspired by https://www.jondjones.com/frontend/react/components/how-to-build-a-filterable-search-bar-in-react
    let currentFlags = this.state.initialFlags;
    currentFlags = currentFlags.filter((location) => {
      return location.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ currentFlags: currentFlags });
  }

  setLocationIndex(currentLocationIndex) {
    localStorage.setItem("lastLocationIndex", currentLocationIndex);
  }

  toggleDarkMode() {
    this.setState({
      isDarkMode: !this.state.isDarkMode
    },
      () => { //setState is async, the below ensures the localStorage is updated at the right time
        localStorage.setItem("isDarkMode", this.state.isDarkMode);
      }
    );
  }

  setCelsius() {
    if (!this.state.isCelsius)
      this.setState({
        isCelsius: true
      });
  }

  setFahrenheit() {
    if (this.state.isCelsius)
      this.setState({
        isCelsius: false
      });
  }

  fetchCurrentLocation(currentLocation) {
    this.setState({
      currentLocation: currentLocation
    });
  }

  fetchCurrentCountry(currentCountry) {
    this.setState({
      currentCountry: currentCountry
    });
  }

  fetchCurrentLocationISO_3166_1_alpha_2(currentLocationISO_3166_1_alpha_2) {
    this.setState({
      currentLocationISO_3166_1_alpha_2: currentLocationISO_3166_1_alpha_2
    });
  }

  fetchTime(currentTimeZoneDBName) {
    const URL =
      "https://api.timezonedb.com/v2.1/get-time-zone" +
      "?format=json&by=zone&zone=" + currentTimeZoneDBName +
      "&key=" + this.props.configuration.portletInstance.time_date_apikey;

    this.setState({ isTimeDateLoading: true }, () => {
      axios
        .get(URL)
        .then(response => response.data)
        .then(data => {
          this.setState({
            isTimeDateLoading: false,
            date: data.formatted.substr(0, data.formatted.indexOf(" ")),
            time: data.formatted.substr(data.formatted.indexOf(" ") + 1)
          });
        });
    });
  }

  fetchGrowURL(currentGrowURL) {
    this.setState({
      currentGrowURL: currentGrowURL
    });
  }

  fetchWeather(currentCountry, currentLatitude, currentLongitude) {
    const weatherURL =
      "https://api.openweathermap.org/data/2.5/weather" +
      "?lat=" + currentLatitude +
      "&lon=" + currentLongitude +
      "&units=metric" +
      "&appid=" + this.props.configuration.portletInstance.weather_apikey;

    this.setState({ isWeatherLoading: true }, () => {
      axios
        .get(weatherURL)
        .then(response => response.data)
        .then(data => {
          this.setState({
            isWeatherLoading: false,
            currentWeatherCountry: currentCountry,
            currentTemperatureCelsius: Math.round(data.main.temp),
            currentTemperatureFahrenheit: Math.round(
              (data.main.temp * 9) / 5 + 32
            ),
            isCelsius: true,
            currentWeatherDescription: data.weather[0].main,
            currentIconURL:
              "https://openweathermap.org/img/w/" +
              data.weather[0].icon +
              ".png"
          });
        });
    });
  }

  fetchWeatherForecast(currentCountry, currentLatitude, currentLongitude) {
    const weatherForecastURL =
      "https://api.openweathermap.org/data/2.5/forecast" +
      "?lat=" + currentLatitude +
      "&lon=" + currentLongitude +
      "&units=metric" +
      "&appid=" + this.props.configuration.portletInstance.weather_apikey;

    axios
      .get(weatherForecastURL)
      .then(response => response.data)
      .then(data => {
        this.setState({
          currentForecastCountry: currentCountry,
          forecastData: data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
          )
        });
      });
  }

  fetchMapCoordinates(currentLatitude, currentLongitude) {
    this.setState({
      currentLatitude: currentLatitude,
      currentLongitude: currentLongitude
    });
  }

  fetchWebCamData(currentLocationISO_3166_1_alpha_2) {

    const webCamDataURL = "https://webcamstravel.p.rapidapi.com/webcams/list/country=" +
      currentLocationISO_3166_1_alpha_2.toUpperCase();

    const options = {
      method: 'GET',
      url: webCamDataURL,
      params: {
        lang: 'en',
        orderby: 'random',
        show: 'webcams:image,location'
      },
      headers: {
        'x-rapidapi-key': this.props.configuration.portletInstance.webcams_apikey,
        'x-rapidapi-host': 'webcamstravel.p.rapidapi.com'
      }
    };

    this.setState({ isWebCamLoading: true }, () => {
      axios.request(options)
        .then(response => response.data)
        .then(data => {
          this.setState({
            isWebCamLoading: false,
            webCamData: data.result.webcams
          });
        });
    });
  }

  fetchWikiData(currentWikiDescription, currentWikiURL) {
    this.setState({
      currentWikiDescription: currentWikiDescription,
      currentWikiURL: currentWikiURL
    });
  }

  fetchPictures(currentCountry) {
    const randomPicturesPageNumber = Math.floor(Math.random() * 20); //helps to display mostly new pictures upon refreshing the page

    const picturesDataURL =
      "https://api.unsplash.com/search/photos?page=" +
      randomPicturesPageNumber +
      "&query=" + currentCountry +
      "&client_id=" + this.props.configuration.portletInstance.pictures_apikey

    this.setState({ isPicturesLoading: true }, () => {
      axios
        .get(picturesDataURL)
        .then(response => response.data)
        .then(data => {
          this.setState({
            isPicturesLoading: false,
            picturesData: data.results
          });
        });
    });
  }

  render() {
    return (
      <div className={"container-fluid " + (this.state.isDarkMode ? 'widget-dark' : '')}>
        <AtwHeader
          toggleDarkMode={this.toggleDarkMode}
          isDarkMode={this.state.isDarkMode}
        />
        <AtwFlags
          currentFlags={this.state.currentFlags}
          handleClick={this.handleClick}
          toggleDarkMode={this.toggleDarkMode}
          isDarkMode={this.state.isDarkMode}
        />
        <AtwNavbar
          toggleDarkMode={this.toggleDarkMode}
          isDarkMode={this.state.isDarkMode}
          filterList={this.filterList}
          currentLocation={this.state.currentLocation}
          currentCountry={this.state.currentCountry}
          currentLocationISO_3166_1_alpha_2={
            this.state.currentLocationISO_3166_1_alpha_2
          }
          isTimeDateLoading={this.state.isTimeDateLoading}
          date={this.state.date}
          time={this.state.time}
        />
        <AtwLocalData
          toggleDarkMode={this.toggleDarkMode}
          isDarkMode={this.state.isDarkMode}
          isWeatherLoading={this.state.isWeatherLoading}
          isWebCamLoading={this.state.isWebCamLoading}
          isPicturesLoading={this.state.isPicturesLoading}
          currentLocation={this.state.currentLocation}
          currentGrowURL={this.state.currentGrowURL}
          currentWeatherCountry={this.state.currentWeatherCountry}
          currentTemperatureCelsius={this.state.currentTemperatureCelsius}
          currentTemperatureFahrenheit={this.state.currentTemperatureFahrenheit}
          setCelsius={this.setCelsius}
          setFahrenheit={this.setFahrenheit}
          isCelsius={this.state.isCelsius}
          currentWeatherDescription={this.state.currentWeatherDescription}
          currentIconURL={this.state.currentIconURL}
          currentForecastCountry={this.state.currentForecastCountry}
          forecastData={this.state.forecastData}
          currentLatitude={this.state.currentLatitude}
          currentLongitude={this.state.currentLongitude}
          webCamData={this.state.webCamData}
          currentCountry={this.state.currentCountry}
          currentWikiDescription={this.state.currentWikiDescription}
          currentWikiURL={this.state.currentWikiURL}
          picturesData={this.state.picturesData}
          mapsKey={this.props.configuration.portletInstance.maps_apikey}
        />
        <AtwFooter
          toggleDarkMode={this.toggleDarkMode}
          isDarkMode={this.state.isDarkMode}
        />
      </div>
    );
  }
}

export default function main({ portletNamespace, contextPath, portletElementId, configuration }) {
  ReactDOM.render(
    <App
      portletNamespace={portletNamespace}
      contextPath={contextPath}
      portletElementId={portletElementId}
      configuration={configuration}
    />,
    document.getElementById(portletElementId)
  );
}
