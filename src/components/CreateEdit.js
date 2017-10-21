import React, { Component } from 'react'
import '../styles/CreateEdit.css'
import { connect } from 'react-redux'
import { uploadPost } from '../actions'

class CreateEdit extends Component {

    state = {
        title: 'Sample title',
        body: 'Sample body',
        author: 'alxsnchez',
        category: 'react'
    }

    handleSubmit = (e) => {
        const { title, body, author, category } = this.state
        
        this.props.uploadPost({title, body, author, category}) 
        e.preventDefault()
        this.props.close()
    }

    handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value

        console.log(e.target.id)
        this.setState({[id]: value})
    }

    render() {
        return(
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input id='title' type='text' placeholder='Title' onChange={(e) => this.handleChange(e)} />
                    <textarea id='body' type='text' placeholder='Write your post here...' onChange={(e) => this.handleChange(e)}/>
                    <div className='footer'>
                        <input id='author' type='text' placeholder='Author' onChange={(e) => this.handleChange(e)}/>
                        <div className='send'>
                            <select id='category' onChange={(e) => this.handleChange(e)}>
                                <option value='react'>react</option>
                                <option value='redux'>redux</option>
                                <option value='udacity'>udacity</option>
                            </select>
                            <input type='submit' value='SAVE'/>
                        </div> 
                    </div>
                </form>
            </div>
        ) 
    }
}

const mapDispatchToProps = dispatch => ({
    uploadPost: (post) => dispatch(uploadPost(post))
})

export default connect(null, mapDispatchToProps)(CreateEdit)