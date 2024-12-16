import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'

function Unit() {
  return (
    <>
      <Sidebar />
      <div class="content">
        <Topbar />
        <Footer />
      </div>
    </>
  )
}

export default Unit
