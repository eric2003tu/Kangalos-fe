import React from 'react'
import InnovationProjectHub from '@/features/projects/projectPage/components/ui/InnovationProjectHub'
import { AllProjects } from './ui/AllProjects'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const ViewProjects = () => {
  return (
    <div className="w-full grid  justify-items-center">
      <InnovationProjectHub/>
      <AllProjects/>
    </div>
  )
}

export default ViewProjects