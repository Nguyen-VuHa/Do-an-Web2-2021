import { FaFacebook } from "react-icons/fa";
import FooterItem from "./FooterItem";
import SocialButton from "./SocialButton";
import Title from "./Title";
import { TfiYoutube } from "react-icons/tfi";
import { SlSocialInstagram } from "react-icons/sl";
import { SiZalo } from "react-icons/si";
import CertificateBCT from "~/assets/imgs/certificate.png";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="container mx-auto p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <Title label="QUY ĐỊNH & ĐIỀU KHOẢN" />
        <ul className="space-y-4 text-typography ">
          <li>
            <FooterItem title="Quy định thành viên" />
          </li>
          <li>
            <FooterItem title="Điều khoản" />
          </li>
          <li>
            <FooterItem title="Hướng dẫn đặt vé trực tuyến" />
          </li>
          <li>
            <FooterItem title="Quy định và chính sách chung" />
          </li>
          <li>
            <FooterItem title="Chính sách bảo mật thông tin" />
          </li>
        </ul>
      </div>
      <div>
        <Title label="VỀ BHD STAR" />
        <ul className="space-y-4 text-typography ">
          <li>
            <FooterItem title="Hệ thống rạp" />
          </li>
          <li>
            <FooterItem title="Lịch chiếu phim" />
          </li>
          <li>
            <FooterItem title="Khuyến mãi & Thành viên" />
          </li>
        </ul>
      </div>
      <div>
        <Title label="KẾT NỐI BHD STAR" />
        <ul className="space-y-4 text-typography ">
          <li>
            <div className="flex space-x-1">
              <SocialButton
                link="https://www.facebook.com/BHDStar"
                className="text-facebook bg-facebook bg-opacity-20 hover:bg-opacity-100 hover:text-[white]"
                icon={<FaFacebook size={22} />}
              />
              <SocialButton
                link="https://www.youtube.com/c/BHDStar"
                className="text-youtube bg-youtube bg-opacity-20 hover:bg-opacity-100 hover:text-[white]"
                icon={<TfiYoutube size={22} />}
              />
              <SocialButton
                link="https://www.instagram.com/bhdstar.cineplex/"
                className="text-instagram bg-instagram bg-opacity-20 hover:bg-opacity-100 hover:text-[white]"
                icon={<SlSocialInstagram size={22} />}
              />
              <SocialButton
                link="https://zalo.me/1884424922722396289"
                className="text-social-x bg-social-x bg-opacity-20 hover:bg-opacity-100 hover:text-[white]"
                icon={<SiZalo size={22} />}
              />
            </div>
          </li>
          <li>
            <a
              href="http://online.gov.vn/Home/WebDetails/46605"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                width={215}
                height={80}
                src={CertificateBCT}
                alt="NO CERTIFICATE"
              />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <Title label="Chăm Sóc Khách Hàng" />
        <ul className="space-y-4 text-typography ">
          <li>
            <FooterItem title="Hotline: 1900 1006" />
          </li>
          <li>
            <FooterItem title="Giờ Làm Việc 8:00 - 22:00(Tất cả các ngày bao gồm lễ)" />
          </li>
          <li>
            <FooterItem
              link="https://mail.google.com"
              title="Email Hỗ Trợ: cgv.cinema.vn@gmail.com"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
