import React from 'react'
import { SuperButton } from '../../../common/SuperButton/SuperButton'
import './Promo.scss'
import promoBackgroundImage from '../../../../../assets/images/promoBG.jpeg'

export const Promo = () => {

    const promoStyles = {
        background: `
            linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            #999999 url(${promoBackgroundImage}) center/cover no-repeat
            `
    }

    return (
        <section className='homepage-promo' style={promoStyles}>
            <div className='homepage-promo__content'>

                <h1 className='homepage-promo__title'>Test assignment for front-end developer</h1>

                <p className='homepage-promo__descr'>
                    What defines a good front-end developer is one that has skilled knowledge
                     of HTML, CSS, JS with a vast understanding of User design thinking as 
                     they'll be building web interfaces with accessibility in mind. 
                     They should also be excited to learn, as the world of 
                     Front-End Development keeps evolving.
                </p>

                <SuperButton>Sign up</SuperButton>

            </div>
        </section>
    )
}
