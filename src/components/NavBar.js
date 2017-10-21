import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom'
import CategoryRoute from './CategoryRoute'
import { connect } from 'react-redux'
import { sortPosts } from '../actions'

class NavBar extends Component {

    componentDidMount() {
        this.props.sortPosts({
            parameter: 'voteScore',
            lowestFirst: false
        })
    }

    handleSort = (e) => {
        
            const value = e.target.value
            const filters = value.split('_')
        
            if (filters[0] === 'highest') {
              this.props.sortPosts({
                parameter: filters[1],
                lowestFirst: false
              })
            } else {
              this.props.sortPosts({
                parameter: filters[1],
                lowestFirst: true
              })
            }
            
          }

    render() {
        return(
            <div className='nav-bar'>
                <div className='feed'>
                    <Switch>
                        <div>
                        <Route exact path='/' render={() =><CategoryRoute />}/>
                        <Route path='/react' render={()=> <CategoryRoute filter='react'/>}/>
                        <Route path='/redux' render={() => <CategoryRoute filter='redux'/>}/>
                        <Route path='/udacity' render={() => <CategoryRoute filter='udacity'/>}/>
                        </div>
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
        )
        
    }
}

const mapDispatchToProps = dispatch => ({
    sortPosts: (sorting) => dispatch(sortPosts(sorting))
})
  
export default connect(null, mapDispatchToProps, null, {pure:false})(NavBar);
