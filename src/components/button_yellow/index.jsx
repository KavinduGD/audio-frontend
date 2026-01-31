import React from "react";

function ButtonYellow({
  topic,
  px = "px-[25px]",
  py = "py-[5px]",
  button_fun,
  disabled = false,
}) {
  return (
    <button
      onClick={button_fun}
      className={`${px}  ${py}  bg-[#FF9900] hover:bg-[#ec7211] text-[#161916] font-bold rounded-[2px]   
             disabled:opacity-60 disabled:cursor-not-allowed ${
               disabled
                 ? ""
                 : "dark:hover:text-[#16191f]  hover:text-[#16191f] "
             }`}
      disabled={disabled}
    >
      {topic}
    </button>
  );
}

export default ButtonYellow;
