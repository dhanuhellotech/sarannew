import React from 'react'

export default function Loader() {
  return (
    <div>
        {/* ***** Preloader Start ***** */}
  <div id="js-preloader" className="js-preloader">
    <div className="preloader-inner">
      <span className="dot" />
      <div className="dots">
        <span />
        <span />
        <span />
      </div>
    </div>
  </div>
  {/* ***** Preloader End ***** */}
    </div>
  )
}
