import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom'
import CategoryRoute from './CategoryRoute'
import Feed from './Feed'
import { connect } from 'react-redux'
import { sortPosts } from '../actions'

class Main extends Component {

    componentDidMount() {
        this.props.sortPosts({
            parameter: 'voteScore',
            lowestFirst: false
        })
    }

    render() {
        return(
            <div>
            <div className='nav-bar'>
                <div className='routes'>
                     <Switch>
                        <Route exact path='/' render={() =><CategoryRoute />}/>
                        <Route exact path='/react' render={()=> <CategoryRoute filter='react'/>}/>
                        <Route exact path='/redux' render={() => <CategoryRoute filter='redux'/>}/>
                        <Route exact path='/udacity' render={() => <CategoryRoute filter='udacity'/>}/>
                    </Switch>
                </div>
                <div className='sort'>
                    <select onChange={(e) => this.handleSort(e)}>
                        <option value='highest_voteScore' name='voteScore'>Sort by score (highest first)</option>
                        <option value='lowest_voteScore' name='voteScore'>Sort by score (lowest first)</option>
                        <option value='highest_timestamp' name='timestamp'>Sort by time (newest first)</option>
                        <option value='lowest_timestamp' name='timestamp'>Sort by time (oldest first)</option>
                    </select>
                </div>
            </div>
            <div className='feed'>
                <Feed />
            </div>
            </div>
        )
        
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

    
}

const mapDispatchToProps = dispatch => ({
    sortPosts: (sorting) => dispatch(sortPosts(sorting))
})
  
export default connect(null, mapDispatchToProps, null, {pure:false})(Main);
