import React from 'react'
import Header from '../../components/customhooks/common/Header/Header'
import { useScript } from '../../components/customhooks/Script'
import Footer from '../../components/customhooks/common/footer/Footer'
import Booking from '../../components/customhooks/common/Home/bookform/Booking'
import Tours from '../../components/customhooks/common/Home/service/Tours'
import Tourser from '../../components/customhooks/common/Home/tours/Tourser'
import Time from '../../components/customhooks/common/Home/timer/Time'
import Video from '../../components/customhooks/common/Home/video/Video'
import About from '../../components/customhooks/common/Home/about/About'
import Caro from '../../components/customhooks/common/Home/caro/Caro'
import Loader from '../../components/customhooks/common/loader/Loader'
import WhatsApp from '../../components/whatsapp/WhatsApp'

export default function Home() {
    useScript('vendor/jquery/jquery.min.js')
    useScript('vendor/bootstrap/js/bootstrap.min.js')
    useScript('assets/js/isotope.min.js')
    useScript('assets/js/owl-carousel.js')
    useScript('assets/js/counter.js')
    useScript('assets/js/custom.js')
  return (
<div>
{/* <Loader/> */}
  <Header/>
  <Caro/>

<About/>
<Booking/>
<Video/>
  <Time/>
<Tourser/>
<Tours/>


{/* <WhatsApp phoneNumber="95629 52223" message="Hello! I'm interested in your services." /> */}

</div>

  )
}

