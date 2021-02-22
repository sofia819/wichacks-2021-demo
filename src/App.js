import React, { Component } from 'react';
import InfoCard from './InfoCard';
import wretch from 'wretch';
import './App.css';

class App extends Component {
  state = {
    pets: [],
    isDarkTheme: false,
  };

  handleThemeChange = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isDarkTheme: !prevState.isDarkTheme,
      };
    });
  };

  componentDidMount = () => {
    wretch('https://mount-recorder-server.herokuapp.com/mounts/')
      .get()
      .json()
      .then((data) =>
        this.setState({
          pets: data.map((datum) => {
            return {
              petName: datum.mount_name,
              petImage: datum.image_url,
            };
          }),
        }),
      )
      .catch((error) => console.log(error));
  };

  render = () => {
    return (
      <div className={this.state.isDarkTheme ? 'dark' : 'light'}>
        <button onClick={this.handleThemeChange}>Change Theme</button>
        {this.state.pets.map((pet) => (
          <InfoCard name={pet.petName} image={pet.petImage} />
        ))}
      </div>
    );
  };
}

export default App;
