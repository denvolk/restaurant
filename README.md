# Restaurant

<a id="live_version_anchor"></a>
## Live version:
https://denvolk.github.io/restaurant

## About
Test website illustrating restaurant menu and delivery  

## Table of contents
1. [Technologies](#technologies_anchor)
2. [FrontEnd additional information](#front_info_anchor)
3. [BackEnd additional information](#back_info_anchor)

<a id="technologies_anchor"></a>
## Technologies
This website made using:  
1. FrontEnd
   + Vue.js 2.6
   + Vue Router
   + Vue vanilla State Managment: store
   + [vue-cookies](https://www.npmjs.com/package/vue-cookies) library
   + HTML5, CSS3
   + ES5
   + AJAX
2. BackEnd
   + [My JSON Server](https://my-json-server.typicode.com)

<a id="front_info_anchor"></a>
## FrontEnd additional information
This SPA made using Vue.js 2.6 with Vue Router  
and vanilla store for State Managment  

This website can use different languages for better user experience  

All menu text in different languages is stored in "Data Bases"  
All page text in different languages is stored in "Language Data Base"  

[Additional info about \"Data Bases\"](#back_info_anchor)

Shopping Cart data is stored locally in cookies using [vue-cookies](https://www.npmjs.com/package/vue-cookies) library

<a id="back_info_anchor"></a>
## BackEnd additional information
BackEnd is mocked using [json-server](https://www.npmjs.com/package/json-server)(local version) or  
[My JSON Server](https://my-json-server.typicode.com)(public version) uploaded to [GitHub Pages](https://pages.github.com)  
[Live version](#live_version_anchor)  

Because of limitation in "DB" length in characters(10000) when using [My JSON Server](https://my-json-server.typicode.com),  
all data necessary for menu text is stored in different "Data Bases" per language,  
all data for page text is stored in one "Data Base" (if using not more than 3 languages)  

"Data Bases" links:  
1. Menu text:
   + [Menu in English](https://github.com/denvolk/restaurant-test) file db.json
   + [Menu in Russian](https://github.com/denvolk/restaurant-test) file db.json
   + [Menu in transliterated Russian](https://github.com/denvolk/restaurant-test) (for testing) file db.json
2. Page text:
   + [Page text in 3 languages](https://github.com/denvolk/restaurant-db) file db.json
