import React, { Component } from 'react';
import './App.css';
import Post from './components/Post'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts, sortPosts} from './actions'
import { sort } from './helpers'
import { Link, Route } from 'react-router-dom'
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
    this.props.loadPosts()
    this.props.loadCategories()
  }

  render() {
    return (
      <div className='app'>
        <div className='wrapper'>
          <div className='main-content'>
            <Main />
          </div>
          <div className='sidebar-navigation'>
            <Sidebar open={this.openModal}/>
          </div>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
              <CreateEdit close={this.closeModal}/>
          </Modal>
        </div>
      </div>
    );
  }

  

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }
}

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(fetchCategories()),
  loadPosts: () => dispatch(fetchPosts()),
  sortPosts: (sorting) => dispatch(sortPosts(sorting))
})

export default connect(null, mapDispatchToProps, null, {pure:false})(App);
