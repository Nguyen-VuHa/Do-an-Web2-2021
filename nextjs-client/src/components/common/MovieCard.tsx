import React from 'react'
import ImageCustom from '../ui/ImageCustom'
import Button from '../ui/Button';

interface MovieCardProps {
    imgURL: string;
    cardType?: 'showing' | 'coming-soon'
}

const MovieCard: React.FC<MovieCardProps> = ({
    imgURL,
    cardType = 'showing',
}) => {
  return (
    <div
        className='group relative flex justify-center items-center cursor-pointer overflow-hidden rounded-circle-md'
    >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-layout/50 to-layout rounded-lg pointer-events-none z-[1]"></div>
        <div className='w-full h-movie-card'>
            <ImageCustom 
                src={imgURL}
                alt='NO IMAGE'
                imgClassName="w-full h-full object-cover object-top"
                width={200}
                height={400}
            />
        </div>
        <div 
            className='
                absolute bottom-0 w-full h-[80px] z-[10] 
                backdrop-blur-[1px] group-hover:backdrop-blur-[8px] shadow-[0_-10px_10px_rgba(0,0,0,0.1)] border border-layout/20
                group-hover:h-[140px] transition-all duration-300 px-3
            '
        >
            <div className='relative h-full space-y-2 flex justify-between flex-col'>
                <h4 
                    className='text-transparent 
            bg-clip-text bg-gradient-to-r from-instagram to-primary text-social-x text-center font-semibold overflow-hidden text-ellipsis line-clamp-3'
                >
                THE SUPER ELFKINS: BIỆT ĐỘI TÍ HON THE SUPER ELFKINS: BIỆT ĐỘI TÍ HON
                </h4>
                <div 
                    className='absolute flex space-x-1 w-full translate-y-[40px] opacity-0 invisible group-hover:relative group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible'
                >
                    {
                        cardType === 'showing' && <Button 
                            className='
                                w-full translate-x-[-80px] opacity-10
                                group-hover:translate-x-[0] group-hover:opacity-100
                                transition-all duration-300
                            '
                            buttonType='info'
                        >
                            Mua vé
                        </Button>
                    }
                    <Button className='
                        w-full translate-x-[80px] opacity-10
                        group-hover:translate-x-[0] group-hover:opacity-100
                        transition-all duration-300
                    '
                        buttonType='error'
                    >
                        Xem trailler
                    </Button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default MovieCard