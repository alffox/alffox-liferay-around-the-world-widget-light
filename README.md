# Liferay Around the World React portlet

![A paper airplane](https://github.com/alffox/npm-react-liferay-around-the-world-portlet/blob/master/src/main/resources/META-INF/resources/images/logo.svg)

Liferay Around the World is a Liferay 7.2 DXP widget showing information for Liferay locations around the world: https://www.liferay.com/locations

All APIs have been used for demo, non-commercial purposes. You may read more here: https://github.com/alffox/liferay-around-the-world-widget#api--credit

## Purpose of this project

Back in late 90's when having an internet connection was not always possible, I used to get to know people from all over the world through paper letters. At a point, I decided to ask each of my penpals to draw a flag of the country they were writing from and send it back to me. Eventually, after collecting all of them, I could get a huge poster, hanging on my room's wall, showing me the colors of the world I was in touch with. This project is inspired by those times.

Where are my co-workers worldwide living? What's going on at their location right now? How can I get to know better other Liferay offices in worldwide countries? What's going on at my location at the moment? How can I get useful information, all in one place?

**Liferay Around the World** would like to cover this needs and encourage the global mutual knowledge of our countries. The name is inspired by a popular song of the late 90's: https://en.wikipedia.org/wiki/Around_the_World_(Red_Hot_Chili_Peppers_song)

## How to run the app?

See the docs: https://github.com/liferay/liferay-js-toolkit/wiki/How-to-use-generator-liferay-js

See the npm scripts guide: https://github.com/liferay/liferay-js-toolkit/wiki/Running-build-npm-scripts

## Information displayed

The **Navigation bar** displays the currently selected location, the current date and time at that location plus other available locations, ordered in dropdown lists by continents

**Time and Date** will appear under the flags list at the top and they will indicate the current time and date on the clicked location

**Official Grow page** has a hyperlink to the official Grow page for that location on the Liferay's internal Grow website

**Weather** displays the weather and temperature at the selected location and forecasts for the next 5 days. Buttons to switch between Celsius and Fahrenheit are also provided

**Map** represents the currently selected location on Google Maps

**Nearby web cams** shows 10 web cams snapshots in a slider, taken at the current location and time

**Wiki** shows the first information for the selected country from Wikipedia.org

**Pictures** shows selected pictures for the selected country

## Technical details

This project was bootstrapped with the generator-liferay-js [https://github.com/liferay/liferay-js-toolkit/wiki/How-to-use-generator-liferay-js), using the React Widget template.
The app is optimized for being used on mobile devices through [Bootstrap CSS](https://getbootstrap.com/docs/4.1/getting-started/introduction/) and [Clay UI](https://clayui.com/)

The backend runs through: https://github.com/alffox/around-the-world-backend/blob/master/index.js

### API / Credit

- [TimeZoneDB.com](https://timezonedb.com/)
- [OpenWeatherMap](https://openweathermap.org/)
- [GoogleMaps API](https://developers.google.com/maps/documentation/)
- [Webcams.travel](https://www.webcams.travel/)
- [Unsplash](https://unsplash.com/)