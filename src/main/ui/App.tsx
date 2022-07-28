import React, { useEffect } from 'react';
import { appActions, requestTokenTC } from '../bll/reducers/appReducer';
import { useAppDispatch, useAppSelector } from '../bll/store';
import './App.scss'
import { Preloader } from './common/Preloader/Preloader';
import { Home } from './features/Home/Home'
import { Header } from './Header/Header'


export const App = React.memo( () => {

	const dispatch = useAppDispatch()

	const appError = useAppSelector(state => state.app.errorMessage)
	const appIsLoading = useAppSelector(state => state.app.isLoading)

	useEffect(() => {
		dispatch( requestTokenTC() )
	}, [dispatch])

	const onCloseAppError = () => {
		dispatch( appActions.setErrorMessage('') )
	}
	

	return (
		<div className='app'>
			<div id='top'></div>
			<Header />

			<main className='main-section'>
				<Home />
			</main>

			{appIsLoading 
				&& <div className='app__loading-status'>
					<Preloader />
				</div>
			}

			{appError 
				&& <div className='app__error-status'>
						{appError}
						<span onClick={onCloseAppError} className='close'>&times;</span>
					</div>
			}
		</div>
	)
})
