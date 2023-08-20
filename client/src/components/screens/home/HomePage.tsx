import React from 'react'
import Advantage from './Advantage'
import Request from './Request'
import Cars from './Cars'
import LogoSlider from './LogoSlider'
import Welcome from './Welcome'
import Questions from './Questions'
import { Car } from '../catalog/catalog.types'

function Homepage({ cars}: {cars: Car[]}): JSX.Element {
  return (
    <>
    <Welcome/>
    <Cars cars={cars}/>
    <Request/>
    <Advantage/>
    <LogoSlider/>
    <Questions/>
    </>
  )
}

export default Homepage