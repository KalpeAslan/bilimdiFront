

const defaultStore = {
    currentLanguage: 'kz'
}

export function globalReducer(store = defaultStore, action: any) {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            return {...store, currentLanguage: action.value}
        default:
            return store
    }
}