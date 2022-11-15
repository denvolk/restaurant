// store.js
import {reactive, ref} from 'vue'

export const store = reactive({
    menuOpened: false,
    //menuItems: ref([])
    menuItems: [],
    foods: [],
    //pageLanguages: [],
    pageLang: 'ru',
    foodItem: false,
    fullPageItem: false,
    shownItem: {
        id: 0,
        name: 'name',
        desc: 'desc',
        weight: 'weight',
        amount: 'amount',
        img: 'pizza',
    },
})
