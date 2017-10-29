import * as ReadableAPI from '../ReadableAPI'

export const LOAD_POSTS = 'LOAD_POSTS'
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'

export const fetchPosts = () => dispatch => {
    ReadableAPI.getAllPosts().then( res => {

        const obj = res.reduce((acc, cur) => {
            acc[cur.id] = cur
            return acc
        }, {})

        dispatch(loadPosts(obj))
    })
}

export const loadPosts = (posts) => {
    return {
        type: LOAD_POSTS,
        posts
    }
}

export const votePost = (vote, id) => dispatch => {
    ReadableAPI.votePost(vote, id).then( res => {
        dispatch(updatePostScore(res))
    })
}

export const updatePostScore = (post) => {
    return {
        type: UPDATE_POST_SCORE,
        post
    }
}

export const uploadPost = (post) => dispatch => {
    ReadableAPI.createNewPost(post).then( res => {
        dispatch(createPost(res))
    }).then( () => dispatch(fetchPosts()))
}

export const createPost = (post) => {
    return {
        type: CREATE_POST,
        post
    }
}

export const removePost = (id) => dispatch => {
    ReadableAPI.deletePost(id).then( res => {
        dispatch(deletePost(res))
    })
}

export const deletePost = (post) => {
    return {
        type: DELETE_POST,
        post
    }
}

export const updatePost = (id, post) => dispatch => {
    ReadableAPI.editPost(id, post).then( res => {
        dispatch(editPost(res))
    }).then( () => dispatch(fetchPosts()))
}

export const editPost = (post) => {
    return {
        type: EDIT_POST,
        post
    }
}



