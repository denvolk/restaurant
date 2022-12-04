// store.js
import {reactive, ref} from 'vue'

export const store = reactive({
    cookie: '',
    cookieName: 'denvolkpizza',
    cookieExists: false,
    cookieTime: 3600,
    menuOpened: true,
    cartOpened: false,
    /*cartItems: [{"name": "BBQ Big", "amount": 2},{"name": "Ham and mushrooms Small", "amount": 1},{"name": "Soup Tom Yum with seafood", "amount": 10}],*/
    cartItems: [],
    menuItems: [],
    foods: ref([]),
    pageLanguages: [],
    pageLang: 'ru',
    foodItem: false,
    fullPageItem: false,
    itemOpened: false,
    shownItem: {
        id: 0,
        name: '',
        desc: '',
        weight: 0,
        img: '',
    },
    orderBtn: 'Оформить заказ',
    cartEmptyText: 'Корзина пуста',
    clearCartBtn: 'Очистить корзину',
})
