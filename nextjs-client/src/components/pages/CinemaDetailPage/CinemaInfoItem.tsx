import React from 'react'


interface CinemaInfoItemProps {
    title: string;
    content: string;
}

const CinemaInfoItem: React.FC<CinemaInfoItemProps> = ({
    title, content
}) => {
  return (
    <div className='text-warning'>
        <b className='whitespace-nowrap text-instagram font-semibold mr-1'>{title}</b>
        {content}
    </div>
  )
}

export default CinemaInfoItem