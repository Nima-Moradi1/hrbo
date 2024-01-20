"use client"
import axios from 'axios' ;
import { signIn } from 'next-auth/react';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { useCallback,useState } from 'react';
import {FieldValues,SubmitHandler,useForm} from 'react-hook-form'
import toast from 'react-hot-toast';
import Modal from './Modals';
import Input from '../inputs/Input';
import Heading from '../Heading';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
    const registerModal = useRegisterModal() ;
    const loginModal = useLoginModal() ;
    const [isLoading,setIsLoading] = useState(false) ;
    const {
        register,
        handleSubmit,
        formState : {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name : "",
            email: "",
            password: ''
        }
    });
// toggle between login and sign up
const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
    
        axios.post('/api/register', data)
        .then(() => {
          toast.success('Registered Successfully!');
          registerModal.onClose();
        //   loginModal.onOpen();
        })
        .catch((error) => {
          toast.error("Something Went Wrong!");
        })
        .finally(() => {
          setIsLoading(false);
        })
      }
// body content 
const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Hrbo"
        subtitle="Create an account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )
// footer content 
const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')} 
      />
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Log in</span>
        </p>
      </div>
    </div>
  )
  return (
    <Modal 
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title='Register'
    actionLabel='Continue'
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default RegisterModal