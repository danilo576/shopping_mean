<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
>>>>>>> 8396444a7facf68d5c71123cd3105e089858deab
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
  return (
    <div className='kontejner1'>
      <MDBContainer>
        <MDBRow>
          <MDBCol md='6'>
            <MDBCard>
              <MDBCardBody>
                <form>
                  <p className='h4 text-center py-4'>Sign up</p>
                  <div className='grey-text'>
                    <MDBInput
                      label='Your name'
                      icon='user'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                    />
                    <MDBInput
                      label='Your email'
                      icon='envelope'
                      group
                      type='email'
                      validate
                      error='wrong'
                      success='right'
                    />
                    <MDBInput
                      label='Confirm your email'
                      icon='exclamation-triangle'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                    />
                    <MDBInput
                      label='Your password'
                      icon='lock'
                      group
                      type='password'
                      validate
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
