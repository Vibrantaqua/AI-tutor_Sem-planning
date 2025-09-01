"use client";

import { useEffect, useState } from "react";

export default function LessonPlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch("/lesson-plans");
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lesson Plans</h1>
      <a
        href="/lesson-plans/create"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
      >
        + New Lesson Plan
      </a>
      <ul className="space-y-3">
        {plans.map((plan) => (
          <li
            key={plan.id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{plan.title}</h2>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </div>
            <a
              href={`/lesson-plans/${plan.id}`}
              className="text-blue-600 hover:underline"
            >
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
