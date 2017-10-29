import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Sidebar = (props) => {
    const renderCategories = () => {
        const { categories } = props
    
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

    return (
        <div>
            <button onClick={props.open}>ADD NEW POST</button>
            <p/>
            {renderCategories()}
        </div>
    )
}

const mapStateToProps = (state, props) => ({
    categories: state.categories
})

Sidebar.defaultProps = {
    categories: []
}

export default connect(mapStateToProps)(Sidebar)