import React, { useState } from 'react';
import { useAuth } from '../store/auth';

function AdminAddAirdrop() {
  const { AuthorizationToken } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    twitterlink: '',
    discordlink: '',
    profileimage: null,  // Files should be initialized as null
    content1: '',
    url1: '',
    blogimage1: null, // Files should be initialized as null
  });

  const [loading, setLoading] = useState(false);

  // Handle form input changes (text fields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input changes with file size validation
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    // Ensure only one file is selected and file size validation
    if (files[0]) {
      if (files[0].size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
    }

    // Update the file in the form data state
    setFormData({
      ...formData,
      [name]: files[0], // Only store the first selected file
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form submission starts

    // Create a FormData object to send form data and files
    const formDataToSend = new FormData();

    // Append regular form fields (text inputs) to FormData
    Object.keys(formData).forEach((key) => {
      if (formData[key] && key !== 'profileimage' && key !== 'blogimage1') { // Exclude file fields from text appending
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append files (image fields) to FormData only if they exist
    if (formData.profileimage) {
      formDataToSend.append('profileimage', formData.profileimage);
    }
    if (formData.blogimage1) {
      formDataToSend.append('blogimage1', formData.blogimage1);
    }


    try {
      const response = await fetch('https://cryptoweb-8nuf.onrender.com/api/v1/add', {
        method: 'POST',
        headers: {
          Authorization: AuthorizationToken, // Include the Authorization token for authentication
        },
        body: formDataToSend, // Send the FormData object (not the formData state object)
      });

      const data = await response.json();


      if (response.ok) {
        alert('Airdrop added successfully');
        // Optionally reset form state after submission
        setFormData({
          title: '',
          description: '',
          twitterlink: '',
          discordlink: '',
          profileimage: null,
          content1: '',
          url1: '',
          blogimage1: null,
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error occurred while submitting form:", error.message);
      alert('An error occurred while adding the airdrop');
    } finally {
      setLoading(false); // Set loading to false once the submission finishes
    }
  };

  return (
    <div className="h-[100%] w-[100%] rounded-3xl">
      <form onSubmit={handleSubmit} className="flex justify-center items-center w-[100%] h-[100%] rounded-3xl">
        <div className="w-[100%] h-[100%] flex justify-center items-center rounded-2xl shadow-lg">
          {/* Left Side Form (General Info) */}
          <div className="w-1/2 flex flex-col p-9 items-center">
            {/* Title */}
            <div className="flex flex-col gap-4 mb-6 w-[100%]">
              <label className="font-semibold text-white bg-transparent">Title:</label>
              <input
                className="w-full h-[40px] bg-transparent focus:text-[#FFFD37]  placeholder-white border border-[#FFFD37] text-zinc-950  outline-none rounded-md p-2 "
                type="text"
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col text-white gap-4 mb-6 w-[100%]">
              <label className="font-semibold">Description:</label>
              <input
               className="w-full h-[40px] bg-transparent focus:text-[#FFFD37]  placeholder-white border border-[#FFFD37] text-zinc-950  outline-none rounded-md p-2 "
                type="text"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Twitter Link */}
            <div className="flex flex-col gap-4 mb-6 w-[100%]">
              <label className="font-semibold text-white">Twitter Link:</label>
              <input
               className="w-full h-[40px] bg-transparent  shadow-black shadow-sm    focus:text-[#FFFD37]  placeholder-white border border-[#FFFD37] text-zinc-950  outline-none rounded-md p-2 "
                type="url"
                name="twitterlink"
                value={formData.twitterlink}
                onChange={handleChange}
                required
                placeholder="Enter Twitter URL"
              />
            </div>

            {/* Discord Link */}
            <div className="flex flex-col gap-4 mb-6 w-[100%]">
              <label className="font-semibold text-white">Discord Link:</label>
              <input
                className="w-full h-[40px] shadow-black shadow-sm  bg-transparent focus:text-[#FFFD37]  placeholder-white border border-[#FFFD37] text-zinc-950  outline-none rounded-md p-2 "
                type="url"
                name="discordlink"
                value={formData.discordlink}
                onChange={handleChange}
                required
                placeholder="Enter Discord URL"
              />
            </div>

            {/* Profile Image */}
            <div className="flex flex-col gap-4 mb-6 w-[100%]">
              <label className="font-semibold text-white">Profile Image:</label>
              <input
                type="file"
                name="profileimage"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full h-[50px] bg-transparent focus:text-[#FFFD37]  placeholder-white border border-[#FFFD37] text-white outline-none rounded-md p-2 "
              />
            </div>
          </div>

          {/* Right Side Form (Blog Content) */}
          <div className="w-1/2 flex flex-col p-9 gap-4 items-center">
            {/* Content 1 */}
            <div className="flex flex-col gap-4 w-[100%]">
              <label className="font-semibold text-white">Content 1:</label>
              <textarea
                placeholder="Write your blog content here"
                rows="6"
                name="content1"
                value={formData.content1}
                onChange={handleChange}
               className="w-full h-[90px] bg-transparent focus:text-[#FFFD37]  placeholder-white border border-[#FFFD37] text-zinc-950  outline-none rounded-md p-2 "
                required
              />
            </div>

            {/* URL 1 */}
            <div className="flex flex-col mt-4 gap-4 mb-6 w-[100%]">
              <label className="font-semibold text-white">Enter URL 1:</label>
              <input
               className="w-full h-[40px] bg-transparent focus:text-[#FFFD37]  placeholder-white border border-[#FFFD37] text-zinc-950  outline-none rounded-md p-2 "
                type="url"
                name="url1"
                value={formData.url1}
                onChange={handleChange}
                placeholder="Enter URL"
              />
            </div>

            {/* Blog Image 1 */}
            <div className="flex flex-col gap-4 mb-6 w-[100%]">
              <label htmlFor="blogimage1" className="font-semibold text-white">Blog Image 1:</label>
              <input
                type="file"
                name="blogimage1"
                onChange={handleFileChange}
                accept="image/*"
               className="w-full h-[50px] bg-transparent focus:text-[#FFFD37]  placeholder-white border border-[#FFFD37] text-zinc-950  outline-none rounded-md p-2 "
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FFFD37] to-[#00FF40] text-black rounded-lg p-3 mt-6"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminAddAirdrop;
