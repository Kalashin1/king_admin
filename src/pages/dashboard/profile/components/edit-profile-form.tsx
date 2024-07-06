import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { LoaderContext } from "../../../../App";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-setting";
import { User } from "../../../../types";

const EditProfileForm: FC<{
  hideForm: Dispatch<SetStateAction<boolean>>;
}> = ({ hideForm }) => {
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const setup = async () => {
      const docSnap = await getDoc(
        doc(db, "users", localStorage.getItem("user_id")!)
      );
      const existingUser = { id: docSnap.id, ...docSnap.data() };
      setUser(existingUser as User);
    };

    setup();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading!(true);
    const {
      birthday: { value: birthday },
      phone: { value: phone },
      address: { value: address },
      btcAddress: { value: btcAddress },
      accountNumber: { value: accountNumber },
      swiftCode: { value: swiftCode },
      iban: { value: iban },
      bankName: { value: bankName },
    } = formRef.current!;

    try {
      await updateDoc(doc(db, "users", localStorage.getItem("user_id")!), {
        birthday: new Date(birthday).getTime(),
        phone,
        address,
        btcAddress,
        bank: {
          accountNumber,
          swiftCode,
          iban,
          bankName,
        },
      });
      alert("Profile Updated successfully!");
      hideForm(false);
    } catch (error) {
      alert("Error updating profile");
      console.log(error);
    } finally {
      setIsLoading!(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form bg-white p-6 my-10 relative"
      ref={formRef}
    >
      <h3 className="text-2xl text-gray-900 font-semibold mb-6 flex justify-between items-center">
        <span>Edit Your Profile</span>

        <button onClick={() => hideForm(false)} className="text-sm">
          <i className="fas fa-edit text-md place-content-around" />
        </button>
      </h3>
      <p className="text-gray-600 mb-4">Edit Your account information</p>
      <div className="w-full py-4 flex justify-between">
        <div className="w-1/2 flex justify-between mr-4">
          <input
            type="tel"
            name="phone"
            id=""
            defaultValue={user?.phone}
            placeholder="Your phone number"
            className="border p-2 w-full"
          />
        </div>
        <div className="w-1/2">
          <input
            type="text"
            name="address"
            id=""
            value={user?.address}
            placeholder="Your address"
            className="border p-2 w-full"
          />
        </div>
      </div>
      <div className="flex space-x-5 mt-3">
        <input
          type="date"
          name="birthday"
          defaultValue={(() => {
            const padZero = (v: number) => {
              let rV: string;
              new String(v).length < 2 ? (rV = `0${v}`) : (rV = v.toString());
              return rV;
            };
            const birthday = user?.birthday
              ? new Date(user?.birthday)
              : new Date();
            return `${birthday.getFullYear()}-${padZero(
              birthday.getMonth()
            )}-${padZero(birthday.getDate())}`;
          })()}
          id=""
          placeholder="01/11/2024"
          className="border p-2  w-1/2"
        />
        <input
          type="text"
          name="btcAddress"
          id=""
          defaultValue={user?.btcAddress}
          placeholder="Your Bitcoin Address"
          className="border p-2 w-1/2"
        />
      </div>
      <div className="flex space-x-5 mt-3">
        <input
          type="text"
          name="bankName"
          defaultValue={user?.bank.bankName}
          id=""
          placeholder="Enter the name of your bank"
          className="border p-2  w-1/2"
        />
        <input
          type="text"
          name="accountNumber"
          id=""
          defaultValue={user?.bank?.accountNumber}
          placeholder="Enter your account number"
          className="border p-2 w-1/2"
        />
        <input
          type="text"
          name="iban"
          id=""
          defaultValue={user?.bank?.iban}
          placeholder="Enter your Iban"
          className="border p-2  w-1/2"
        />
        <input
          type="text"
          name="swiftCode"
          defaultValue={user?.bank?.swiftCode}
          id=""
          placeholder="Enter your swift code"
          className="border p-2 w-1/2"
        />
      </div>

      <input
        type="submit"
        value={`${isLoading ? "...Loading" : "Submit"}`}
        disabled={isLoading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3 cursor-pointer"
      />
    </form>
  );
};

export default EditProfileForm;
