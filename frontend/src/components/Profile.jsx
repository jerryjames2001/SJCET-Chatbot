import React from 'react';

const Profile = ({ fullname, email }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-6 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Full Name</label>
            <input
              type="text"
              value={fullname}
              readOnly
              className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          {/* <p className="text-sm text-gray-400">More profile fields can go here later…</p> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
