"use client"; 
import React, { useCallback, useState } from 'react'
import {AiOutlineMenu} from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { SafeUser } from '@/app/types';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';
interface UserMenuProps {
    currentUser?: SafeUser | null
  }

const UserMenu : React.FC<UserMenuProps> = ({currentUser}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal() ;
    const [isOpen , setIsOpen] = useState(false);
    const toggleOpen = useCallback(()=> {
        setIsOpen((value)=> !value);
    },[]);

    const onRent = useCallback(()=> {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        // if not , here is the opening code for rent page
        rentModal.onOpen() ;
    },[currentUser,loginModal,rentModal])

    return (
    <div className='relative'>
        <div className='flex flex-row items-center gap-3'>
            <div className='hidden md:block text-sm font-semibold py-3 px-4 
            rounded-full hover:bg-neutral-100 transition cursor-pointer'
             onClick={onRent}>
                Hrbo Your Home
             </div>
             <div className='md:py-1 p-4 md:px-2 border-neutral-200 flex 
             flex-row items-center gap-3 rounded-full cursor-pointer
             hover:shadow-sm transition' 
             onClick={toggleOpen}>
                <AiOutlineMenu/>
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.image}/>
                </div>
             </div>
        </div>
        {isOpen && (
            <div className='absolute rounded-xl
            shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden
            right-0 top-12 text-sm'>
                    
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                         <>
                    <MenuItem 
                    onClick={()=>{}}
                    label='My Trips'/>
                    <MenuItem 
                    onClick={()=> {}}
                    label='My Favorites'/>
                    <MenuItem 
                    onClick={()=> {}}
                    label='My Reservations'/>
                    <MenuItem 
                    onClick={()=> {}}
                    label='My Properties'/>
                    <MenuItem 
                    onClick={()=> {}}
                    label='My Favorites'/>
                    <MenuItem 
                    onClick={rentModal.onOpen}
                    label='Hrbo My Home'/>
                    <hr/>
                    <MenuItem 
                    onClick={()=> signOut()}
                    label='Logout'/>
                    </>
                    )
                     : 
                    (
                        <>
                        <MenuItem 
                        onClick={loginModal.onOpen}
                        label='Login'/>
                        <MenuItem 
                        onClick={registerModal.onOpen}
                        label='Signup'/>
                        </> 
                    )
                    }
                   
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu