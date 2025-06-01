import React from "react";
import { useState } from "react";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productNameLocal: "",
    slug: "",
    description: "",
    descriptionLocal: "",
    category: "",
    subCategory: "",
    brand: "",
    amnufacturere: "",
    modelNumber: "",
    sku: "",
    barcode: "",
    regularPrice: "",
    sellingPrice: "",
    discountPercentage: "",
    discountType: "",
    dealStartDate: "",
    dealEndDate: "",
    stock: "",
    inStock: true,
    minOrderQty: "",
    maxOrderQty: "",
    // variants: "",
    specification: "",
    shippingInfo: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    isFeatured: false,
    isTrending: false,
    isNewArrival: false,
    isPublished: true,
    seller: "",
    addedBy: "",
    returnable: false,
    returnDays: "",
    warrantyType: "",
    warrantyDuration: "",
    customFields: "",
  });

  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
    if (e.target.name === "images") {
      setImages(Array.from(e.target.files));
    } else if (e.target.name === "thumbnail") {
      setThumbnail(e.target.files[0]);
    }
  };

  // console.log(images);

  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value, type, checked } = e.target;
    // name = productName = [productName]: value
    // console.log(name, type);
    setFormData((prev) => {
      //   console.log(`${name}: ${type} : ${value}`);
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((it, i) => i !== index));
  };

  const handleRemoveThumbanil = () => {
    setThumbnail(null);
  };

  // State for Variants
  const [variantName, setVariantName] = useState("");
  const [optionInput, setOptionInput] = useState("");
  const [optionList, setOptionList] = useState([]);
  const [variantsList, setVariantsList] = useState([]);

  /// Handlers for Variants
  const handleAddOption = () => {
    console.log("handle Add option is working");
    if (optionInput.trim()) {
      setOptionList([...optionList, optionInput.trim()]);
      setOptionInput("");
    }
  };
  console.log(optionList, "option List");

  const handleRemoveOption = (index) => {
    setOptionList(optionList.filter((_, i) => i !== index));
  };

  const handleAddVariant = () => {
    // console.log("hello")
    if (variantName.trim() && optionList.length > 0) {
      setVariantsList([
        ...variantsList,
        { name: variantName.trim(), options: optionList },
      ]);
      setVariantName("");
      setOptionList([]);
    }
  };

  const handleRemoveVariant = (index) => {
    setVariantsList(variantsList.filter((_, i) => i !== index));
  };
  console.log(JSON.stringify(variantsList));

  const handleSubmit = (e) => {
    // console.log("The form has been submitted");
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        // console.log(key, value);
        data.append(key, value);
      });
      console.log(JSON.stringify(variantsList));
      data.append("variants", JSON.stringify(variantsList));
      images.forEach((img) => data.append("images", img));
      //   console.log(Object.entries(formData).forEach);

      //   data.append("productName", productName);
      //   data.append("productNameLocal", productNameLocal);

      fetch("http://localhost:5000/api/products/", {
        method: "POST",
        body: data,
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  // NOt Usable
  // const [variantsList, setVariantsList] = useState([]);
  // const [variantInput, setVariantInput] = useState("");
  // const handleAddVariant = () => {
  //   if (variantInput.trim()) {
  //     setVariantsList([...variantsList, variantInput.trim()]);
  //     setVariantInput("");
  //   }
  // };

  // const handleRemoveVariant = (index) => {
  //   setVariantsList((prev) => prev.filter((it, i) => i !== index));
  // };
  // console.log(JSON.stringify(variantsList));

  return (
    <div className="container mx-auto">
      <h1 className="text-center font-bold text-6xl py-5">
        Create a New Product
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2"
            name="productName"
            placeholder="Product Name"
            type="text"
            onChange={handleChange}
            value={formData?.productName}
          />
          <input
            className="border p-2"
            name="productNameLocal"
            type="text"
            placeholder="Product Name Local"
            onChange={handleChange}
            value={formData?.productNameLocal}
          />
          <input
            className="border p-2"
            name="slug"
            type="text"
            placeholder="slug"
            onChange={handleChange}
            value={formData?.slug}
          />
          <input
            className="border p-2"
            name="category"
            type="text"
            placeholder="category"
            onChange={handleChange}
            value={formData?.category}
          />
          <input
            className="border p-2"
            name="brand"
            type="text"
            placeholder="brand"
            onChange={handleChange}
            value={formData?.brand}
          />
          <input
            className="border p-2"
            name="sku"
            type="text"
            placeholder="sku"
            onChange={handleChange}
            value={formData?.sku}
          />
          <input
            className="border p-2"
            name="regularPrice"
            type="number"
            placeholder="regularPrice"
            onChange={handleChange}
            value={formData?.regularPrice}
          />
          <input
            className="border p-2"
            name="sellingPrice"
            type="number"
            placeholder="sellingPrice"
            onChange={handleChange}
            value={formData?.sellingPrice}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <label>
            <input
              className="border p-2"
              name="isFeatured"
              placeholder="isFeatured"
              type="checkbox"
              onChange={handleChange}
              checked={formData?.isFeatured}
            />
            isFeatured
          </label>
          <label>
            <input
              className="border p-2"
              name="isTrending"
              placeholder="isTrending"
              type="checkbox"
              onChange={handleChange}
              checked={formData?.isTrending}
            />
            isTrending
          </label>
          <label>
            <input
              className="border p-2"
              name="isNewArrival"
              placeholder="isNewArrival"
              type="checkbox"
              onChange={handleChange}
              checked={formData?.isNewArrival}
            />
            isNewArrival
          </label>
          <label>
            <input
              className="border p-2"
              name="isPublished"
              placeholder="isPublished"
              type="checkbox"
              onChange={handleChange}
              checked={formData?.isPublished}
            />
            isPublished
          </label>
        </div>
        <div>
          <label>Variants</label>
          {/* Input Variant Name */}
          <input
            type="text"
            placeholder="Variant Name (e.g., Size)"
            value={variantName}
            onChange={(e) => setVariantName(e.target.value)}
            className="input w-full mt-2 border"
          />
          {/* Input Options */}
          <div>
            <input
              type="text"
              placeholder="Add Option (e.g. Small)"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
              className="border"
            />
            <button type="button" onClick={handleAddOption}>
              Add Option
            </button>
          </div>
          {/* Show Current Options */}
          <div>
            {optionList.length > 0 &&
              optionList.map((opt, idx) => {
                return (
                  <span key={idx}>
                    {opt}
                    <button onClick={() => handleRemoveOption(idx)}>X</button>
                  </span>
                );
              })}
          </div>

          {/* Add Variant Button */}
          <button type="button" onClick={handleAddVariant}>
            Add Variant
          </button>
          {/* Dispaly all variants */}
          <div>
            {variantsList.length > 0 &&
              variantsList.map((variant, vIdx) => (
                <div key={vIdx}>
                  <div>
                    <p>{variant.name}</p>
                    <button onClick={() => handleRemoveVariant(vIdx)}>
                      Remove Variant
                    </button>
                  </div>
                  <div>
                    {variant?.options?.map((opt, oIdx) => (
                      <span key={oIdx}>{opt}</span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* <div>
          <label>Variants</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={variantInput}
              onChange={(e) => setVariantInput(e.target.value)}
              className="input flex-1 border p-2"
              placeholder="Add a Variant"
            />
            <button type="button" onClick={handleAddVariant}>
              Add Variant
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {variantsList.map((item, idx) => {
              return (
                <span
                  key={idx}
                  className="bg-gray-200 px-2 py1 rounded text-sm flex items-centr gap-3"
                >
                  {item}
                  <button onClick={() => handleRemoveVariant(idx)}>
                    Remove This Variant
                  </button>
                </span>
              );
            })}
          </div>
        </div> */}
        <div className=" flex flex-col space-y-2 my-5 ">
          <div className="relative">
            <label
              htmlFor="images"
              className="text-sm font-medium px-5 py-2 bg-blue-500   text-white cursor-pointer"
            >
              Upload Images
            </label>
            <input
              type="file"
              name="images"
              multiple
              id="images"
              className="opacity-0 absolute top-0"
              onChange={handleFileChange}
            />
          </div>
          <div className=" grid grid-cols-2 gap-4 mt-3">
            {images.map((file, idx) => {
              const src = URL.createObjectURL(file);
              return (
                <div key={idx} className=" relative border p-2 rounded shadow">
                  <img
                    src={src}
                    alt={`upload-${idx}`}
                    className="h-40 w-full object-contain"
                  />
                  <p className="text-xs mt-1 break-words">{file.name}</p>
                  <button type="button" onClick={() => handleRemoveImage(idx)}>
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" flex flex-col space-y-2 my-5 ">
          <div className="relative">
            <label
              htmlFor="thumbnail"
              className="text-sm font-medium px-5 py-2 bg-blue-500   text-white cursor-pointer"
            >
              Upload Thumbnail
            </label>
            <input
              type="file"
              name="thumbnail"
              multiple
              id="thumbnail"
              className="opacity-0 absolute top-0"
              onChange={handleFileChange}
            />
          </div>
          <div className=" grid grid-cols-2 gap-4 mt-3">
            {thumbnail && (
              <div className=" relative border p-2 rounded shadow">
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt={`Thumbnal Preview`}
                  className="h-40 w-full object-contain"
                />
                <p className="text-xs mt-1 break-words">{thumbnail.name}</p>
                <button type="button" onClick={handleRemoveThumbanil}>
                  X
                </button>
              </div>
            )}
          </div>
        </div>
        <button className="py-2 px-5 border cursor-pointer">
          {loading ? "Submitting....." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

//   const [productName, setProductName] = useState("");
//   const [productNameLocal, setProductNameLocal] = useState("");
//   const handleChangeProductNameLocal = (e) => {
//     // console.log(e.target.value);
//     setProductNameLocal(e.target.value);
//   };
//   console.log(productName);

// Create Product Full Function
// -> Live VErcel
// Live Admin Panel
