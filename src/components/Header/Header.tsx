import React from 'react'
import UsFlag from './UsFlag'
import CartIcon from './CartIcon'
import BellIcon from './BellIcon'
import InfoIcon from './InfoIcon'


type Props = {
    children?: any;
}



const Header: React.FC<Props> = ({ children }) => {

    
  return <div className="flex justify-between items-center px-6 py-3 bg-white h-16 border-b border-custom-border">
    <input className="border border-custom-border rounded min-w-[320px]" type='search' placeholder='Search'></input>
        <div className='flex gap-4'>
            <UsFlag />
            <CartIcon />
            <BellIcon />
            <InfoIcon />
       </div>
  </div>
}

export default Header