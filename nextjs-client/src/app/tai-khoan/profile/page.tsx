import React from "react";
import CoverImage from "~/components/pages/UserProfile/CoverImage";
import EditPhotoModal from "~/components/pages/UserProfile/EditPhoto.Modal";
import ProfileTab from "~/components/pages/UserProfile/ProfileTab";
import UserInfo from "~/components/pages/UserProfile/UserInfo";

export const metadata = {
  title: "BHD Star - Profile",
};

const ProfilePage = () => {
  return (
    <div className="relative w-full h-full container mx-auto">
      <EditPhotoModal />
      
      <CoverImage />
      <UserInfo />

      <ProfileTab />
    </div>
  );
};

export default ProfilePage;
