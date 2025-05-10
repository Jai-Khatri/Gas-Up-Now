import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-[#434343] text-white">

      <section className="text-center px-6 py-20 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          About <span className="text-red-500">Gas Up Now</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
          Gas Up Now is dedicated to revolutionizing how residential and commercial users access gas.
          We believe in simplicity, speed, and safety—ensuring you never run out of what powers your daily life.
        </p>
      </section>

      <section className="py-16 px-6 bg-[#1f1f1f]">
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6">Our Mission</h2>
          <p className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed">
            Our mission is simple: to deliver gas efficiently and reliably while giving users complete
            control over their orders and schedules. We aim to modernize outdated supply chains using
            intuitive digital tools that put the customer first.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
          {[
            {
              title: "Reliability",
              desc: "We’re committed to delivering when you need us, where you need us."
            },
            {
              title: "Customer Focus",
              desc: "Our systems are designed to keep things clear, simple, and centered around your needs."
            },
            {
              title: "Innovation",
              desc: "We constantly evolve to bring smarter, safer, and more sustainable energy solutions."
            }
          ].map((value, index) => (
            <div key={index} className="bg-[#2b2b2b] p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-red-400">{value.title}</h3>
              <p className="text-md md:text-lg leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-[#1a1a1a]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">Our Story</h2>
          <p className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed">
            Gas Up Now started with a simple idea—why not make gas delivery as seamless as food delivery?
            With a team of engineers, logistics experts, and customer advocates, we built a system that
            combines smart tech with local fulfillment. Today, we’re proud to serve hundreds of homes and
            businesses, with plans to grow across more cities.
          </p>
        </div>
      </section>

      <section className="text-center py-20 px-6 bg-gradient-to-r from-[#1a1a1a] to-[#2e2e2e]">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Want to learn more?</h2>
        <p className="text-gray-300 mb-6 text-lg md:text-xl lg:text-2xl">
          Explore our services or get in touch with us. We’re happy to answer any questions.
        </p>
        <a href="/services">
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md text-lg md:text-xl font-semibold transition">
            View Services
          </button>
        </a>
      </section>
    </div>
  );
};

export default About;
