import React from 'react';

const Footer = () => {
  return (
    <footer>
      <img id="logo" src={`${process.env.PUBLIC_URL}/codestates-logo.png`} />
      Copyright @ 2022 Code States
    </footer>
  );
};

export default Footer;
