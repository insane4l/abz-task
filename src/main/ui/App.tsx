import React, { useState } from 'react';
import './App.scss'
import { Home } from './features/Home/Home'
import { Header } from './Header/Header'


export const App = () => {

	
	return (
		<div className='app'>
			<div id='top-anchor'></div>
			<Header />

			<main className='main-section'>
				<Home />
			</main>
		</div>
	)
}
