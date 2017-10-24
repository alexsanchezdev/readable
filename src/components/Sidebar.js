import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
    render() {
        return(
            <div>
                <button onClick={this.props.open}>ADD NEW POST</button>
                <p/>
                {this.renderCategories()}
            </div>
        )

    }

    renderCategories = () => {
        const { categories } = this.props

        if(categories.length) {
          const categoriesLinks = categories.map( category => {
            return(
              <Link key={category.path} to={`/${category.path}`} className='link'>
              <div className='category'>
                <div className='category-logo'>
                  <img src={require(`../img/${category.path}.png`)} alt={category.name}/>
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
}

const mapStateToProps = (state, props) => ({
    categories: state.categories
})

Sidebar.defaultProps = {
    categories: []
}

export default connect(mapStateToProps)(Sidebar)