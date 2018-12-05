import React from 'react';
import Header from './Header';

export default(props) => {
  return (
    <div>
      <Header/>
      Is this working
      { props.children }
    </div>
  )
}