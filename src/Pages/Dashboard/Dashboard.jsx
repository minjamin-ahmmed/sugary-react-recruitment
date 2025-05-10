import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import encodeFilter from "../../utils/encodeFilter";
import axios from "axios";
import { CheckCircle, LogOut } from "lucide-react";
import SkeletonLoader from "../../Components/SkeletonLoader";
import { useNavigate } from "react-router-dom";
import LazyMaterialCard from "./LazyMaterialCard";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const imageBaseUrl = "https://d1wh1xji6f82aw.cloudfront.net";
  const imagePath = "Materials/Product/E-b0_8NgqEGNvrElcXeqCg.png";
  const navigate = useNavigate();

  // Fetching the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filter = encodeFilter(0, 20, [1]);

        const response = await axios.get(
          `https://sugarytestapi.azurewebsites.net/Materials/GetAll/?filter=${filter}`
        );
        setData(response.data);
      } catch (error) {
        toast.error("Failed to fetch data", {
          position: "top-center",
          autoClose: 3000,
        });
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

    toast.success("Successfully Logged out", {
      position: "top-center",
      icon: <CheckCircle className="text-green-600" />,
      style: {
        borderRadius: "12px",
        background: "#1a1a1a",
        color: "#fff",
        fontSize: "16px",
        padding: "14px 20px",
      },
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    navigate("/");
  };

  if (!data) {
    return (
      <div className="w-11/12 lg:w-9/12 mx-auto rounded-xl py-4 lg:py-6 px-4 lg:px-12 mt-8 border border-zinc-200">
        <div className="flex-1 p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-3xl font-semibold">
              <SkeletonLoader type="text" />
            </h2>
            <SkeletonLoader type="button" />
          </div>

          <SkeletonLoader type="grid" />

          <div className="mt-6">
            <h3 className="text-2xl font-semibold">
              <SkeletonLoader type="text" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <SkeletonLoader type="card" />
              <SkeletonLoader type="card" />
              <SkeletonLoader type="card" />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold">
              <SkeletonLoader type="text" />
            </h3>
            <SkeletonLoader type="tags" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 lg:w-8/12 mx-auto rounded-xl py-4 lg:py-6 px-4 mt-8 border border-zinc-200">
      <div className="flex-1 p-6">
        <div className="flex  gap-4 items-center justify-between mb-6">
          <h2 className="text-xl lg:text-3xl font-semibold ">
            Dashboard{" "}
            <span className="text-transparent bg-clip-text bg-shine-gradient bg-500-auto animate-text-shine">
              Overview
            </span>
          </h2>
          <button
            onClick={handleLogout}
            className="bg-zinc-950 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-zinc-800 transition-all duration-200 ease-in-out transform hover:scale-95 active:scale-90 cursor-pointer"
          >
            <span className="">Logout</span>
            <LogOut size={20} className="text-white" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-zinc-200 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl">Total Materials</h3>
            <p className="text-3xl text-zinc-800">
              <span className="text-zinc-950">{data.TotalCount}</span>
            </p>
          </div>
          <div className="bg-white border border-zinc-200 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl">Remaining Materials</h3>
            <p className="text-3xl text-zinc-800">
              <span className="text-zinc-950">{data.RemainingCount}</span>
            </p>
          </div>
          <div className="bg-white border border-zinc-200 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl">Tags</h3>

            <p className="text-3xl text-zinc-800">
              <span className="text-zinc-950">{data.Tags?.length || 0}</span>
            </p>
          </div>
        </div>

        {/* Materials List */}
        <div className="mt-6">
          <div>
            <h3 className="text-2xl font-semibold">Materials</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {data.Materials.map((material) => (
              <LazyMaterialCard
                key={material.Id}
                material={material}
                imageBaseUrl={imageBaseUrl}
                imagePath={imagePath}
              />
            ))}
          </div>
        </div>

        {/* Tags List */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Tags</h3>
          <div className="mt-4">
            {data.Tags?.map((tag) => (
              <span
                key={tag.Id}
                className="inline-block bg-zinc-200 text-zinc-950 px-4 py-2 rounded-full mr-2 mb-2"
              >
                {tag.Title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
