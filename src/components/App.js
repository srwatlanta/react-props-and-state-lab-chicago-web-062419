import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  setType = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    })
  }

  setApi = () => {
    let api
    if(this.state.filters.type === 'all'){
      api = '/api/pets'
    } else {
      api = `/api/pets?type=${this.state.filters.type}`
    }
    return api
  }

  setPets = (array) => {
    this.setState({
      pets: array
    })
  }

  fetchPets = (event) => {
    fetch(this.setApi())
    .then(res => res.json())
    .then(pets => this.setPets(pets))
  }

  changeAdoptButton = (petId) => {
    let pets = this.state.pets.map(p => {
      return p.id === petId ? {...p, isAdopted: true} : p
    })
    this.setState({pets})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.setType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.changeAdoptButton}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
