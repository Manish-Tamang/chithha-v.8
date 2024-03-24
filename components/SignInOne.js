"use client";
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { CheckCircle, X } from 'lucide-react'

function generateUniqueCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = letters.charAt(
    Math.floor(Math.random() * letters.length)
  );
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
  return randomNumber.toString() + randomLetter;
}

const SignInOne = () => {
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const contact = event.target.contact.value;
    const location = event.target.location.value;
    const photo = event.target.photo.files[0]; // Assuming file input has the name 'photo'

    // Generate the unique code
    const uniqueCode = generateUniqueCode();

    try {
      // Save form data to Firestore
      const docRef = await addDoc(collection(db, "chitthaForms"), {
        name: name,
        email: email,
        contact: contact,
        location: location,
        uniqueCode: uniqueCode, // Add the generated unique code to the document
      });

      let imageURL = ''; // To store the image URL

      // Upload image to Storage (if photo is selected)
      if (photo) {
        const storageRef = ref(storage, `images/${docRef.id}/${photo.name}`);
        await uploadBytes(storageRef, photo);

        // Get the download URL of the uploaded image
        imageURL = await getDownloadURL(storageRef);
      }

      // Update the Firestore document with the image URL
      await updateDoc(doc(db, "chitthaForms", docRef.id), {
        imageURL: imageURL,
      });

      // Reset form fields after successful submission
      event.target.reset();
      setPhoto(null);

      // Set success message
      setErrorMessage(
        `Form submitted successfully! Your unique code is: ${uniqueCode}`
      );
    } catch (error) {
      console.error("Error adding document: ", error);
      // Set error message
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Function to clear error message
  const clearError = () => {
    setErrorMessage("");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <section className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl">
        <div className="flex flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Chittha
            </h2>
            {errorMessage && (
              <div className="rounded-md border-l-4 border-green-500 bg-green-100 p-4">
                <div className="flex items-center justify-between space-x-4">
                  <div>
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      {errorMessage}
                    </p>
                  </div>
                  <div>
                    <X className="h-6 w-6 cursor-pointer text-green-600" />
                  </div>
                </div>
              </div>
            )}
            <p className="mt-2 text-sm text-gray-600">
              <a
                href="#"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                कुपन प्राप्त गर्न आफ्नो विवरण र भुक्तानी क्रम प्रविष्ट
                गर्नुहोस्।
              </a>
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5 w-full">
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      className="flex h-10 w-full rounded-md border  text-gray-900 border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      className="flex h-10 w-full rounded-md border  text-gray-900 border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact"
                    className="text-base font-medium text-gray-900"
                  >
                    Contact Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="contact"
                      name="contact"
                      className="flex h-10 w-full rounded-md border  text-gray-900 border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Contact Number"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="text-base font-medium text-gray-900"
                  >
                    Location
                  </label>
                  <div className="mt-2">
                    <input
                      id="location"
                      name="location"
                      className="flex h-10 w-full rounded-md border  text-gray-900 border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Location"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="photo"
                    className="text-base font-medium text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center">
                    <input
                      id="photo"
                      name="photo"
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="photo"
                      className="cursor-pointer  text-gray-900 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                    >
                      Choose Photo
                    </label>
                    {/* Conditionally render image preview */}
                    {photo && (
                      <div className="ml-4 w-32 h-32">
                        <img
                          src={photo}
                          alt="User Preview"
                          className="w-full h-full rounded-md object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-3">
                <button
                  type="submit"
                  className="relative inline-flex w-full items-center justify-center rounded-md border  text-gray-900 border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                >
                  <span className="mr-2 inline-block"></span>
                  Pay with E-sewa
                </button>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Get Coupon
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-6 h-400 w-100 flex items-center justify-center">
          <img
            className="mx-auto h-900 w-100 rounded-md object-cover"
            src="/images/1.png"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default SignInOne;
