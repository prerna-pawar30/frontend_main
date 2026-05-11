import React, { useState } from "react";
import contactImg from "../assets/contact/Contact us-png.png";
import Swal from "sweetalert2";
import apiService from "../api/ApiService";
import FormField from "../components/ui/FormField";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone.replace(/[^\d]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await apiService.createContact(form);

      if (res.data.success) {
        Swal.fire({
          title: "Message Sent!",
          text: "Your message has been sent successfully 😊",
          icon: "success",
          confirmButtonColor: "#E68736",
          background: "#ffffff",
        });

        setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      } else {
        Swal.fire({
          title: "Oops!",
          text: res.data.message || "Something went wrong!",
          icon: "error",
          confirmButtonColor: "#E68736",
        });
      }
    } catch (err) {
      console.error("Submission Error:", err);
      Swal.fire({
        title: "Connection Error",
        text: "Unable to connect to backend 😕",
        icon: "warning",
        confirmButtonColor: "#E68736",
      });
    }
  };

  return (
    <div className="py-16 bg-white">
      {/* Heading */}
      <div className="text-center px-6 ">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#072434]">
          Contact Us
        </h2>
        <p className="text-[18px] text-gray-400 mt-2">Drop us a Message</p>
      </div>

      {/* Form + Image */}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-12">
        <div className="animate-fade-up animation-delay-400">
          <h3 className="text-[30px] font-bold text-[#011632]">Get In Touch</h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />

            <FormField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              className="sm:col-span-2"
            />

            <FormField
              label="Phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              className="sm:col-span-2"
            />

            <FormField
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              error={errors.message}
              isTextArea={true}
              className="sm:col-span-2"
            />

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full sm:w-auto  text-white font-semibold py-3 px-10 rounded-lg text-[18px] transition-colors duration-300"
                style={{ background: 'linear-gradient(160deg, #fbd3bc, #f6811b 100%)' }}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-center md:justify-end animate-fade-up">
          <img src={contactImg} className="w-[450px] md:w-[650px] lg:w-[1000px]" alt="Contact" />
        </div>
      </div>

      {/* Info Cards */}
      <div className="w-full justify-center mt-16 px-12">
        <div className="relative p-[2px] rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E68736] via-[#f7c7a1] to-[#E68736] animate-corner-flow"></div>
          <div className="relative bg-white rounded-2xl p-10 w-full border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center bg-[#FBECE0]">
                  <i className="bi bi-envelope-fill text-[#E68736] text-3xl"></i>
                </div>
                <h4 className="font-semibold text-xl mt-4">Mail Us</h4>
                <p className="text-sm text-[#3C4959] mt-2">info@digident.in</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center bg-[#FBECE0]">
                  <i className="bi bi-geo-alt-fill text-[#E68736] text-3xl"></i>
                </div>
                <h4 className="font-semibold text-xl mt-4">Visit Us</h4>
                <p className="text-sm text-[#3C4959] mt-2">314, Sapna Sangeeta Rd, Indore, MP 452001</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center bg-[#FBECE0]">
                  <i className="bi bi-telephone-fill text-[#E68736] text-3xl"></i>
                </div>
                <h4 className="font-semibold text-xl mt-4">Call Us</h4>
                <p className="text-sm text-[#3C4959] mt-2">+91 9294503001</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mt-16 rounded overflow-hidden px-12 animate-fade-up">
        <iframe
          title="Digident location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.5186419790215!2d75.86714097530438!3d22.70802772796112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fce63b7b2507%3A0xc3995874288001e9!2sDigident%20India%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
          className="w-full h-80 border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}