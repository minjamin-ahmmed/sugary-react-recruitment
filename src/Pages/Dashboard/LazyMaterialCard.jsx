import React, { useEffect, useRef, useState } from "react";

const LazyMaterialCard = ({ material, imageBaseUrl }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-zinc-100 p-4 rounded-lg shadow-md min-h-[200px]"
    >
      {visible ? (
        <div className="group relative bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="relative overflow-hidden rounded-xl">
            <img
              loading="lazy"
              src={`${imageBaseUrl}/${material?.CoverPhoto}`}
              alt={material?.Title}
              className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 left-2 bg-zinc-950/70 text-white text-xs px-2 py-1 rounded">
              {material?.BrandName}
            </span>
          </div>

          <div className="mt-4 space-y-1">
            <h4 className="text-xl font-bold text-gray-800">
              {material?.Title}
            </h4>
            <p className="text-sm text-zinc-500">
              {material?.SubTitle || material?.VariantTitle}
            </p>

            <div className="mt-2">
              <p className="text-lg font-semibold text-indigo-600">
                ${material?.SalesPrice.toFixed(2)}
                <span className="ml-2 text-sm text-zinc-400">
                  (${material?.SalesPriceInUsd?.toFixed(2)} USD)
                </span>
              </p>
              {material?.DripPrice > material?.SalesPrice && (
                <p className="text-sm text-red-400 line-through">
                  ${material?.DripPrice.toFixed(2)} (Before)
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
      )}
    </div>
  );
};

export default LazyMaterialCard;
