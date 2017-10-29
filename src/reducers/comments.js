import {
    LOAD_COMMENTS,
    UPDATE_COMMENT_SCORE,
    CREATE_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
} from '../actions/comments'

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
        case UPDATE_COMMENT_SCORE:
            return {
                ...state,
                [comment.id]: {
                    ...state[comment.id],
                    voteScore: comment.voteScore
                }
            }
        case EDIT_COMMENT:
            return {
                ...state,
                [comment.id]: comment
            }

        case CREATE_COMMENT:
            return {
                ...state,
                [comment.id]: {
                    ...comment
                }
            }
        default:
            return state
    }
}

export default comments