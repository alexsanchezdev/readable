import React, { Component } from 'react'
import { sort } from '../helpers'
import { connect } from 'react-redux'
import Post from './Post'
import { Route, Switch } from 'react-router-dom'
import PostDetails from './PostDetails'
import { sortPosts } from '../actions/ui'


class Feed extends Component {


  componentDidMount(){
    this.props.sortPosts({
      parameter: 'voteScore',
      lowestFirst: false
    })
  }

    render() {
        const { showDetails } = this.props

        return(
          <div>
            {showDetails ? null : <div>{this.renderPosts()}</div>}
            <div>
            <Switch>
              {this.renderPostsRoutes()}
              <Route path='/*/*' render={() => <PostDetails data={{}}/>}/>
            </Switch>
            </div>
          </div>
        )
    }

renderPostsRoutes = () => {
  const { posts } = this.props

    const postsRoutes = posts.filter( post => post.deleted === false).map( post => {
      return (
        <Route exact path={`/${post.category}/${post.id}`} key={post.id} render={()=> <PostDetails data={post}/>}/>
      )
    })
      
    return postsRoutes
}

renderPosts = () => {
    const { posts } = this.props

    const postsViews = posts.filter( post => post.deleted === false).map( post => {
        return (
            <Post key={post.id} data={post}/>
        )
    })

    if (postsViews.length < 1) {
        return (<p>No posts in this category.</p>)
    } else {
        return postsViews
    }
}

}

const mapDispatchToProps = dispatch => ({
  sortPosts: (sorting) => dispatch(sortPosts(sorting))
})

const mapStateToProps = (state, props) => {
    
    const filter = state.ui.postFilter
    const sorting = state.ui.postSorting
    
    const postsArray = Object.entries(state.posts).map( post => post[1])
  
    if (sorting) {
      if (filter) {
        const filtered = postsArray.filter( post => {
          return post.category === filter
        })
        const sorted = sort(filtered, sorting.parameter, sorting.lowestFirst)
        return {
          categories: state.categories,
          posts: sorted,
          showDetails: state.ui.showDetails
        }
      } else {
        const sorted = sort(postsArray, sorting.parameter, sorting.lowestFirst)
        return {
          categories: state.categories,
          posts: sorted,
          showDetails: state.ui.showDetails
        }
      }
    } 
    
    return {}
    // TODO: Ask instructor if there's another way to handle this
  }

Feed.defaultProps = {
  posts: []
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(Feed);