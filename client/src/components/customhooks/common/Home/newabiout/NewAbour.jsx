import React from 'react'

export default function NewAbour() {
  return (
    <div>
<section className="w-full flex justify-center bg-color5 h-auto">
  <div className="w-full container flex justify-between flex-wrap px-0 2xl:px-36 h-auto py-16 ">
    <div className="w-full lg:w-[50%]  bg-color px-5 ">
      <p className="text-color4 uppercase">The best travel agency</p>
      <p className="text-color3 text-5xl font-bold uppercase font-secondary my-4">Discover the <span className="text-color1"> world</span> with  Saran</p>
      <p className="text-color6 text-left"> Experience seamless travel arrangements and hassle-free financial services with SARAN TOURS AND TRAVELS KUMILY & SARANPAY FINANCIAL SERVICES! From simplified booking solutions for tours, flights, and activities to convenient banking services including money transfer, insurance, and more, we've got you covered. Contact us today and let us make your journey and financial transactions effortless!</p>
      <p className="text-color6 my-4 text-left"><span style={{ color: '#0D2259', fontWeight: 'bold', fontFamily: 'your-font-family' }}>SARAN TOURS AND TRAVELS</span> - Making Booking & Banking Effortless!</p>
      <div className="flex items-center"> <i className="bi bi-check text-white bg-color4  rounded-[50%] px-2 py-1 me-3" /> <p className="text-color6">20 Years of Experience</p></div>
      <div className="flex items-center my-4"> <i className="bi bi-check text-white bg-color4  rounded-[50%] px-2 py-1 me-3" /> <p className="text-color6">150+ Tour Destinations</p></div>
      <div className="flex items-center"><i className="bi bi-telephone-forward text-color1 text-2xl me-3" /><div><p className="text-color6 ">For information</p><p className="text-color6 text-2xl">9562952223</p></div></div>
    </div>
    <div className=" w-full lg:w-[50%]   flex flex-col justify-center items-center bg-color5 h-auto pb-8 lg:pb-0 mt-10 lg:mt-0 ">
      <figure className="w-[70%] h-[500px] relative">
        <div className="w-[100%] h-[100%] bg-color4 absolute left-8 top-8" />
        <img src="assets/images/place-3.jpg" alt className="w-[100%] h-[100%] absolute z-10 object-cover hover:scale-[.95] transition-all duration-500" />
      </figure>
    </div>
  </div>
</section>

    </div>
  )
}
