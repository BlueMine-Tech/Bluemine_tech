import React from 'react'
import ServicesBanner from '../components/Services/ServicesBanner'
import DigitalMarketingServices from '../components/Services/DigitalMarketing'
import SoftwareSolutionsSection from '../components/Services/SoftwareSolutions'
import ClientWorkflowSection from '../components/Services/ClientWorkflow'
import CallToActionSection from '../components/Services/CallToAction'

const Services = () => {
  return (
    <div>
      <ServicesBanner/>
         <SoftwareSolutionsSection/>
      <DigitalMarketingServices/>
   
      <ClientWorkflowSection/>
      <CallToActionSection/>
    </div>
  )
}

export default Services
