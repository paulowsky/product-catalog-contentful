import React from 'react'

import loopzLogo from '../../assets/loopz-logo.svg'

const Footer = () => {
  return (
    <div className='p-6'>
      <hr/>
      <a className='p-2' href='https://loopz.com.br'><img className='w-40' src={loopzLogo} alt='Loopz' /></a>
    </div>
  )
}

export default Footer
