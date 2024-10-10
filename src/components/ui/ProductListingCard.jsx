/* eslint-disable react/prop-types */
function ProductListingCard({ product }) {
  const soldOut = Math.random() < 0.3;

  return (
    <main className="p-4 border-borderColor border rounded-[8px] flex relative flex-col h-full">
      <div className="flex justify-center items-center mb-2">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
      </div>

      <div className="space-y-4 flex-grow">
        <div className="space-y-1">
          <h6>{product.title}</h6>
          <div className="flex space-x-2">
            <div className="bg-blue-500 w-4 h-4 rounded-full"></div>
            <div className="bg-blue-500 w-4 h-4 rounded-full"></div>
            <div className="bg-blue-500 w-4 h-4 rounded-full"></div>
          </div>
          <h2 className="font-semibold">${product.price}</h2>
        </div>
      </div>

      {/* Add to Cart section is moved to the bottom */}
      <div className="flex items-center justify-between space-x-2 mt-4">
        <div className="grid grid-cols-3 items-center flex-1 justify-between border-borderColor border rounded-md">
          <button className="py-2 text-center">-</button>
          <div className="text-center">1</div>
          <button className="py-2 text-center">+</button>
        </div>
        <button className="py-2 text-black text-my14 font-semibold flex-1 flex items-center justify-center rounded-md border-black border">
          Add to cart
        </button>
      </div>

      {/* Show Sold Out label conditionally */}
      {soldOut && (
        <small className="absolute top-4 right-4 rounded-md px-4 py-1 bg-primaryColor text-[12px]">
          Sold Out
        </small>
      )}
    </main>
  );
}

export default ProductListingCard;
