import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Topbar from '../../Components/Topbar/Topbar'
import Sidebar from '../../Components/Sidebar/Sidebar'

function Expenses() {
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

export default Expenses
