import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from 'mdbreact';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email1: '',
    email2: '',
    password: '',
  });
  const { name, email1, email2, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    const toSend = { name, email1, password };
    if (email1 !== email2) {
      alert('Emails must be same');
      return;
    }
    console.log(toSend);
  };
  return (
    <div className='kontejner1'>
      <MDBContainer>
        <MDBRow>
          <MDBCol md='6'>
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={onSubmit}>
                  <p className='h4 text-center py-4'>Sign up</p>
                  <div className='grey-text'>
                    <MDBInput
                      label='Your name'
                      icon='user'
                      group
                      type='text'
                      name='name'
                      value={name}
                      onChange={onChange}
                    />
                    <MDBInput
                      label='Your email'
                      icon='envelope'
                      group
                      type='email'
                      error='wrong'
                      success='right'
                      name='email1'
                      value={email1}
                      onChange={onChange}
                    />
                    <MDBInput
                      label='Confirm your email'
                      icon='exclamation-triangle'
                      group
                      type='text'
                      error='wrong'
                      success='right'
                      name='email2'
                      value={email2}
                      onChange={onChange}
                    />
                    <MDBInput
                      label='Your password'
                      icon='lock'
                      group
                      type='password'
                      name='password'
                      value={password}
                      onChange={onChange}
                    />
                  </div>
                  <div className='text-center py-4 mt-3'>
                    <MDBBtn color='cyan' type='submit'>
                      Register
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Register;
