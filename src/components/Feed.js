import React, { Component } from 'react'
import { sort } from '../helpers'
import { connect } from 'react-redux'
import Post from './Post'
import { Route, Switch } from 'react-router-dom'

class Feed extends Component {
    render() {
        return(
          <div>
            <div>{this.renderPosts()}</div>
            <div>
            <Switch>
              {this.renderPostsRoutes()}
            </Switch></div>
          </div>
        )
    }

renderPostsRoutes = () => {
  const { posts } = this.props
  if (posts) {
    const postsViews = posts.map( post => {

      if (post.deleted) {
        return null
      }
      
      return (
          <Route exact path={`${post.category}/${post.id}`} render={()=> `Hello from ${post.category}/${post.id}`}/>
      )
    })

    if (postsViews.length < 1) {
      return (<p>No posts in this category.</p>)
    }
    return postsViews
  }
}

renderPosts = () => {
  const { posts } = this.props
  if (posts) {
    const postsViews = posts.map( post => {

      if (post.deleted) {
        return null
      }
      
      console.log(`${post.category}/${post.id}`)
      return (
          <Post key={post.id} data={post}/>
      )
    })

    if (postsViews.length < 1) {
      return (<p>No posts in this category.</p>)
    }
    return postsViews
  }
}

}




const mapStateToProps = (state, props) => {
    
    const filter = state.ui.filter
    const sorting = state.ui.sorting
    
    const postsArray = Object.entries(state.posts).map( post => post[1])
  
    if (sorting) {
      if (filter) {
        const filtered = postsArray.filter( post => {
          return post.category === filter
        })
        const sorted = sort(filtered, sorting.parameter, sorting.lowestFirst)
        return {
          categories: state.categories,
          posts: sorted
        }
      } else {
        const sorted = sort(postsArray, sorting.parameter, sorting.lowestFirst)
        return {
          categories: state.categories,
          posts: sorted
        }
      }
    } 
    
    return {}
    // TODO: Ask instructor if there's another way to handle this
  }

export default connect(mapStateToProps, null, null, {pure:false})(Feed);