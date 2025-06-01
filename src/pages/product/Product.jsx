import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchProducts = () => {
    fetch(`http://localhost:5000/api/products/?productName=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [searchText]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  console.log(searchText, "Search Text");

  // console.log(products);

  const handleDelete = async (id) => {
    const isConfirm = confirm(
      `are you sure you want to delete this product ${id}`
    );
    // console.log(isConfirm);
    if (isConfirm) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`,
          { method: "DELETE" }
        );

        const data = await response.json();
        fetchProducts();
        alert(data.message);
      } catch (e) {
        alert(e);
      }
    }
  };

  return (
    <div>
      <h3 className="text-4xl font-bold text-center py-5">
        This is Product Page
      </h3>
      <div className="container mx-auto">
        <Link to={"/product/create"}>
          <button className="px-5 py-2 border bg-blue-600 text-amber-50 cursor-pointer hover:bg-blue-400">
            Create Product
          </button>
        </Link>

        <h3 className="text-4xl font-bold text-center">
          All Products {products && products.length}{" "}
        </h3>
        <div className="flex flex-col">
          <label>Search By Product Name</label>
          <input
            className="border p-3"
            placeholder="Search By Product Name"
            type="text"
            onChange={handleSearch}
          />
        </div>
        <div className="grid grid-cols-3 gap-5 my-10">
          {products &&
            products.length > 0 &&
            products.map((it) => {
              return (
                <div className="border p-5 shadow-sm rounded">
                  <h1 className="font-bold">{it.productName}</h1>
                  <p>{it.description}</p>
                  <button
                    className="w-full text-white py-2 cursor-pointer bg-red-500"
                    onClick={() => handleDelete(it._id)}
                  >
                    Delete This Product
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Product;
