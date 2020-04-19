// @flow
import React, { Component, useState, useCallback, useEffect } from 'react';
import Loader from './components/Loader';
import store from '../store'

export default class ApplicationLoader extends Component<{}, {isLoading: boolean}> {
  unsubscribeStore: Function;
  constructor() {
    super()
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    this.unsubscribeStore = store.subscribe(() => {
      if (store.getState().isLoading !== this.state.isLoading) {
        this.setState({isLoading: store.getState().isLoading})
      }
    })
  }

  componentWillUnmount() {
    if (this.unsubscribeStore) {
      this.unsubscribeStore()
    }
  }

  render() {
    return (<Loader isLoading={this.state.isLoading} />)
  }
}