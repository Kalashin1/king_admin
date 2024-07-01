import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase-setting";
import { SCREENS } from "../../../../navigation/constant";
import { User } from "../../../../types";
import { useNavigate } from "react-router-dom";
import EditProfileForm from "./edit-profile-form";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const set_up = async (id: string) => {
      try {
        const docRef = await getDoc(doc(db, "users", id));
        const _user = { id: docRef.id, ...docRef.data() } as User;
        setUser(_user);
      } catch (error) {
        alert("error fetching user");
        console.log(error);
        navigate(SCREENS.PROFILE);
      }
    };

    set_up(localStorage.getItem("user_id")!);
  }, [navigate]);

  const [showEditProfileForm, updateShowEditProfileForm] = useState(false);

  if (!showEditProfileForm)
    return (
      <div className="mx-6 px-4 py-8 shadow-md rounded-md bg-white">
        <div className="relative flex flex-col items-center rounded-[20px] w-full bg-clip-border dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
          <div className="mb-8 w-full flex justify-between items-center">
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              General Information
            </h4>
            <button
              onClick={() => updateShowEditProfileForm(!showEditProfileForm)}
            >
              <i className="fas fa-edit" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-md shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {user?.name}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-md shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {user?.email}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-md shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {user?.phone}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-md shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Address</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {user?.address}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-md shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Birthday</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {user?.birthday ? new Date(user?.birthday).toDateString() : ""}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-md shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">BTC Address</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {user?.btcAddress}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-md shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Bank</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {user?.bank?.bankName}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-md shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Account Number</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {user?.bank?.accountNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="px-8">
        <EditProfileForm hideForm={updateShowEditProfileForm} />
      </div>
    );
};

export default Profile;
