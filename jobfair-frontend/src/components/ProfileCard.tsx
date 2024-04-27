import { SafeUser } from "@/types"
import { Avatar, Icon } from "@mui/material";
import { IconType } from "react-icons";


interface ProfileCardProps{
    currentUser:SafeUser;
    icon?:IconType;
}

const ProfileCard:React.FC<ProfileCardProps> = ({
    currentUser,
    icon:Icon,
}) => {

    return (
        <div className="max-w-lg mx-auto rounded-lg overflow-hidden shadow-lg">
      <div className="bg-blue-400 h-40 flex  items-center justify-center">
      <div className=" justify-centers  ">
                <Avatar src={currentUser.image} sx={{ width: 90, height: 90}} />
            </div>
      </div>
      <div className="p-6">
        <div className="text-center">
          <h3 className="text-3xl font-semibold text-blue-700">
            {currentUser.name}
          </h3>
          <div>
            {Icon && (
            <Icon
                size={24}
                className="
                absolute
                "
                />
                )}
            <p className="text-blue-500 ">{currentUser.email}</p>
            <p className="text-blue-500">{currentUser.tel}</p>
          </div>
          
        </div>
        <div className="mt-4">
          <p className="text-gray-700">
            {/* Add more user information here if needed */}
          </p>
        </div>
      </div>
    </div>
    );
};

export default ProfileCard;

