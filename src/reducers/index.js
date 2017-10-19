import {
    LOAD_CATEGORIES,
    LOAD_POSTS,
    UPDATE_POST,
    SORT_POSTS
} from '../actions'
import { combineReducers } from 'redux'

const categories = (state = {}, action) => {
    const { categories } = action

    switch (action.type) {
        case LOAD_CATEGORIES:
            return Object.assign(...state , categories)
    
        default:
            return state
    }
}

const posts = (state = {}, action) => {
    const { posts, post } = action

    switch (action.type) {
        case LOAD_POSTS:
            return Object.assign(...state, posts)
        case UPDATE_POST:
            return {
                ...state,
                [post.id]: {
                    ...state[post.id],
                    voteScore: post.voteScore
                }
            }
        default:
            return state
    }
}

const ui = (state = {}, action) => {
    const { sorting } = action

    switch (action.type) {
        case SORT_POSTS:
            return {
                ...state,
                sorting
            }
        default:
            return state
    }
}

export default combineReducers({
    categories, posts, ui
})