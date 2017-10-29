import {
    LOAD_POSTS,
    UPDATE_POST_SCORE,
    CREATE_POST,
    DELETE_POST,
    EDIT_POST,
} from '../actions/posts'

const posts = (state = {}, action) => {
    const { posts, post } = action

    switch (action.type) {
        case LOAD_POSTS:
            return Object.assign(...state, posts)
        case UPDATE_POST_SCORE:
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

export default posts