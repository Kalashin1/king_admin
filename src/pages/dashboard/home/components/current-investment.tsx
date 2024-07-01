/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from "react";
import { Plan } from "../../../../types";
import { SCREENS } from "../../../../navigation/constant";
import { useNavigate } from "react-router-dom";

const CurrentInvestment: FC<{ plans: Plan[] }> = ({ plans }) => {
  const planColors = {
    1: {
      weak: "blue-200",
      strong: "blue-600",
    },
    2: {
      weak: "green-200",
      strong: "green-700",
    },
    3: {
      weak: "yellow-200",
      strong: "yellow-700",
    },
    4: {
      weak: "purple-200",
      strong: "purple-700",
    },
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* <!-- Pricing Card 1 --> */}
        {plans &&
          plans.map((plan, index) => (
            <div
              className={`bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105`}
              key={index}
            >
              {/* @ts-ignore */}
              <div className={`p-1 bg-${planColors[index + 1].weak}`}></div>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {plan.title}
                </h2>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <p className="text-4xl font-bold text-gray-800 mb-6">
                  {new Intl.NumberFormat("en-US", {
                    currency: "USD",
                    style: "currency",
                  }).format(parseFloat(plan.price))}
                </p>
                <ul className="text-sm text-gray-600 mb-6">
                  <li className="mb-2 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Duration: {plan.duration} Days
                  </li>
                  <li className="mb-2 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    ROI: {plan.ROI}%
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    24/7 Support
                  </li>
                </ul>
              </div>
              <div className="p-4">
                <button
                  onClick={() => navigate(SCREENS.CREATE_INVESTMENT)}
                  className={`w-full bg-${
                    // @ts-ignore
                    planColors[index + 1].strong
                  } text-white rounded-full px-4 py-2 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800`}
                >
                  Add User
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CurrentInvestment;
