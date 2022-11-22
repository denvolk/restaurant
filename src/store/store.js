// store.js
import {reactive, ref} from 'vue'

export const store = reactive({
    menuOpened: false,
    //menuItems: ref([])
    menuItems: [],
    foods: ref([]),
    pageLanguages: [],
    pageLang: 'ru',
    foodItem: false,
    fullPageItem: false,
    shownItem: {
        id: 0,
        name: '',
        desc: '',
        weight: 0,
        amount: 0,
        img: '',
        ftype: '',
    },
})
