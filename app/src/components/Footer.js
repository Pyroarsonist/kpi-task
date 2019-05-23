import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer mt-auto py-3">
        <div className="text-center">
          <span className="text-black">
            KPI-Task © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
