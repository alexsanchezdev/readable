import * as ReadableAPI from '../ReadableAPI'

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const LOAD_POSTS = 'LOAD_POSTS'
export const UPDATE_POST = 'UPDATE_POST'
export const SORT_POSTS = 'SORT_POSTS'
export const FILTER_POSTS = 'FILTER_POSTS'

export const loadCategories = (categories) => {
    return {
        type: LOAD_CATEGORIES,
        categories
    }
}

export const loadPosts = (posts) => {
    return {
        type: LOAD_POSTS,
        posts
    }
}

export const updateScore = (post) => {
    return {
        type: UPDATE_POST,
        post
    }
}

export const sortPosts = (sorting) => {
    return {
        type: SORT_POSTS,
        sorting
    }
}

export const filterPosts = (filter) => {
    return {
        type: FILTER_POSTS,
        filter
    }
}

export const fetchCategories = () => dispatch => {
    ReadableAPI.getAllCategories().then( res => {
        const categories = res.categories
        dispatch(loadCategories(categories))
    })
}

export const fetchPosts = () => dispatch => {
    ReadableAPI.getAllPosts().then( res => {

        const obj = res.reduce((acc, cur) => {
            acc[cur.id] = cur
            return acc
        }, {})

        dispatch(loadPosts(obj))
    })
}

export const votePost = (vote, id) => dispatch => {
    ReadableAPI.votePost(vote, id).then( res => {
        dispatch(updateScore(res))
    })
}