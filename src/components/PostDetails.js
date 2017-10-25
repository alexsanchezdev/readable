import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showPostDetails } from '../actions'
import Post from './Post'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import { fetchComments } from '../actions'

const comment = {
    voteScore: 24,
    body: 'Test body',
    author: 'test',
    timestamp: 1987283674
}

class PostDetails extends Component {

    componentDidMount() {
        const { id } = this.props.data
        this.props.showPostDetails(id)
        this.props.loadComments(id)

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
                
                <Post data={this.props.data} />
                <Comment data={comment} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    showPostDetails: (id) => dispatch(showPostDetails(id)),
    loadComments: (id) => dispatch(fetchComments(id)),
  })

export default connect(null, mapDispatchToProps)(PostDetails)