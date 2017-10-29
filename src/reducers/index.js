import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import comments from './comments'
import ui from './ui'

const reducer = combineReducers({
    categories, posts, comments, ui
})

export default reducer