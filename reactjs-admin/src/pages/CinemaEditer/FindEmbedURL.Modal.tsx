
interface FindEmbedURLModal {
    isOpen?: boolean;
    address?: string;
}

const FindEmbedURLModal: React.FC<FindEmbedURLModal> = ({
    isOpen,
    address
}) => {
  return (
    <div
      className={`fixed w-full h-full top-0 left-0 flex justify-center items-center dark:bg-boxdark/50 bg-strokedark/30
        ${isOpen ? 'z-[10000] transition-all' : 'hidden z-[-10]'}`}
    >
        <div className='flex flex-col justify-center items-center bg-strokedark bg-opacity-80 px-3 py-2 rounded-lg space-y-2'>
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-solid border-rose border-t-transparent"></div>
            <span className='text-rose'>Đang tìm kiếm embed map URL với địa chỉ</span>
            <span className='text-warning font-semibold text-lg'>{ address }</span>
        </div>
    </div>
  )
}

export default FindEmbedURLModal