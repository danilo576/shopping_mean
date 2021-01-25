import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import e from 'cors';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  // [e,target.name] ---> iz e.target polja izvlaci string vrednost name-a i postavlja je kao prop
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    const toSend = {
      email,
      password,
    };
    console.log(toSend);
  };
  return (
    <div className='kontejner2'>
      <MDBContainer size='sm' className='kontejner2'>
        <MDBRow>
          <MDBCol md='6'>
            <form onSubmit={onSubmit}>
              <p className='h5 text-center mb-4'>Sign in</p>
              <div className='grey-text'>
                <MDBInput
                  label='Type your email'
                  icon='envelope'
                  group
                  type='email'
                  validate
                  error='wrong'
                  success='right'
                  name='email'
                  value={email}
                  onChange={onChange}
                />
                <MDBInput
                  label='Type your password'
                  icon='lock'
                  group
                  type='password'
                  validate
                  name='password'
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className='text-center'>
                <MDBBtn type='submit'>Login</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Login;
