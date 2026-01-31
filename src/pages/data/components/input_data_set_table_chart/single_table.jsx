import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";

function SingleTable({ data, setIsCheckedList }) {
  const { isDarkMode } = useDarkModeContext();
  return (
    <Paper
      elevation={0}
      style={{
        margin: "0px",
        flex: 1,
        backgroundColor: isDarkMode ? "#2A2E33" : "#fff",
      }}
    >
      <TableContainer>
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
          }}
        >
          <TableHead
            style={{
              backgroundColor: isDarkMode ? "#21252C" : "#FAFAFA",
            }}
          >
            <TableRow
              style={{ display: "flex" }}
              sx={{
                borderBottom:
                  "1px solid" + (isDarkMode ? "#4b4949" : "#E0E0E0"),
              }}
            >
              <TableCell style={{ flex: 3 }}>
                <span className="text-light_grey dark:text-dark_grey font-semibold font-amazon_ember">
                  Class name
                </span>
              </TableCell>
              <TableCell style={{ flex: 2 }}>
                <span className="text-light_grey  dark:text-dark_grey font-semibold font-amazon_ember">
                  Sample Count
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                style={{
                  display: "flex",
                }}
                sx={{
                  borderBottom:
                    "1px solid" + (isDarkMode ? "#4b4949" : "#E0E0E0"),
                }}
              >
                <TableCell style={{ flex: 3 }}>
                  <div className="flex items-center  gap-[20px] ">
                    <Checkbox
                      onChange={(e) => {
                        setIsCheckedList((prev) => {
                          if (e.target.checked) {
                            return [...prev, row.name];
                          } else {
                            return prev.filter((item) => item !== row.name);
                          }
                        });
                      }}
                      color="primary"
                      sx={{
                        padding: 0,
                        marginRight: 1,
                        color: "#545b64",

                        "&.Mui-checked": {
                          color: "#00A1C9",
                        },
                        width: "20px",
                      }}
                      style={{
                        transform: "scale(0.8)",
                      }}
                    />
                    <span className="text-text_blue font-bold text-[14px] font-amazon_ember">
                      {row.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ flex: 2 }}>
                  <span className="text-light-black  dark:text-dark_grey font-amazon_ember">
                    {row.count}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default SingleTable;
