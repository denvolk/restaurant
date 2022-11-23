// store.js
import {reactive, ref} from 'vue'

export const store = reactive({
    menuOpened: false,
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
})
