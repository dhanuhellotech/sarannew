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
import Callto from '../../components/customhooks/common/Home/cta/Callto'
import NewAbour from '../../components/customhooks/common/Home/newabiout/NewAbour'
import Popup from '../../components/popup/Popup'

export default function Home() {
  const new2={width:"100%",overflow:"hidden"}
    // useScript('vendor/jquery/jquery.min.js')
    // useScript('vendor/bootstrap/js/bootstrap.min.js')
    // useScript('assets/js/isotope.min.js')
    // useScript('assets/js/owl-carousel.js')
    // useScript('assets/js/counter.js')
    // useScript('assets/js/custom.js')
  return (
<div>
{/* <Loader/> */}
<div style={new2}>
  <Caro/>

  </div>
<Booking/>
<NewAbour/> 

<About/>
<Video/>

  {/* <Time/> */}


<Tours/>

<Callto/>

{/* <WhatsApp phoneNumber="95629 52223" message="Hello! I'm interested in your services." /> */}

</div>

  )
}

