import React, { Component } from 'react';
import './App.css';
import Post from './components/Post'
import CategoryRoute from './components/CategoryRoute'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts, sortPosts, filterPosts } from './actions'
import { sort } from './helpers'
import { Route, Link } from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    this.props.sortPosts({
      parameter: 'voteScore',
      lowestFirst: false
    })
    this.props.loadCategories()
    this.props.loadPosts()
  }

  renderCategories = () => {
    const { categories } = this.props
    if(categories && categories.length) {
      const categoriesLinks = categories.map( category => {
        return(
          <Link to={`/${category.path}`}>
          <div className='category'>
            <div className='category-logo'>
              <img src={require(`./img/${category.path}.png`)}/>
            </div>
            <div className='category-name' key={category.path}>
              {category.name}
            </div>
          </div>
          </Link>
          )
      })

      return categoriesLinks
    }
  }

  renderPosts = () => {
    const { posts } = this.props
    if (posts) {
      const postsViews = posts.map( post => {
        return(<Post key={post.id} data={post}/>)
      })

      return postsViews
    }
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
    return (
      <div className='app'>
        <div className='wrapper'>
          <div className='main-content'>
            <div className='nav-bar'>
            <div className='feed'>
              <Route exact path='/' component={CategoryRoute}/>
              <Route path='/react' render={()=> <CategoryRoute filter='react'/>}/>
              <Route path='/redux' render={() => <CategoryRoute filter='redux'/>}/>
              <Route path='/udacity' render={() => <CategoryRoute filter='udacity'/>}/>
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
            {this.renderPosts()}
          </div>
          <div className='sidebar-navigation'>
            <button>ADD NEW POST</button>
            {this.renderCategories()}
          </div>
        </div>
      </div>
    );
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

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(fetchCategories()),
  loadPosts: () => dispatch(fetchPosts()),
  sortPosts: (sorting) => dispatch(sortPosts(sorting))
})

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(App);
