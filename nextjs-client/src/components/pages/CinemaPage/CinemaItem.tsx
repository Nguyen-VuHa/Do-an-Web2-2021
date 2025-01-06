import React from 'react'
import ImageCustom from '~/components/ui/ImageCustom'

const CinemaItem = () => {
  return (
    <div
        className="
                w-full h-full rounded-circle-md bg-second p-2 shadow-lg
                cursor-pointer bg-second hover:bg-opacity-40
                transition-all duration-300 space-y-2
            "
      >
        <div className="w-full h-[200px] rounded-circle-md overflow-hidden">
          <ImageCustom
            imgClassName="w-full h-full"
            src="https://bhdstar.vn/wp-content/uploads/2023/12/0000000010.png"
            alt="NO CINEMA IMG"
            width={200}
            height={100}
          />
        </div>
        <h4
          className="text-xl font-semibold text-transparent
            bg-clip-text bg-gradient-to-r from-instagram to-social-x"
        >
          BHD Star Lê Văn Việt
        </h4>
        <div className="space-y-2">
            <span className="text-sm text-social-x italic">Tầng 4, Vincom Plaza Lê Văn Việt, 50 Lê Văn Việt, P.Hiệp Phú, Quận 9, TP.HCM</span>
        </div>
      </div>
  )
}

export default CinemaItem