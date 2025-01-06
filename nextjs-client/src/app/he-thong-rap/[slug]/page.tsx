import React from 'react'
import MaintainceScreen from '~/components/common/MaintainceScreen';

const CinemaDetailMain = async ({ params }: { params: { slug: string } }) => {
    try {
        console.log(params.slug);
    
        return (
            <div className='container mx-auto'>CinemaDetailMain</div>
        )
    } catch (error) {
        console.error("Error fetching data:", error);
        return <MaintainceScreen />;
    }
}

export default CinemaDetailMain