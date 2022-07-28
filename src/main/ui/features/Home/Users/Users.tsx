import React, { useEffect } from 'react'
import { requestUsersTC, usersActions } from '../../../../bll/reducers/usersReducer'
import { usersSelectors } from '../../../../bll/selectors/selectors'
import { useAppDispatch, useAppSelector } from '../../../../bll/store'
import { Preloader } from '../../../common/Preloader/Preloader'
import { SuperButton } from '../../../common/SuperButton/SuperButton'
import { UserCard } from './UserCard/UserCard'
import './Users.scss'

export const Users = React.memo( () => {

    const dispatch = useAppDispatch()

    const isLoading = useAppSelector(usersSelectors.getIsLoading)
    const errorMessage = useAppSelector(usersSelectors.getErrorMessage)
    const users = useAppSelector(usersSelectors.getUsers)
    const currentPage = useAppSelector(usersSelectors.getCurrentPage)
    const totalPages = useAppSelector(usersSelectors.getTotalPages)
    const onlyNewUsersRequestMode = useAppSelector(usersSelectors.getUsersRequestMode)

    useEffect(() => {

        // condition has been used to prevent double request when a new user is registered 
        // requestRegistrationTC thunk sends the same request (requestUsersTC()). And currentPage which in useEffect dependencies will be changed
        if (!onlyNewUsersRequestMode) { 

            dispatch( requestUsersTC() )
        }
        
    }, [dispatch, currentPage])


    useEffect(() => {
        // cleanup
        return () => {
            dispatch( usersActions.setNewestUsers([]))
        }
    }, [dispatch])


    const showMoreUsers = () => {
        let nextPage = currentPage + 1

        if (nextPage <= totalPages) {
            dispatch(usersActions.setCurrentPage(nextPage))
        }
    }


    const mappedUsers = users.map(el => <UserCard key={el.id} {...el}/>)
    

    return (
        <section id='users' className='users-section'>
            <div className='users-section__content'>
                <h2 className='users-section__title'>Working with GET request</h2>

                <div className='users-list'>
                    {(mappedUsers.length > 0) 
                        ? mappedUsers
                        : <div>Users list is empty</div>
                    }
                </div>

                {errorMessage 
                    && <span className='users-section__error'>{errorMessage}</span>
                }
                
                {isLoading 
                    && <div className='users-section__preloader'><Preloader /></div>
                }

                
                {// errorMessage - to display "Show more" btn, if first users request error occured
                    ( (currentPage < totalPages) || (!!errorMessage) )
                        && <SuperButton onClick={showMoreUsers}>Show more</SuperButton>
                }

            </div>
        </section>
    )
})