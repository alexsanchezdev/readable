import {
    LOAD_CATEGORIES,
    LOAD_POSTS,
    UPDATE_SCORE,
    SORT_POSTS,
    FILTER_POSTS,
    CREATE_POST,
    DELETE_POST,
    EDIT_POST
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
        case UPDATE_SCORE:
            return {
                ...state,
                [post.id]: {
                    ...state[post.id],
                    voteScore: post.voteScore
                }
            }
        case CREATE_POST:
            return {
                ...state,
                [post.id]: {
                    post
                }
            }
        case DELETE_POST:
            return {
                ...state,
                [post.id]: {
                    ...state[post.id],
                    deleted: post.deleted
                }
            }

        case EDIT_POST:
            return {
                ...state,
                [post.id]: post
            }
        default:
            return state
    }
}

const ui = (state = {}, action) => {
    const { sorting, filter } = action

    switch (action.type) {
        case SORT_POSTS:
            return {
                ...state,
                sorting
            }
        case FILTER_POSTS:
            return {
                ...state,
                filter
            }
        default:
            return state
    }
}

export default combineReducers({
    categories, posts, ui
})