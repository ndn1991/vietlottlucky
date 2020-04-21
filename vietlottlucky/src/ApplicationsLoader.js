// @flow
import React from 'react';
import { connect } from 'react-redux';
import Loader from './components/Loader';

const ApplicationLoader = ({isLoading}) => (<Loader isLoading={isLoading} />)
const mapStateToProps = (state) => ({isLoading: state.isLoading})
export default connect(mapStateToProps)(ApplicationLoader)