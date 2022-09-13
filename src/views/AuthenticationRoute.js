import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';


export default function AuthenticationRoute ({ component: Component, auth, error, ...rest }){

	 const token = localStorage.getItem('token');
	 return token === null || token === undefined ? <Navigate to="/login" /> : <Component />;
};
