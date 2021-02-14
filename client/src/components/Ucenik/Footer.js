import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { response: '' };
  }
  render() {
    return (
      <footer className='page-footer font-small blue pt-4'>
        <div className='footer-copyright text-center py-3'>
          © 2020 Copyright:ADULINXSOFT
        </div>
      </footer>
    );
  }
}

export default Footer;
