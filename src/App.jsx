import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StudyPlanView from './pages/StudyPlanView'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studyplan/:id" element={<StudyPlanView />} />
      </Routes>
    </BrowserRouter>
  )
}
