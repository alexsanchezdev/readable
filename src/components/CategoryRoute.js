import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { filterPosts, showPostDetails, sortPosts } from '../actions'

class CategoryRoute extends Component {

    componentDidUpdate() {
        const filter = this.props.filter
        this.props.showDetails(null)
        this.props.filterPosts(filter)
    }

    componentDidMount() {
        const filter = this.props.filter
        this.props.showDetails(null)
        this.props.filterPosts(filter)
    }

    handleSort = (e) => {
        
        const value = e.target.value
        const sorts = value.split('_')
        
        if (sorts[0] === 'highest') {
            this.props.sortPosts({
                parameter: sorts[1],
                lowestFirst: false
            })
        } else {
            this.props.sortPosts({
                parameter: sorts[1],
                lowestFirst: true
            })
        }  
    }
    

    render() {
        const filter = this.props.filter
        
        if (filter) {
            return(
                <div className='nav-bar'>
                    <div><Link to='/' className='link'>/all</Link>/{filter}</div>
                    <div className='sort'>
                    <select onChange={(e) => this.handleSort(e)}>
                        <option value='highest_voteScore' name='voteScore'>Sort by score (highest first)</option>
                        <option value='lowest_voteScore' name='voteScore'>Sort by score (lowest first)</option>
                        <option value='highest_timestamp' name='timestamp'>Sort by time (newest first)</option>
                        <option value='lowest_timestamp' name='timestamp'>Sort by time (oldest first)</option>
                    </select>
                </div>
                </div>
            )
        } else {
            return(
                <div className='nav-bar'>
                <div>/all</div>
                <div className='sort'>
                <select onChange={(e) => this.handleSort(e)}>
                    <option value='highest_voteScore' name='voteScore'>Sort by score (highest first)</option>
                    <option value='lowest_voteScore' name='voteScore'>Sort by score (lowest first)</option>
                    <option value='highest_timestamp' name='timestamp'>Sort by time (newest first)</option>
                    <option value='lowest_timestamp' name='timestamp'>Sort by time (oldest first)</option>
                </select>
            </div>
            </div>
            )
        }
        
    }

}

CategoryRoute.defaultProps = {
    filter: ''
}


const mapDispatchToProps = dispatch => ({
    filterPosts: (filter) => dispatch(filterPosts(filter)),
    showDetails: (id) => dispatch(showPostDetails(id)),
    sortPosts: (sorting) => dispatch(sortPosts(sorting))
})


export default connect(null, mapDispatchToProps, null, {pure:false})(CategoryRoute);

