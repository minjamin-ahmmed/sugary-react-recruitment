// src/components/SkeletonLoader.js

import React from "react";

const SkeletonLoader = ({ type }) => {
  switch (type) {
    case "text":
      return (
        <div className="bg-gray-200 w-40 h-6 rounded-md animate-pulse"></div>
      );
    case "button":
      return (
        <div className="bg-gray-200 w-24 h-10 rounded-md animate-pulse"></div>
      );
    case "card":
      return (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="bg-gray-200 w-full h-48 rounded-md animate-pulse"></div>
          <h4 className="bg-gray-200 w-40 h-6 rounded-md mt-4 animate-pulse"></h4>
          <p className="bg-gray-200 w-32 h-6 rounded-md mt-2 animate-pulse"></p>
          <p className="bg-gray-200 w-24 h-6 rounded-md mt-2 animate-pulse"></p>
        </div>
      );
    case "tags":
      return (
        <div className="mt-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 w-28 h-8 rounded-full inline-block mr-2 mb-2 animate-pulse"
            ></div>
          ))}
        </div>
      );
    case "grid":
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="bg-gray-200 w-full h-48 rounded-md animate-pulse"></div>
              <div className="bg-gray-200 w-32 h-6 rounded-md mt-4 animate-pulse"></div>
              <div className="bg-gray-200 w-24 h-6 rounded-md mt-2 animate-pulse"></div>
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div className="bg-gray-200 w-full h-6 rounded-md animate-pulse"></div>
      );
  }
};

export default SkeletonLoader;
