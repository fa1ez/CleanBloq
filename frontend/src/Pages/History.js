import React from 'react'
import Navbar from '../Components/Navbar'
import Table from '../Components/Table'

export default function History() {
  return (
    <div>
        <Navbar/>
        <div style={{margin:"10px"}}>
        <Table data/>
        </div>
    </div>

  )
}
