import React from 'react';

const UserCard = ({user}) => {
    // console.log(user);
    const {firstName, lastName, photoUrl, age, gender, about, skills} = user;
  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-gradient-to-br from-[#1f2937] to-[#111827] text-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-105 transition duration-300">
      <figure className="relative h-60 overflow-hidden">
  <img
    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    src={photoUrl}
    alt="User Banner"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
</figure>
        <div className="card-body text-center">
        <h2 className="text-xl font-bold capitalize">
            {firstName + " " + lastName}
          </h2>
          {age && gender && (
            <p className="text-sm text-gray-400">{age} years old, {gender}</p>
          )}
          <p className="mt-2 text-sm text-gray-300 px-4">{about || "No description available."}
          </p>
          <div className="card-actions justify-center mt-4">
          <button className="btn bg-gradient-to-r from-purple-600 to-blue-500 hover:brightness-110 text-white font-medium px-4 py-2 rounded-md">
              Ignore
            </button>
            <button className="btn bg-gradient-to-r from-pink-500 to-red-500 hover:brightness-110 text-white font-medium px-4 py-2 rounded-md">
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
