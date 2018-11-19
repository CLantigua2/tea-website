import React, { Component } from 'react';
import axios from "axios";

export const Context = React.createContext({});

class TeaProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teas: [],
            tea: '',
            description: '',
            message: '',
            activeItem: null,
            toggle: false
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:9000/api/teas')
        .then(res => {
            this.setState({teas: res.data})
        })
        .catch(err => console.log(err))
    }
    getItemById = id => {
        axios
          .get(`http://localhost:9000/api/teas/${id}`)
          .then(res => this.setState({ activeItem: res.data }))
          .catch(err => console.log(err))
      }

    routeToItem = (ev, item, props) => {
        ev.preventDefault();
       this.getItemById(item.id)
      
      }
      handleChange = e => {
          this.setState({[e.target.name]: e.target.value})
      }
      addTea = e => {
          e.preventDefault()
        const info = {
            name: this.state.name,
            description: this.state.description,
            message: this.state.message
          }
        axios.post('http://localhost:9000/api/teas', info)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        this.setState({toggle: !this.state.toggle})
        setTimeout(() => this.setState({toggle: false}), 1000)
      }

    render() {
        return (
            <Context.Provider value={{state: this.state, actions: {addTea: this.addTea, handleChange: this.handleChange}}}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

  

export default TeaProvider;