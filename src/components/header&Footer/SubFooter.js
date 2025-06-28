import React from 'react'

export default function SubFooter() {

  return (
    <>
      <div className="container my-4">
        <div className="row ">
          <div className="col-12 text-center">
            <p style={{ fontFamily: 'inter', }} className='mb-0'><code >  &copy; {new Date().getFullYear()} Powered by  log.MYG </code>  </p>
          </div>
        </div>
      </div>
    </>
  )
}
