import {
    LOAD_CATEGORIES,
    LOAD_POSTS,
    LOAD_COMMENTS,
    UPDATE_SCORE,
    SORT_POSTS,
    SORT_COMMENTS,
    FILTER_POSTS,
    CREATE_POST,
    DELETE_POST,
    DELETE_COMMENT,
    EDIT_POST,
    SHOW_POST_DETAILS,
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
    const { comments, comment } = action
    
    switch (action.type) {
        case LOAD_COMMENTS:
            return Object.assign(...state, comments)
        case DELETE_COMMENT:
            return {
                ...state,
                [comment.id]: {
                    ...state[comment.id],
                    deleted: comment.deleted
                }
            }
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
        case SORT_COMMENTS:
            return {
                ...state,
                commentsSorting: sorting
            }
        case FILTER_POSTS:
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