import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showPostDetails, sortComments } from '../actions'
import Post from './Post'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import { fetchComments } from '../actions'
import '../styles/PostDetails.css'
import { sort } from '../helpers'

class PostDetails extends Component {

    componentDidMount() {
        const { id } = this.props.data
        this.props.showPostDetails(id)
        this.props.loadComments(id)
        this.props.sortComments({
            parameter: 'voteScore',
            lowestFirst: false
        })
    }

    componentWillUnmount() {
        this.props.loadComments(null)
    }

    renderComments = () => {
        const { comments } = this.props

        const commentsView = comments.filter( comment => comment.deleted === false).map( comment => {
            return (
                <Comment key={comment.id} data={comment}/>
            )
        })

        if (commentsView.length < 1) {
            return (<p id='no-comments'>No comments in this post.</p>)
        } else {
            return commentsView
        }
    }

    handleSort = (e) => {
        
        const value = e.target.value
        const sorts = value.split('_')
        
        if (sorts[0] === 'highest') {
            this.props.sortComments({
                parameter: sorts[1],
                lowestFirst: false
            })
        } else {
            this.props.sortComments({
                parameter: sorts[1],
                lowestFirst: true
            })
        }  
    }

    render() {
        const { category } = this.props.data
        return (
            <div>
                <div className='nav-bar'>
                    <div>
                        <Link to='/' className='link'>/all</Link>
                        <Link to={`/${category}`} className='link'>/{category}</Link>
                        /post
                    </div>
                </div>

                <div>
                    <Post data={this.props.data} editEnable={false} />
                    <div className='comments-section'>
                        <div className='comments-section-title'>
                        <div><p>/comments</p></div>
                        <div className='comments-sort'>
                            <select onChange={(e) => this.handleSort(e)}>
                                <option value='highest_voteScore' name='voteScore'>Sort by score (highest first)</option>
                                <option value='lowest_voteScore' name='voteScore'>Sort by score (lowest first)</option>
                                <option value='highest_timestamp' name='timestamp'>Sort by time (newest first)</option>
                                <option value='lowest_timestamp' name='timestamp'>Sort by time (oldest first)</option>
                            </select>
                        </div>
                        </div>
                        <div>
                        <button onClick={this.props.open}>NEW COMMENT</button>
                        </div>
                    </div>
                    <div className='comments-feed'>
                        {this.renderComments()}
                    </div>
                    
                    
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    showPostDetails: (id) => dispatch(showPostDetails(id)),
    loadComments: (id) => dispatch(fetchComments(id)),
    sortComments: (sorting) => dispatch(sortComments(sorting))
})

const mapStateToProps = (state, props) => {
    const sorting = state.ui.commentsSorting
    const commentsArray = Object.entries(state.comments).map( comment => comment[1])

    if (sorting) {
        const sorted = sort(commentsArray, sorting.parameter, sorting.lowestFirst)
        
        return {
            comments: sorted
        }
    }

    return{}

}

PostDetails.defaultProps = {
    comments: []
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)