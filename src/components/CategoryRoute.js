import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { filterPosts } from '../actions'

class CategoryRoute extends Component {

    componentWillUpdate() {
        const filter = this.props.filter
        this.props.filterPosts(filter)
    }

    render() {
        const filter = this.props.filter
        this.props.filterPosts(filter)

        if (filter) {
            return(
                <div><Link to='/' className='link'>/all</Link>/{filter}</div>
            )
        } else {
            return(
                <div>/all</div>
            )
        }
        
    }
}

CategoryRoute.defaultProps = {
    filter: ''
}


const mapDispatchToProps = dispatch => ({
    filterPosts: (filter) => dispatch(filterPosts(filter))
})


export default connect(null, mapDispatchToProps, null, {pure:false})(CategoryRoute);

