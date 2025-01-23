import React from "react";
import CoverImage from "~/components/pages/UserProfile/CoverImage";
import ProfileTab from "~/components/pages/UserProfile/ProfileTab";
import UserInfo from "~/components/pages/UserProfile/UserInfo";

export const metadata = {
  title: "BHD Star - Profile",
};

const ProfilePage = () => {
  return (
    <div className="relative w-full h-full container mx-auto">
      <CoverImage />
      <UserInfo />

      <ProfileTab />
    </div>
  );
};

export default ProfilePage;
