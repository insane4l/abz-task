import React from 'react'
import './Promo.scss'
import promoBG from '../../../../../assets/images/promoBG.jpeg'
import promoBG_small from '../../../../../assets/images/promoBG_small.jpeg'
import { SuperScrollButton } from '../../../common/SuperButton/SuperScrollButton'
import { isMobile } from 'react-device-detect'

export const Promo = React.memo( () => {

    const promoBackgroundImage = isMobile ? promoBG_small : promoBG
    
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

                <SuperScrollButton href='#registration'>Sign up</SuperScrollButton>

            </div>
        </section>
    )
})
