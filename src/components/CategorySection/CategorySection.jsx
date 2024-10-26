/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import SpecialButton from "../SpecialButton/SpecialButton";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../Shared/SectionHeading/SectionHeading";

const CategorySection = () => {
  const navigate = useNavigate();
  const {
    isPending,
    error,
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("http://localhost:5000/categories").then((res) => res.json()),
  });

  // Sample categories data

  return (
    <div>
      <SectionHeading
        title="Books Category"
        subTitle="View Your Choice List"
      ></SectionHeading>
      <div className="flex flex-wrap justify-center gap-6 py-4">
        {data.map((category) => (
          <div
            key={category.id}
            className="card w-60 bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold">
                {category.category}
              </h2>

              <div className="card-actions justify-end">
                <Link to={`/products/${category.category}`}>
                  <SpecialButton name="View Products"></SpecialButton>
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center items-center">
          <Link to="/products">
            <SpecialButton name="View All Products" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
