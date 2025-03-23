import ImageCustom from "~/components/ui/ImageCustom";
import { DEFAULT_AVATAR_USER } from "~/constants/user";
import { useUserStore } from "~/stores/user.store";

const EditAvatar = () => {
  const { userAvatars, avatarSelected, setStateUser } = useUserStore();
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-center items-center">
        <div className="w-64 h-64">
          <ImageCustom
            imgClassName="w-full h-full"
            src={avatarSelected || DEFAULT_AVATAR_USER}
            alt="NO AVARTAR"
            width={400}
            height={400}
          />
        </div>
      </div>
      <hr />
      <div className="flex flex-wrap gap-2">
        {userAvatars &&
          userAvatars.length > 0 &&
          userAvatars.map((avatar) => {
            return (
              <div
                key={avatar.user_photo_id}
                className={`p-1 w-20 h-20 shadow-md shadow-layout rounded-circle-md cursor-pointer hover:bg-social-x/60 transition-all 
             ${avatarSelected === avatar.image_url ? "bg-social-x" : ""}
             `}
                onClick={() => {
                  if (avatarSelected !== avatar.image_url)
                    setStateUser("avatarSelected", avatar.image_url);
                }}
              >
                <ImageCustom
                  imgClassName="w-full h-full rounded-circle-md"
                  src={avatar.image_url || DEFAULT_AVATAR_USER}
                  alt="NO AVARTAR"
                  width={200}
                  height={200}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EditAvatar;
