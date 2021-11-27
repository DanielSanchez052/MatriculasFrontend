import React from 'react';
import DrawerNavigation from './src/components/navigation/DrawerNavigation.js'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <DrawerNavigation />
      )
  }
}

