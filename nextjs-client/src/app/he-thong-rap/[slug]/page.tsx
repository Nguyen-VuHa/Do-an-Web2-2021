import MaintainceScreen from '~/components/common/MaintainceScreen';
import CinemaDetaiLeftContent from '~/components/pages/CinemaDetailPage/CinemaDetaiLeftContent';
import CinemaDetailHeader from '~/components/pages/CinemaDetailPage/CinemaDetailHeader';
import CinemaDetailRightContent from '~/components/pages/CinemaDetailPage/CinemaDetailRightContent';


export async function generateMetadata({ params }: { params: { slug: string } }) { 
    return {
        title: `BHD Star - ${params.slug}`,
    };
}

const CinemaDetailMain = async ({ params }: { params: { slug: string } }) => {
    try {
        console.log(params.slug);
    
        return (
            <div className='container mx-auto py-10 space-y-5'>
                <CinemaDetailHeader />
                <div className='grid grid-cols-1 xl:grid-cols-5 space-y-3 lg:space-y-0 lg:gap-4 px-5 lg:px-0'>
                    <CinemaDetaiLeftContent />
                    <CinemaDetailRightContent />
                </div>
                
            </div>
        )
    } catch (error) {
        console.error("Error fetching data:", error);
        return <MaintainceScreen />;
    }
}

export default CinemaDetailMain