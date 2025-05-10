import React from 'react';

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-[#434343] text-white">

      <section className="text-center px-6 py-20 max-w-4xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Our <span className="text-red-500">Services</span>
        </h1>
        <p className="text-lg text-gray-300">
          At Gas Up Now, we specialize in one thing—and we do it right: delivering high-quality gas cylinders quickly, safely, and reliably.
        </p>

      </section>

      <section className="py-16 px-6 bg-[#1f1f1f]">

        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-3xl font-semibold text-center mb-6">What We Offer</h2>
          <ul className="space-y-4 text-lg text-gray-300 list-none">
            <li>
              <span className="text-red-400 font-semibold">Residential Gas Cylinder Delivery:</span> For home kitchens, cooking needs, and daily essentials.
            </li>
            <li>
              <span className="text-red-400 font-semibold">Commercial Bulk Orders:</span> Timely and scalable delivery for restaurants, hostels, and small businesses.
            </li>
            <li>
              <span className="text-red-400 font-semibold">Scheduled Cylinder Refills:</span> Choose your preferred day/time and get regular refills without reminders.
            </li>
            <li>
              <span className="text-red-400 font-semibold">Emergency Deliveries:</span> Quick-ship support when you’re running low unexpectedly.
            </li>
            <li>
              <span className="text-red-400 font-semibold">Secure Cylinder Tracking:</span> Digital receipts, refill history, and safety verification in one place.
            </li>
          </ul>
        </div>

      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">

        <h2 className="text-3xl font-semibold text-center mb-10">
          Why Choose <span className="text-red-500">Gas Up Now?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
          {[
            {
              title: "Fast Delivery",
              desc: "We ensure your gas reaches you fast—often within the same day."
            },
            {
              title: "Certified Cylinders",
              desc: "We use only certified, leak-tested, and safety-approved gas cylinders."
            },
            {
              title: "Seamless Ordering",
              desc: "Order gas in a few clicks—no calls, no waiting, no complications."
            },
          ].map((item, index) => (
            <div key={index} className="bg-[#2b2b2b] p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-red-400">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

      </section>

      <section className="text-center py-20 px-6 bg-gradient-to-r from-[#1a1a1a] to-[#2e2e2e]">

        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to place an order?</h2>
        <p className="text-gray-300 mb-6 text-lg">
          Click below to order your gas cylinder now—safe, simple, and fast.
        </p>
        <a href="/order">
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold transition">
            Order Gas
          </button>
        </a>

      </section>

    </div>
  );
};

export default Services;
