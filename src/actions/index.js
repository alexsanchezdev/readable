import * as ReadableAPI from '../ReadableAPI'

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const UPDATE_SCORE = 'UPDATE_SCORE'
export const SORT_POSTS = 'SORT_POSTS'
export const SORT_COMMENTS = 'SORT_COMMENTS'
export const FILTER_POSTS = 'FILTER_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const SHOW_POST_DETAILS = 'SHOW_POST_DETAILS'

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

export const loadComments = (id, comments) => {
    return {
        type:LOAD_COMMENTS,
        comments,
        id
    }
}

export const updateScore = (post) => {
    return {
        type: UPDATE_SCORE,
        post
    }
}

export const sortPosts = (sorting) => {
    return {
        type: SORT_POSTS,
        sorting
    }
}

export const sortComments = (sorting) => {
    return {
        type: SORT_COMMENTS,
        sorting
    }
}

export const filterPosts = (filter) => {
    return {
        type: FILTER_POSTS,
        filter
    }
}

export const createPost = (post) => {
    return {
        type: CREATE_POST,
        post
    }
}

export const deletePost = (post) => {
    return {
        type: DELETE_POST,
        post
    }
}

export const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

export const editPost = (post) => {
    return {
        type: EDIT_POST,
        post
    }
}

export const showPostDetails = (id) => {
    return {
        type: SHOW_POST_DETAILS,
        id
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

export const fetchComments = (id) => dispatch => {
    ReadableAPI.getAllComments(id).then( res => {
        const obj = res.reduce((acc, cur) => {
            acc[cur.id] = cur
            return acc
        }, {})

        dispatch(loadComments(id, obj))
    })
}

export const votePost = (vote, id) => dispatch => {
    ReadableAPI.votePost(vote, id).then( res => {
        dispatch(updateScore(res))
    })
}

export const uploadPost = (post) => dispatch => {
    ReadableAPI.createNewPost(post).then( res => {
        dispatch(createPost(res))
    }).then( () => dispatch(fetchPosts()))
}

export const removePost = (id) => dispatch => {
    ReadableAPI.deletePost(id).then( res => {
        dispatch(deletePost(res))
    })
}

export const removeComment = (id) => dispatch => {
    ReadableAPI.deleteComment(id).then( res => {
        dispatch(deleteComment(res))
    })
}

export const updatePost = (id, post) => dispatch => {
    ReadableAPI.editPost(id, post).then( res => {
        dispatch(editPost(res))
    }).then( () => dispatch(fetchPosts()))
}
