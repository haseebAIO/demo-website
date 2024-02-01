'use client';

import React, { useEffect, useState } from 'react'

const page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const routes = localStorage.getItem('routes');
    console.log(JSON.parse(routes));
    setData(JSON.parse(routes));
  }, [])
  return (
    <div className='flex flex-col justify-center m-10'>
      {data.length && data.map((route, index) => (
        <div>
          <a href={`http://127.0.0.1:5501/temp-templates/${route}/index.html`} target="_blank"><h1>Template {index + 1}</h1></a>
        </div>
      ))}
    </div>
  )
}

export default page