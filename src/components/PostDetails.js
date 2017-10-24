import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showPostDetails } from '../actions'

class PostDetails extends Component {

    componentDidMount() {
        this.props.showPostDetails(this.props.data.id)
    }

    render() {
        return (
            <div>Hello from post details component!</div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    showPostDetails: (id) => dispatch(showPostDetails(id)),
  })

export default connect(null, mapDispatchToProps)(PostDetails)