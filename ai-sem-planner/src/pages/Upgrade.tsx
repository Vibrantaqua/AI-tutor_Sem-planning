import { useNavigate } from "react-router-dom";

export default function Upgrade() {
  const navigate = useNavigate();

  const plans = [
    { name: "Pro", price: "₹499/month", benefits: ["Unlimited chats", "Advanced AI", "Priority support"] },
    { name: "Enterprise", price: "Custom", benefits: ["Team access", "Custom features"] },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-darkGreen">Upgrade Your Plan</h2>
        <p>Choose a plan to unlock more features:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plans.map(plan => (
            <div key={plan.name} className="p-4 border rounded-lg shadow hover:scale-105 transition">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-sm mb-2">{plan.price}</p>
              <ul className="list-disc list-inside text-sm mb-2">
                {plan.benefits.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              <button className="px-4 py-2 bg-knowledgeGreen text-white rounded hover:bg-darkGreen transition">
                Select {plan.name}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/account")}
          className="mt-4 px-4 py-2 bg-gray-200 text-darkGreen rounded hover:bg-darkGreen hover:text-white transition"
        >
          Back to Account
        </button>
      </div>
    </div>
  );
}
