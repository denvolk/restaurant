<a id="english_readme_anchor"></a>
# Restaurant [\(Russian readme version\)](#russian_readme_anchor)

<a id="live_version_anchor"></a>
## GitHub Pages:
https://denvolk.github.io/restaurant

## About
Test website illustrating restaurant menu and delivery in different languages  

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
and Vue vanilla store for State Managment  

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

<a id="russian_readme_anchor"></a>
# Ресторан [\(English readme version\)](#english_readme_anchor)

<a id="live_version_anchor_ru"></a>
## GitHub Pages:
https://denvolk.github.io/restaurant

## Описание
Сайт имитирующий меню ресторана с возможностью доставки на разных языках  

## Оглавление
1. [Используемые технологии](#technologies_anchor_ru)
2. [Дополнительная информация по FrontEnd](#front_info_anchor_ru)
3. [Дополнительная информация по BackEnd](#back_info_anchor_ru)

<a id="technologies_anchor_ru"></a>
## Используемые технологии
Сайт написан с использованием:  
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

<a id="front_info_anchor_ru"></a>
## Дополнительная информация по FrontEnd
Данное SPA написано с использованием Vue.js 2.6 и Vue Router,  
а также Vue vanilla store для State Managment  

Данный сайт поддерживает несколько языков для лучшего взаимодействия с пользователем  

Весь текст меню на разных языках хранится в "Базах Данных"  
Весь текст страницы на разных языках хранится в "Языковой Базе Данных"  

[Дополнительная информация о \"Базах Данных\"](#back_info_anchor_ru)

Данные корзины хранятся локально в cookies используя библиотеку [vue-cookies](https://www.npmjs.com/package/vue-cookies)

<a id="back_info_anchor_ru"></a>
## Дополнительная информация по BackEnd
BackEnd эмулируется с использованием [json-server](https://www.npmjs.com/package/json-server)(локальная версия) или  
[My JSON Server](https://my-json-server.typicode.com)(публичная версия) загруженная на [GitHub Pages](https://pages.github.com)  
[Live version](#live_version_anchor_ru)  

Из-за ограничений длины "Базы данных" в 10000 символов при использовании [My JSON Server](https://my-json-server.typicode.com),  
все данные необходимые для текста меню хранятся в разных "Базах данных" разделенных по языкам,  
все данные для текста страницы хранятся в одной "Базе данных" (если используется не более 3 языков)  

Ссылки на "Базы данных":  
1. Текст меню:
   + [Меню на английском](https://github.com/denvolk/restaurant-test) файл db.json
   + [Меню на Русском](https://github.com/denvolk/restaurant-test) файл db.json
   + [Меню на транслитерированном Русском](https://github.com/denvolk/restaurant-test) (для тестирования) файл db.json
2. Текст страницы:
   + [Текст страницы на трех языках](https://github.com/denvolk/restaurant-db) файл db.json
