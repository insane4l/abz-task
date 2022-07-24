import React, { FC, useEffect } from 'react'
import { UserType } from '../../../../api/usersAPI'
import { requestUsersTC, usersActions } from '../../../../bll/reducers/usersReducer'
import { useAppDispatch, useAppSelector } from '../../../../bll/store'
import { Preloader } from '../../../common/Preloader/Preloader'
import { SuperButton } from '../../../common/SuperButton/SuperButton'
import { UserCard } from './UserCard/UserCard'
import './Users.scss'

export const Users = () => {

    const dispatch = useAppDispatch()

    const isLoading = useAppSelector(state => state.users.isLoading)
    const errorMessage = useAppSelector(state => state.users.errorMessage)
    const users = useAppSelector(state => state.users.users)
    const currentPage = useAppSelector(state => state.users.currentPage)
    const totalPages = useAppSelector(state => state.users.totalPages)

    useEffect(() => {
        dispatch( requestUsersTC() )
    }, [currentPage])

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

                <ul className='users-list'>
                    {(mappedUsers.length > 0) 
                        ? mappedUsers
                        : <li>Users list is empty</li>
                    }
                </ul>

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
}