import React from 'react'
import './Feature.css'
import {featureCard} from '../../constants/data'
function Feature() {
  return (
    <>
    <div className='feature--card-box'>
        <div className='custom--container'>
            <div className='feature--card-wrapper'>
            {featureCard.map(({id,title, number, smallNumber,numberIdnty})=>( 
                <div className='feature--card-item' key={id}>
                    <h6 className='title'>{title}</h6>
                    {/* this formate is like that 0.smallnumber (ea:000) numberIdentity (ea:sol) */}
                    <p className='count-number'>{number}<span>{smallNumber}</span><span>{numberIdnty}</span></p>
                </div>
            ))}
              
            </div>
        </div>
    </div>
    </>
  )
}

export default Feature