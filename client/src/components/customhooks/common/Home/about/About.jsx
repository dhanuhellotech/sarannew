import React from 'react'

export default function About() {
  return (
    <div>
<section className="w-full flex justify-center bg-color7 py-8 ">
  <div className="w-full container 2xl:px-36">
    <div>
      <p className="text-color4 uppercase px-5">MOST POPULAR</p>
      <p className="text-4xl font-secondary text-color3 px-5">Popular <span className="text-color1">Destination</span></p>
      <div className="flex flex-wrap justify-center xl:justify-between gap-10 px-6 xl:px-0 py-8 lg:px-3 ">
        <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000 overflow-hidden group ">   
          <img src="assets/images/destination-7.jpg" alt className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000" />
          <p className="absolute uppercase text-white bg-color1 px-4 py-1 right-1 top-12 rotate-[-90deg] ">2 Tours</p>
          <figcaption className="absolute text-white bottom-[20px] left-5  group-hover:bottom-[50px]  transition-all duration-700 w-full  ">
            <div className="flex after:contetn-[''] after:h-[1px] after:bg-op-50 after:w-[20%] after:bg-white after:absolute after:bottom-[-8px] group-hover:after:w-[90%]  after:transition-all after:duration-1000"><i className="bi bi-geo-alt text-2xl text-white me-2" /> <p className="capitalize font-secondary text-3xl">Paris</p></div>
            <div className="flex justify-between absolute  mt-5 w-full  ">
              <p>2 Tours Package</p>
              <a href className="flex  me-9 ">Explore<i className="bi bi-arrow-right" /></a>
            </div>
          </figcaption>
        </figure>
        <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000 overflow-hidden group ">   
          <img src="assets/images/destination-8.jpg" alt className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000" />
          <p className="absolute uppercase text-white bg-color1 px-4 py-1 right-1 top-12 rotate-[-90deg] ">2 Tours</p>
          <figcaption className="absolute text-white bottom-[20px] left-5  group-hover:bottom-[50px]  transition-all duration-700 w-full  ">
            <div className="flex after:contetn-[''] after:h-[1px] after:bg-op-50 after:w-[20%] after:bg-white after:absolute after:bottom-[-8px] group-hover:after:w-[90%]  after:transition-all after:duration-1000"><i className="bi bi-geo-alt text-2xl text-white me-2" /> <p className="capitalize font-secondary text-3xl">Italy  </p></div>
            <div className="flex justify-between absolute  mt-5 w-full  ">
              <p>2 Tours Package</p>
              <a href className="flex  me-9  ">Explore<i className="bi bi-arrow-right" /></a>
            </div>
          </figcaption>
        </figure>
        <figure className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000 overflow-hidden group ">   
          <img src="assets/images/destination-10.jpg" alt className="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000" />
          <p className="absolute uppercase text-white bg-color1 px-4 py-1 right-1 top-12 rotate-[-90deg] ">6 Tours</p>
          <figcaption className="absolute text-white bottom-[20px] left-5  group-hover:bottom-[50px]  transition-all duration-700 w-full  ">
            <div className="flex after:contetn-[''] after:h-[1px] after:bg-op-50 after:w-[20%] after:bg-white after:absolute after:bottom-[-8px] group-hover:after:w-[90%]  after:transition-all after:duration-1000"><i className="bi bi-geo-alt text-2xl text-white me-2" /> <p className="capitalize font-secondary text-3xl">Italy</p></div>
            <div className="flex justify-between absolute  mt-5 w-full  ">
              <p>6 Tours Package</p>
              <a href className="flex me-9 ">Explore<i className="bi bi-arrow-right" /></a>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}
