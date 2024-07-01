/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Investment, Plan, User } from "../../../../types";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase-setting";
import { useNavigate } from "react-router-dom";
import { SCREENS } from "../../../../navigation/constant";
import { LoaderContext } from "../../../../App";

type WithdrawalMethod = {
  label: "BTC" | string;
  value: string;
};

const WithdrawalForm = () => {
  const user_id = localStorage.getItem("user_id");
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const [user, setUser] = useState<User | null>(null);

  const [selectedInvestment, setSelectedInvestment] =
    useState<Investment | null>(null);
  const [withdrawalMethod, setSelectedWithdrawalMethod] =
    useState<WithdrawalMethod | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [withdrawalMethods, setWithdrawalMethods] = useState<
    WithdrawalMethod[]
  >([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const set_up = async (user_id: string) => {
      const docRef = await getDoc(doc(db, "users", user_id));

      if (docRef.exists()) {
        const _user = { ...docRef.data(), id: docRef.id } as User;
        if (
          _user.bank === null ||
          _user?.bank === undefined ||
          !_user.btcAddress
        ) {
          alert("You have to complete your profile information to withdraw");
          navigate(SCREENS.PROFILE);
        }
        setUser(_user);
        const bank: WithdrawalMethod = {
          label: `${_user.bank.bankName} - ${_user.bank.accountNumber}`,
          value: _user.bank.accountNumber,
        };
        const btc: WithdrawalMethod = {
          label: "BTC",
          value: _user.btcAddress,
        };
        setWithdrawalMethods([bank, btc]);
        const q = query(
          collection(db, "investments"),
          where("user.id", "==", docRef.id)
        );
        const docRefs = await getDocs(q);
        const _investments = docRefs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Investment[];
        if (!_investments) {
          alert(
            "You have to investment before you can withdraw, contact admin"
          );
          navigate(SCREENS.DASHBOARD);
        }
        setInvestments(_investments);
      }
    };

    set_up(user_id!);
  }, [navigate, user_id]);

  const requestWithdrawal = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading!(true);
    const {
      amount: { value: amount },
    } = formRef.current!;
    const planRef = await getDoc(
      doc(db, "plans", selectedInvestment?.plan.id!)
    );
    const plan = { id: planRef.id, ...planRef.data() } as Plan;
    const planTotal = parseFloat(plan.price) * (100 / parseFloat(plan.ROI));
    try {
      if (amount > planTotal) {
        alert("Withdrawal amount exceeds total ROI");
        return;
      }
      await addDoc(collection(db, "transactions"), {
        type: "WITHDRAWAL",
        createdAt: new Date().getTime().toString(),
        amount: amount,
        status: "PENDING",
        user: { id: user?.id, name: user?.name, email: user?.email },
        method: withdrawalMethod,
      });
      alert("withdrawal Request Logged, awaiting approval");
      navigate(SCREENS.DASHBOARD);
    } catch (error) {
      alert("Error requesting withdrawal, try again later");
      console.log(error);
    } finally {
      setIsLoading!(false);
    }
  };

  return (
    <form
      ref={formRef}
      className="form bg-white p-6 my-10 relative"
      onSubmit={requestWithdrawal}
    >
      <h3 className="text-2xl text-gray-900 font-semibold">
        Request Withdrawal
      </h3>
      <p className="text-gray-600">Request a new withdrawal</p>
      <div className="flex space-x-5 mt-3">
        <div className="w-1/2">
          <Select
            options={investments.map((investment) => ({
              value: investment.id,
              label: investment.plan.title,
            }))}
            onChange={(v) =>
              setSelectedInvestment(
                investments.find((_investment) => _investment.id === v?.value)!
              )
            }
            placeholder="Select the plan you'd like to withdraw from"
          />
        </div>
        <div className="w-1/2">
          <Select
            options={withdrawalMethods}
            onChange={(v) => setSelectedWithdrawalMethod(v)}
            placeholder="select Your withdrawal method"
          />
        </div>
      </div>
      <input
        type="number"
        name="amount"
        id=""
        placeholder="Enter withdrawal amount in USD"
        className="border p-2 w-full mt-3"
      />

      <input
        type="submit"
        value={isLoading ? "...Loading" : "Request Withdrawal"}
        disabled={isLoading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3"
      />
    </form>
  );
};

export default WithdrawalForm;
