import React from 'react'
interface TitleProps {
    title: string
}

const Title = ({title}:TitleProps) => {
  return (
    <h2 className='text-amber-900 font-medium'>{title}</h2>
  )
}

export default Title