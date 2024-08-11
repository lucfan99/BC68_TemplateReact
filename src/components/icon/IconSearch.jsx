import React from "react";

const IconSearch = ({ size = 50, color = "cyan" }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
      >
        <path
          fill={color}
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2"
          d="m21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0Z"
        />
      </svg>
    </div>
  );
};

export default IconSearch;
