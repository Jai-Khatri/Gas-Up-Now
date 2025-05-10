import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-[#434343] text-white">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Welcome to <span className="text-red-500">Gas Up Now</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl">
          Your trusted gas agency system — order gas quickly, track deliveries, and manage your account all in one place.
        </p>
        <Link to="/order">
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold transition">
            Order Gas Now
          </button>
        </Link>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#1f1f1f] py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Seamless Ordering', desc: 'Order gas with just a few clicks—no hassle, no delays.' },
              { title: 'Fast Delivery', desc: 'Experience lightning-fast delivery from our trained agents.' },
              { title: 'Reliable Support', desc: 'Got a question? Our team is ready 24/7 to assist you.' }
            ].map((item, i) => (
              <div key={i} className="bg-[#2b2b2b] p-6 rounded-lg shadow hover:shadow-lg transition text-left">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-red-400">{item.title}</h3>
                <p className="text-gray-300 md:text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-12">Our Services</h2>
        <div className="space-y-12 text-gray-300 md:text-lg lg:text-xl">
          {[
            {
              title: 'Residential Gas Supply',
              desc: 'Schedule your home gas delivery anytime. Perfect for kitchens and personal usage. Fast, safe, and always on time.'
            },
            {
              title: 'Commercial Gas Solutions',
              desc: 'We serve restaurants, factories, and commercial facilities with reliable and high-capacity gas supplies.'
            },
            {
              title: 'Subscription Plans',
              desc: 'Coming soon — monthly and prepaid plans to ensure you never run out of gas when you need it most.'
            }
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-[#1a1a1a] to-[#2e2e2e]">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-gray-300 text-lg md:text-xl mb-8">
          Place your order today and enjoy stress-free service from Gas Up Now.
        </p>
        <Link to="/order">
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold transition">
            Order Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
