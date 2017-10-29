import {
    SORT_POSTS,
    SORT_COMMENTS,
    FILTER_POSTS,
    SHOW_POST_DETAILS,
} from '../actions/ui'

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

export default ui