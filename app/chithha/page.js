"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";


function RandomUser() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [countdown, setCountdown] = useState(10); // Countdown timer in seconds
  const [countingDown, setCountingDown] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "chitthaForms");
        const querySnapshot = await getDocs(usersCollection);
        const userList = [];
        querySnapshot.forEach((doc) => {
          userList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectRandomUser = () => {
    if (!countingDown) {
      setCountingDown(true);
      startCountdown();
    }
  };

  const startCountdown = () => {
    let count = 0;
    let interval = setInterval(() => {
      count++;
      if (count === 10) {
        clearInterval(interval);
        const randomIndex = Math.floor(Math.random() * users.length);
        setSelectedUser(users[randomIndex]);
        setCountingDown(false);
      }
    }, 1000);
  };

  return (
    <div className="bg-white py-8 px-4 flex justify-center items-center h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Chithha Winner
        </h2>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleSelectRandomUser}
            className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
            disabled={countingDown}
          >
            {countingDown ? "Shuffling..." : "Select Winner"}
          </button>
          {selectedUser && (
            <span className="text-gray-600">
              Selected Coupon Code:{" "}
              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                {selectedUser.uniqueCode}
              </span>
            </span>
          )}
        </div>

        {selectedUser && (
          <div className="mx-auto max-w-xl rounded-md bg-black p-1">
            <div className="flex flex-col rounded-md bg-white">
              <div className="flex flex-1 flex-col justify-between p-8">
                <div className="mb-4 flex space-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6 text-yellow-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  ))}
                </div>
                <div className="flex-1 pt-2">
                  <blockquote>
                    <p className="text-lg text-gray-800">
                      “Congratulations on your lottery win! May this incredible
                      stroke of luck bring you endless joy and wonderful
                      opportunities ahead!”
                    </p>
                  </blockquote>
                </div>

                <div className="mt-8 border-t border-gray-300 pt-4 dark:border-gray-800">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                      src={selectedUser.imageURL}
                      alt=""
                    />
                    <div className="ml-3 min-w-0">
                      <p className="truncate text-base font-semibold text-gray-800">
                        {selectedUser.name}
                      </p>{" "}
                      <p className="truncate text-base font-semibold text-gray-800">
                        from {selectedUser.location}
                      </p>
                      <p className="truncate text-base text-gray-500">
                        {selectedUser.contact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RandomUser;
