# Liferay Around the World React lite

![A paper airplane](https://github.com/alffox/liferay-around-the-world-widget/blob/master/assets/images/logo.svg)

Liferay Around the World is a Liferay 7.1+ DXP widget showing information for Liferay locations around the world: https://www.liferay.com/locations

All APIs have been used for demo, non-commercial purposes. You may read more here: https://github.com/alffox/liferay-around-the-world-widget-lite#api--credit

## Purpose of this project

Back in late 90's when having an internet connection was not always possible, I used to get to know people from all over the world through paper letters. At a point, I decided to ask each of my penpals to draw a flag of the country they were writing from and send it back to me. Eventually, after collecting all of them, I could get a huge poster, hanging on my room's wall, showing me the colors of the world I was in touch with. This project is inspired by those times.

Where are my co-workers worldwide living? What's going on at their location right now? How can I get to know better other Liferay offices in worldwide countries? What's going on at my location at the moment? How can I get useful information, all in one place?

**Liferay Around the World** would like to cover this needs and encourage the global mutual knowledge of our countries. The name is inspired by a popular song of the late 90's: https://en.wikipedia.org/wiki/Around_the_World_(Red_Hot_Chili_Peppers_song)

## How to run the app?

### Deploy the compiled package
1) Get the deployable package from https://github.com/alffox/liferay-around-the-world-widget-lite/releases
2) While Liferay DXP is runnig, drop the package in the deploy folder
3) Wait for the Liferay logs to print an information similar to the one below:

```
08:36:33.930 INFO  INFO  [Refresh Thread: Equinox Container: 3289ac5a-00ae-4408-8b05-9859af796290][BundleStartStopLogger:46] STARTED liferay-around-the-world-lite_1.0.0 [1138]
```
4) Sign in to Liferay, click on the top-right "+" icon > Add > Widgets > Grow Community > Liferay Around the World > add it to the page
5) Go to the widget's ellipsis icon (the 3 vertical dots icon next to the title) > Configuration
6) Enter the API keys for all services > Save > Close

### Compile the package
1) Install the Generator Liferay JS as per https://github.com/liferay/liferay-js-toolkit/wiki/How-to-use-generator-liferay-js
2) Have a Liferay DXP 7.1+ environment running
3) Clone the repo locally on your machine and open a Terminal window in its root folder
4) Verify that the Liferay home directory at https://github.com/alffox/liferay-around-the-world-widget-lite/blob/master/.npmbuildrc#L2 is correctly set, if not, change it
5) Run `npm install` to install the dependencies
6) Run `npm run deploy` to build and deploy the widget

7) Wait for the Liferay logs to print an information similar to the one below:

```
08:36:33.930 INFO  INFO  [Refresh Thread: Equinox Container: 3289ac5a-00ae-4408-8b05-9859af796290][BundleStartStopLogger:46] STARTED liferay-around-the-world-lite_1.0.0 [1138]
```
8) Sign in to Liferay, click on the top-right "+" icon > Add > Widgets > Grow Community > Liferay Around the World > add it to the page
9) Go to the widget's ellipsis icon (the 3 vertical dots icon next to the title) > Configuration
10) Enter the API keys for all services > Save > Close

Official docs: https://github.com/liferay/liferay-js-toolkit/wiki/How-to-use-generator-liferay-js

Npm scripts guide: https://github.com/liferay/liferay-js-toolkit/wiki/Running-build-npm-scripts

## Information displayed

The **Navigation bar** displays the currently selected location, the current date and time at that location and a search bar to find a location among the available ones.

**Pictures** shows selected pictures for the selected country.

**Official Grow page** has a hyperlink to the official Grow page for that location on the Liferay's internal Grow website.

**Weather** displays the weather and temperature at the selected location and forecasts for the next 5 days.

**Map** represents the currently selected location on Google Maps.

**Nearby web cams** shows country web cams snapshots in a slider.

## Technical details

This project was bootstrapped with the `generator-liferay-js` https://github.com/liferay/liferay-js-toolkit/wiki/How-to-use-generator-liferay-js, using the React Widget template.
The app is optimized for being used on mobile devices through [Bootstrap CSS](https://getbootstrap.com/docs/4.1/getting-started/introduction/) and [Clay UI](https://clayui.com/)

### API / Credit

- [TimeZoneDB.com](https://timezonedb.com/)
- [Unsplash](https://unsplash.com/)
- [OpenWeatherMap](https://openweathermap.org/)
- [GoogleMaps API](https://developers.google.com/maps/documentation/)
- [Webcams.travel](https://www.webcams.travel/)
