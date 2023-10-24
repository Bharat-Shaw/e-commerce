const store = JSON.parse(localStorage.getItem('store'));

const initialState = store || {
    IsAuth: {},
    Registered: [],
    cart: []
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "AUTH":
            return { ...state, IsAuth: action.payload }
        case "LOGOUT":
            return { ...state, IsAuth: {} }
        case "CART":
            return { ...state, cart: [...state.cart, action.payload] }
        case "UPDATECART":
            return { ...state, cart: action.payload }
        case "REGISTER":
            return { ...state, Registered: [...state.Registered, action.payload] }
        default:
            return state
    }
}

export default reducer