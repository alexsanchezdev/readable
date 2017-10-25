import {
    LOAD_CATEGORIES,
    LOAD_POSTS,
    LOAD_COMMENTS,
    UPDATE_SCORE,
    SORT_POSTS,
    FILTER_POSTS,
    CREATE_POST,
    DELETE_POST,
    EDIT_POST,
    SHOW_POST_DETAILS
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

const comments = (state = {}, action) => {
    const { comments, id } = action
    
    switch (action.type) {
        case LOAD_COMMENTS:
            if (id) {
                if (Object.keys(state).length < 1) {
                    return Object.assign(state, {
                        [id]: comments
                    })
                } else {
                    return {
                        ...state,
                        [id]: comments
                    }
                }
            }
            
            return state
            
        default:
            return state
    }
}

const ui = (state = {}, action) => {
    const { sorting, filter, id } = action

    switch (action.type) {
        case SORT_POSTS:
            return {
                ...state,
                postSorting: sorting
            }
        case FILTER_POSTS:
            console.log(state.posts)
            return {
                ...state,
                postFilter: filter
            }
        case SHOW_POST_DETAILS:
            return {
                ...state,
                showDetails: id
            }
        default:
            return state
    }
}

export default combineReducers({
    categories, posts, comments, ui
})