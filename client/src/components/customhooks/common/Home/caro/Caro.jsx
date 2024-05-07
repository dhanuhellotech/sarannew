import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Caro() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      <div>
       <section className="w-full h-[100vh]  bg-header  bg-cover bg-no-repeat bg-center bg-color1 bg-blend-multiply bg-opacity-60 ">
            <section className="w-full flex flex-wrap justify-center ">
              <header className="w-[85%]  xl:w-[73%]  container hidden lg:flex justify-between h-[60px]  items-center py-[45px] border-b-[1px] border-white border-opacity-40">
                <figure className="w-[140px]">
                  {/* <img src="images/bg_1.jpg" alt className="w-[100%]" /> */}
                </figure>
              
              </header>
       
              {/* end header mobile  */}
            </section>
            
            <section className="w-full flex justify-center mt-[180px]">
              <div className="w-[700px] md:w-[900px] container h-auto  ">
                <p className="w-full text-center uppercase text-white tracking-widest [word-spacing:8px] mb-4">Lets travel the world with us</p>
                <h1 className="w-full text-center text-white text-4xl md:text-7xl font-secondary uppercase tracking-widest">Explore The World With <span className="travol">Saran Tours and Travels</span></h1>
              </div>
            </section>
         
          </section>
          
      </div>

      <div>
      <div>
       <section className="w-full h-[100vh]  bg-header-2  bg-cover bg-no-repeat bg-center bg-color1 bg-blend-multiply bg-opacity-60 ">
            <section className="w-full flex flex-wrap justify-center ">
              <header className="w-[85%]  xl:w-[73%]  container hidden lg:flex justify-between h-[60px]  items-center py-[45px] border-b-[1px] border-white border-opacity-40">
                <figure className="w-[140px]">
                  {/* <img src="images/bg_1.jpg" alt className="w-[100%]" /> */}
                </figure>
              
              </header>
       
              {/* end header mobile  */}
            </section>
            
            <section className="w-full flex justify-center mt-[180px]">
              <div className="w-[700px] md:w-[900px] container h-auto  ">
                <p className="w-full text-center uppercase text-white tracking-widest [word-spacing:8px] mb-4"> Where Every Journey is an Adventure!</p>
                <h1 className="w-full text-center text-white text-4xl md:text-7xl font-secondary uppercase tracking-widest">Discover Your Dream Destinations with<span className="travol"> Saran Tours </span></h1>
              </div>
            </section>
         
          </section>
          
      </div>

      
      </div>
      <div>
       <section className="w-full h-[100vh]  bg-header-3  bg-cover bg-no-repeat bg-center bg-color1 bg-blend-multiply bg-opacity-60 ">
            <section className="w-full flex flex-wrap justify-center ">
              <header className="w-[85%]  xl:w-[73%]  container hidden lg:flex justify-between h-[60px]  items-center py-[45px] border-b-[1px] border-white border-opacity-40">
                <figure className="w-[140px]">
                  {/* <img src="images/bg_1.jpg" alt className="w-[100%]" /> */}
                </figure>
              
              </header>
       
              {/* end header mobile  */}
            </section>
            
            <section className="w-full flex justify-center mt-[180px]">
              <div className="w-[700px] md:w-[900px] container h-auto  ">
                <p className="w-full text-center uppercase text-white tracking-widest [word-spacing:8px] mb-4">Embark on Unforgettable Escapes</p>
              
                <h1 className="w-full text-center text-white text-4xl md:text-7xl font-secondary uppercase tracking-widest">Let <span className="travol">Saran Tours </span>Turn Your Dreams into Reality</h1>

              </div>
            </section>
         
          </section>
          
      </div>
    </Slider>
  );
}
