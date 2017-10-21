import React, { Component } from 'react';
import './App.css';
import Post from './components/Post'
import NavBar from './components/NavBar'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts, sortPosts} from './actions'
import { sort } from './helpers'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import CreateEdit from './components/CreateEdit'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component {

  state = {
    modalIsOpen: false
  }

  componentDidMount() {
    this.props.loadCategories()
    this.props.loadPosts()
  }

  renderCategories = () => {
    const { categories } = this.props
    if(categories && categories.length) {
      const categoriesLinks = categories.map( category => {
        return(
          <Link key={category.path} to={`/${category.path}`} className='link'>
          <div className='category'>
            <div className='category-logo'>
              <img src={require(`./img/${category.path}.png`)} alt={category.name}/>
            </div>
            <div className='category-name'>
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
        if(post.deleted) {
          return null
        }
        return(<Post key={post.id} data={post}/>)
      })

      if (postsViews.length < 1) {
        return (<p>No posts in this category.</p>)
      }
      return postsViews
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  render() {
    return (
      <div className='app'>
        <div className='wrapper'>
          <div className='main-content'>
            <NavBar />
            {this.renderPosts()}
            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
              <CreateEdit close={this.closeModal}/>
            </Modal>
          </div>
          <div className='sidebar-navigation'>
            <button onClick={this.openModal}>ADD NEW POST</button>
            <p/>
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
