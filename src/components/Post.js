import React, { Component } from 'react'
import '../styles/Post.css'
import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import ArrowUp from 'react-icons/lib/md/keyboard-arrow-up'
import Edit from 'react-icons/lib/md/edit'
import Delete from 'react-icons/lib/md/delete'
import { timeAgo } from '../helpers'
import { connect } from 'react-redux'
import { votePost, removePost, updatePost } from '../actions'
import CreateEdit from './CreateEdit'
import Modal from 'react-modal'

class Post extends Component {

    state = {
        modalIsOpen: false
    }

    votePost = (vote) => {
        this.props.votePost(vote, this.props.data.id)
    }

    deletePost = () => {
        this.props.deletePost(this.props.data.id)
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
                        <div>
                            {`${this.props.data.author} • ${timeAgo(this.props.data.timestamp)} • ${this.props.data.commentCount} comments`}
                        </div>
                        <div id='edit-delete-icons'>
                            <Edit id='edit' size={16}/>
                            <Delete id='delete' size={16} onClick={this.deletePost}/>
                            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
                                <CreateEdit close={this.closeModal}/>
                            </Modal>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    votePost: (vote, id) => dispatch(votePost(vote, id)),
    deletePost: (id) => dispatch(removePost(id)),
    editPost: (post) => dispatch(editPost(post))
  })

export default connect(null, mapDispatchToProps)(Post)