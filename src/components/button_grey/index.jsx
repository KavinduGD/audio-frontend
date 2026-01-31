import React from "react";

function ButtonGrey({
  topic,
  px = "px-[25px]",
  py = "py-[5px]",
  button_fun,
  disabled = false,
}) {
  return (
    <button
      onClick={button_fun}
      className={`${px}  ${py}  bg-white dark:bg-[#2A2E33] text-[#545b64] font-bold rounded-[2px] border-[#545b64] border-[1px]  dark:text-[#D5DBDB]
        dark:border-[#879596]    disabled:opacity-50 disabled:cursor-not-allowed ${
          disabled
            ? ""
            : "dark:hover:text-[#e6fafa] dark:hover:border-[#aab7b8] hover:text-[#16191f] hover:border-[#16191f]"
        }`}
      disabled={disabled}
    >
      {topic}
    </button>
  );
}

export default ButtonGrey;

// {disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#16191f] hover:border-[#16191f]'} `}
// ${
//   disabled ? "opacity-50 cursor-not-allowed" : ""
// }
