
import React, { useState } from "react";
import { FaUserTie, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaPhoneAlt, FaCheckCircle, FaWhatsapp, FaBriefcase } from "react-icons/fa";

export const JobPost = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobProfile, setJobProfile] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [contactError, setContactError] = useState("");

  const validateContact = (number: string) => {
    const regex = /^\+\d{1,3}\d{9,}$/;
    if (!regex.test(number)) {
      setContactError("Please enter a valid contact number with country code (e.g., +919876543210).");
    } else {
      setContactError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contactError || !contact) {
      alert("Please fix the errors in the form before submitting.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz6qVawv4WO8jwKT3ldlAj2qC1pq5EO144u64qpN3l2vTzuSVBccyhUMcawe5YIecSFjg/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            jobTitle,
            jobProfile,
            companyName,
            startDate,
            lastDate,
            location,
            contact,
          }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setJobTitle("");
        setJobProfile("");
        setCompanyName("");
        setStartDate("");
        setLastDate("");
        setLocation("");
        setContact("");
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const whatsappLink = `https://wa.me/${contact}?text=Hello!%20I%20am%20interested%20in%20the%20Job%20Post.%0AJob%20Title:%20${jobTitle}%0ACompany:%20${companyName}%0ALocation:%20${location}%0AContact:%20${contact}`;

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-md">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        📝 Job Post Form
        <span className="block text-sm text-gray-600">Submit a new job opening</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Job Title */}
        <div className="flex items-center border-b border-gray-300 pb-2">
          <FaBriefcase className="text-blue-500 mr-3" />
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Job Title"
            className="w-full px-2 py-1 border-none focus:outline-none"
            required
          />
        </div>

        {/* Job Profile */}
        <div className="flex items-center border-b border-gray-300 pb-2">
          <FaUserTie className="text-blue-500 mr-3" />
          <input
            type="text"
            value={jobProfile}
            onChange={(e) => setJobProfile(e.target.value)}
            placeholder="Job Profile"
            className="w-full px-2 py-1 border-none focus:outline-none"
            required
          />
        </div>

        {/* Company Name */}
        <div className="flex items-center border-b border-gray-300 pb-2">
          <FaBuilding className="text-blue-500 mr-3" />
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
            className="w-full px-2 py-1 border-none focus:outline-none"
            required
          />
        </div>

        {/* Form Start Date */}
        <div className="flex items-center border-b border-gray-300 pb-2">
          <FaCalendarAlt className="text-blue-500 mr-3" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-2 py-1 border-none focus:outline-none"
            required
          />
        </div>

        {/* Form Last Date */}
        <div className="flex items-center border-b border-gray-300 pb-2">
          <FaCalendarAlt className="text-blue-500 mr-3" />
          <input
            type="date"
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
            className="w-full px-2 py-1 border-none focus:outline-none"
            required
          />
        </div>

        {/* Location */}
        <div className="flex items-center border-b border-gray-300 pb-2">
          <FaMapMarkerAlt className="text-blue-500 mr-3" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Job Location"
            className="w-full px-2 py-1 border-none focus:outline-none"
            required
          />
        </div>

        {/* Contact */}
        <div className="flex items-center border-b border-gray-300 pb-2">
          <FaPhoneAlt className="text-blue-500 mr-3" />
          <input
            type="text"
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
              validateContact(e.target.value);
            }}
            placeholder="Contact Number (e.g., +919876543210)"
            className={`w-full px-2 py-1 border-none focus:outline-none ${contactError ? "border-red-500" : ""}`}
            required
          />
        </div>
        {contactError && <p className="text-red-600 text-sm">{contactError}</p>}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              "Submitting..."
            ) : (
              <>
                <FaCheckCircle className="mr-2" />
                Submit Job Post
              </>
            )}
          </button>
        </div>
      </form>

      {/* WhatsApp Button */}
      <div className="mt-4">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
        >
          <FaWhatsapp className="mr-2" />
          Contact on WhatsApp
        </a>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mt-6 text-center text-green-600 font-semibold">
          <FaCheckCircle className="inline mr-2" />
          Job post submitted successfully! 🎉
        </div>
      )}
    </div>
  );
};

