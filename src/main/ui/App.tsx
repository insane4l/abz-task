import React from 'react';
import './App.scss'
import { Home } from './features/Home/Home';
import { Header } from './Header/Header';

export const App = () => {
  return (
	<div className='app'>
		<Header />

		<main className='app-container'>
			<Home />
		</main>
	</div>
  )
}
