import * as ReadableAPI from '../ReadableAPI'

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export const loadCategories = (categories) => {
    return {
        type: LOAD_CATEGORIES,
        categories
    }
}

export const fetchCategories = () => dispatch => {
    ReadableAPI.getAllCategories().then( res => {
        const categories = res.categories
        dispatch(loadCategories(categories))
    })
}