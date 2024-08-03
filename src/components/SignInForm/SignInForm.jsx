import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './SignInForm.module.css';
import Logo from 'src/components/Logo/Logo'; //но его еще нету
import { SignInForm, SignUnForm } from 'src/redux/users/operations.js';

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await dispatch({ type: 'auth/signIn', payload: data });

      if (response.error) {
        throw new Error(response.error.message);
      }

      localStorage.setItem('token', response.payload.token);

      history.push('/tracker');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signInContainer">
      <div className="signInForm">
        <div className="formSection">
            <Logo />
          <h2 className="formTitle">Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="inputContainer">
              <label htmlFor="email" className="formLabel">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              <p>{errors.email?.message}</p>
            </div>

            <div className="inputContainer">
              <label htmlFor="password" className="formLabel">Password</label>
              <div className="inputWrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  {...register('password')}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="togglePassword"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <p>{errors.password?.message}</p>
            </div>

            <button type="submit" className="btnform">Sign In</button>
            <div className="spanSignIn">
              <p>Don't have an account? <a href="/signup" className="link">Sign Up</a></p>
            </div>
          </form>
        </div>
        <div className="imageSection">
          {/* Место для изображения */}
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
