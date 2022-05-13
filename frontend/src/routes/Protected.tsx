import React from 'react';
import {Route} from 'react-router-dom';

export default function Protected() {
  return (
    <>
      <Route path="/protected" element={<h1>Protected</h1>} />
    </>
  );
}
