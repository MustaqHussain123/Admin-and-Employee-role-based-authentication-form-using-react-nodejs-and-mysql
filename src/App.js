import React from 'react'
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from './Login/Login'
import Signup from './Signup/Signup';
import Admin from './Admin/Admin';
import Employe from './Enploye/Employe';
import Edit from './Edit/Edit';
import Delete from './Delete/Delete';

const App = () => {
  return (
   <>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Login/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/admin' element={<Admin/>}/>
  <Route path='/employe' element={<Employe/>}/>
  <Route path='/edit/:id' element={<Edit/>}/>
  <Route path='/delete/:id' element={<Delete/>}/>
</Routes>
</BrowserRouter>
   </>
  )
}

export default App
