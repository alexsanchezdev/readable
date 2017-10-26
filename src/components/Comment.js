import React, { Component } from 'react'
import '../styles/Comment.css'
import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import ArrowUp from 'react-icons/lib/md/keyboard-arrow-up'
import Edit from 'react-icons/lib/md/edit'
import Delete from 'react-icons/lib/md/delete'
import { timeAgo } from '../helpers'
import { connect } from 'react-redux'
import { votePost, removePost } from '../actions'
import CreateEdit from './CreateEdit'
import Modal from 'react-modal'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
}

class Comment extends Component {

    state = {
        modalIsOpen: false
    }

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }

    // votePost = (vote) => {
    //     this.props.votePost(vote, this.props.data.id)
    // }

    // deletePost = () => {
    //     this.props.deletePost(this.props.data.id)
    // }

    render() {

        const { voteScore, body, author, timestamp } = this.props.data

        return(
            <div className='comment-container'>
                <div className='comment-vote-container'>
                    <button id='arrow-up' onClick={() => { this.votePost('upVote') }}><ArrowUp size={24} /></button>
                    <p>{voteScore}</p>
                    <button id='arrow-down' onClick={() => { this.votePost('downVote') }}><ArrowDown size={24}/></button>
                </div>
                <div className='comment-details-container'>
                    <div className='comment-title'>
                        <div id='author-title'>{author}</div>
                        <div id='timestamp-title'>{timeAgo(timestamp)}</div>
                    </div>
                    <div className='comment-body'>
                        {body}
                    </div>
                    <div className='comment-info'>
                        <div id='edit-delete-icons'>
                            <Edit id='edit' size={16} onClick={this.openModal}/>
                            <Delete id='delete' size={16} onClick={this.deletePost}/>
                            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
                                <CreateEdit close={this.closeModal} data={this.props.data} isEditing={true}/>
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
  })

export default connect(null, mapDispatchToProps)(Comment)