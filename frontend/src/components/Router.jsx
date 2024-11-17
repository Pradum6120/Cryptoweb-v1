import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import SingnUp from './SingnUp'
import Home from './Home'
import Airdrops from './Airdrops'
import About from './About'
import Bookmarks from './Bookmarks'
import Admin from './Admin'
import Adminusers from './Adminusers'
import Adminairdrops from './Adminairdrops'
import AdminAddAirdrop from './AdminAddAirdrop'
import Layout from './Layout'
import Sidenav from './Sidenav'

function Router() {
  return (

    <Routes>
    <Route path = "/" element= {<Layout/>}> 
    <Route path = "/" element= {<Home/>}/>
    <Route path = "login" element= {<Login/>}/>
    <Route path = "signup" element= {<SingnUp/>}/>
    <Route path = "airdrops" element= {<Airdrops/>}/>
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
