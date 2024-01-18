'use client' 

import React from 'react';

import { Template } from './components/Template';

const Page = () => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <Template />
      </div>
    </div>
  );
};

export default Page;
