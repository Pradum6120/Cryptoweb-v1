import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../Pages/Login'
import SingnUp from '../Pages/SingnUp'
import Home from '../Pages/Home'
import Airdrops from '../Pages/Airdrops'
import About from '../Pages/About'
import Bookmarks from '../Pages/Bookmarks'
import Admin from '../Pages/Admin'
import Adminusers from '../Pages/Adminusers'
import Adminairdrops from '../Pages/Adminairdrops'
import AdminAddAirdrop from '../Pages/AdminAddAirdrop'
import Layout from './Layout'
import Sidenav from '../Pages/Sidenav'
import AirdropDetails from '../Pages/AirdropDetails'

function Router() {
  return (

    <Routes>
    <Route path = "/" element= {<Layout/>}> 
    <Route path = "/" element= {<Home/>}/>
    <Route path = "login" element= {<Login/>}/>
    <Route path = "signup" element= {<SingnUp/>}/>
    <Route path = "airdrops" element= {<Airdrops/>}/>
    <Route path = "airdrops/:id" element= {<AirdropDetails/>}/>
    <Route path = "bookmarks" element= {<Bookmarks/>}/>
    <Route path = "about" element= {<About/>}/>
     <Route path = "admin" element= {<Sidenav/>}>
     <Route path= "" element={<Admin/>} />
     <Route path='users' element={<Adminusers/>} />
     <Route path='addpost' element={<AdminAddAirdrop/>} />
     <Route path='airdrops' element={<Adminairdrops/>} />
    </Route>
    </Route>
    
  </Routes>
  )
}

export default Router
