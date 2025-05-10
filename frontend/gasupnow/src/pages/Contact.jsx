import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, like sending the data to the backend
    alert('Your message has been sent!'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-[#434343] text-white">
      {/* Header Section */}
      <section className="text-center px-6 py-20 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact <span className="text-red-500">Us</span></h1>
        <p className="text-lg text-gray-300">
          We're here to help you! Fill out the form below or reach out to us through our other contact channels.
        </p>
      </section>

      {/* Contact Form */}
      <section className="px-6 py-16 max-w-4xl mx-auto bg-[#1f1f1f] rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8 text-red-400">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-lg text-gray-300">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 bg-[#2b2b2b] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lg text-gray-300">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 bg-[#2b2b2b] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-lg text-gray-300">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-2 mt-2 bg-[#2b2b2b] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold transition">
              Send Message
            </button>
          </div>
        </form>
      </section>

      <section className=" mt-8 px-6 py-16 bg-gradient-to-r from-[#1a1a1a] to-[#2e2e2e] text-center">
        <h2 className="text-3xl font-semibold mb-6 text-red-400">Other Ways to Reach Us</h2>
        <p className="text-lg text-gray-300 mb-4">You can also reach us through the following:</p>

        <div className="space-y-4">
          <p className="text-lg text-gray-300">
            <span className="font-semibold">Phone:</span> +123 456 7890
          </p>
          <p className="text-lg text-gray-300">
            <span className="font-semibold">Email:</span> support@gasupnow.com
          </p>
          <p className="text-lg text-gray-300">
            <span className="font-semibold">Office Hours:</span> Mon - Fri, 9 AM - 6 PM
          </p>
        </div>
      </section>

      <section className="text-center py-16 px-6 bg-gradient-to-r from-[#1a1a1a] to-[#2e2e2e]">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Immediate Assistance?</h2>
        <p className="text-gray-300 mb-6 text-lg">
          Our team is ready to assist you with any inquiries you may have. Feel free to call us directly.
        </p>
        <a href="tel:+1234567890">
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold transition">
            Call Now
          </button>
        </a>
      </section>
    </div>
  );
};

export default Contact;
