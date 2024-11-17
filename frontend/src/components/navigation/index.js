/**
 * Starting point for the navigation.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from '../../pages/Home'
import Upload from '../../pages/Upload'
import Account from '../../pages/Account'
import Closet from '../closet/Closet'
import OutfitBuilder from '../../pages/OutfitBuilder'
import NotFound from '../../pages/NotFound'
import Navbar from './Navbar'

const ReactRouterSetup = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/closet" element={<Closet />} />
        <Route path="/outfit-builder" element={<OutfitBuilder />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default ReactRouterSetup