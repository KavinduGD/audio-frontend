// // import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
// import { styled } from "@mui/system";
// import { TextareaAutosize as BaseTextareaAutosize } from "@mui/material";
// import { useDarkModeContext } from "../../hooks/use_dark_mode_context";

// function TextArea({ placeholder, name, top, bottom, input_fun, value }) {
//   const { isDarkMode } = useDarkModeContext();
//   const Textarea = styled(BaseTextareaAutosize)(
//     ({ theme }) => `

//         width: 100%;
//         font-family: "Amazon Ember";
//         font-size: 14px;
//         line-height: 1.2;
//         padding: 8px 12px;
//         border-radius: 2px;
//         color: ${isDarkMode ? "#879596" : "#1A2029"};
//         background: ${isDarkMode ? "#1A2029" : "#fff"};
//         border: ${isDarkMode ? "1px solid #4b4949" : "1px solid #879596"};
//         min-height: 100px;

//         &:focus {
//         border: ${isDarkMode ? "1px" : "2px"} solid #00a1c9
//         };

//         &:focus-visible {
//         outline: 0;
//         };
//         `
//   );
//   return (
//     <div className="flex flex-col w-full gap-[5px]">
//       <div className="flex flex-col">
//         <p className="text-[15px] text-[#2d323f] dark:text-dark_white leading-4">
//           {name}
//         </p>
//         {top && (
//           <p className="text-[12px] text-[#687078] dark:text-dark_grey">
//             {top}
//           </p>
//         )}
//       </div>
//       <div className="relative">
//         <Textarea placeholder={placeholder} />

//         {bottom && (
//           <p className="text-[11px] text-[#687078] dark:text-dark_grey leading-3 absolute top-[116px]">
//             {bottom}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TextArea;

import { styled } from "@mui/material/styles";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/material";
import { useDarkModeContext } from "../../hooks/use_dark_mode_context";

const StyledTextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme, isDarkMode }) => ({
    width: "100%",
    fontFamily: "Amazon Ember",
    fontSize: "14px",
    lineHeight: 1.2,
    padding: "8px 12px",
    borderRadius: "2px",
    color: isDarkMode ? "#879596" : "#1A2029",
    background: isDarkMode ? "#1A2029" : "#fff",
    border: isDarkMode ? "1px solid #4b4949" : "1px solid #879596",
    minHeight: "100px",
    "&:focus": {
      border: isDarkMode ? "1px solid #4b4949" : "2px solid #00a1c9",
    },
    "&:focus-visible": {
      outline: 0,
    },
  })
);

function TextArea({ placeholder, name, top, bottom, input_fun, value }) {
  const { isDarkMode } = useDarkModeContext();

  return (
    <div className="flex flex-col w-full gap-[5px]">
      <div className="flex flex-col">
        <p className="text-[15px] text-[#2d323f] dark:text-dark_white leading-4">
          {name}
        </p>
        {top && (
          <p className="text-[12px] text-[#687078] dark:text-dark_grey">
            {top}
          </p>
        )}
      </div>
      <div className="relative">
        <StyledTextareaAutosize
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            input_fun(e.target.value);
          }}
          isDarkMode={isDarkMode}
        />

        {bottom && (
          <p className="text-[11px] text-[#687078] dark:text-dark_grey leading-3 absolute bottom-[-10px]">
            {bottom}
          </p>
        )}
      </div>
    </div>
  );
}

export default TextArea;
