import React, { Component } from 'react'
import '../styles/Post.css'
import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import ArrowUp from 'react-icons/lib/md/keyboard-arrow-up'
import { timeAgo } from '../helpers'
import { connect } from 'react-redux'
import { votePost } from '../actions'

class Post extends Component {

    votePost = (vote) => {
        this.props.votePost(vote, this.props.data.id)
    }

    render() {
        return(
            <div className='post-container'>
                <div className='vote-container'>
                    <button id='arrow-up' onClick={() => { this.votePost('upVote') }}><ArrowUp size={36} /></button>
                    <p>{this.props.data.voteScore}</p>
                    <button id='arrow-down' onClick={() => { this.votePost('downVote') }}><ArrowDown size={36}/></button>
                </div>
                <div className='details-container'>
                    <div className='post-title'>
                        {this.props.data.title}
                    </div>
                    <div className='post-body'>
                        {this.props.data.body}
                    </div>
                    <div className='post-info'>
                        {`${this.props.data.author} • ${timeAgo(this.props.data.timestamp)} • ${this.props.data.commentCount} comments`}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    votePost: (vote, id) => dispatch(votePost(vote, id))
  })

export default connect(null, mapDispatchToProps)(Post)