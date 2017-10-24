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
                <Switch>
                        <Route exact path='/' render={() =><CategoryRoute />}/>
                        <Route exact path='/react' render={()=> <CategoryRoute filter='react'/>}/>
                        <Route exact path='/redux' render={() => <CategoryRoute filter='redux'/>}/>
                        <Route exact path='/udacity' render={() => <CategoryRoute filter='udacity'/>}/>
                </Switch>
                <div className='feed'>
                    <Feed />
                </div>
            </div>
        )
        
    }
    
}

const mapDispatchToProps = dispatch => ({
    sortPosts: (sorting) => dispatch(sortPosts(sorting))
})
  
export default connect(null, mapDispatchToProps, null, {pure:false})(Main);
