import Topic1 from "../../components/topic1";
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
import { useDarkModeContext } from "../../hooks/use_dark_mode_context";
import { useJobsContext } from "../../hooks/use_jobs_data";
import Box from "../../components/box";
import { useEffect, useState } from "react";
import admin_axios from "../../base_url";
import ErrorToast from "../../components/toast/error_toast";
import SuccessToast from "../../components/toast/success_toast";
import { Link, useNavigate } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const header_cell_style =
  "text-light_grey dark:text-dark_grey font-semibold font-amazon_ember";
const row_cell_style =
  "text-light-black  dark:text-dark_grey font-amazon_ember";

function JobsTable() {
  const { jobs, dispatch } = useJobsContext();
  const { isDarkMode } = useDarkModeContext();

  const navigate = useNavigate();

  const [isCheckedList, setIsCheckedList] = useState([]);

  console.log(isCheckedList);

  const delete_jobs = async () => {
    try {
      const response = await admin_axios.delete(
        "api/preprocess/delete-whole-job",
        { data: { job_ids: isCheckedList } }
      );
      if (response.status == 200) {
        SuccessToast(isDarkMode, "Jobs deleted successfully");
        dispatch({ type: "DELETE_WHOLE_JOB", payload: isCheckedList });
        setIsCheckedList([]);
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };
  const handleRefresh = () => {
    localStorage.setItem("scrollPosition", window.scrollY);
    window.location.reload();
  };

  useEffect(() => {
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      localStorage.removeItem("scrollPosition");
    }
  }, []);

  return (
    <div>
      <Topic1
        topic="Job Management  home"
        topic_bottom="When you create a training job, Amazon SageMaker sets up the
    distributed compute cluster, performs the training, and deletes the
    cluster when training has completed. The resulting model artifacts are
    stored in the location you specified when you created the training job."
      />
      <div>
        <Box
          topic="Jobs table"
          button_1_topic="Create a Job"
          button_1_fun={() => {
            navigate("/create-jobs");
          }}
          button_1_color="yellow"
          button_2_topic="Delete job"
          button_2_fun={delete_jobs}
          button_2_disabled={isCheckedList.length == 0}
          optional_display={true}
          optional={() => (
            <div
              onClick={handleRefresh}
              className="flex items-center px-[10px] cursor-pointer bg-white dark:bg-[#2A2E33] text-[#545b64] font-bold rounded-[2px] border-[#545b64] border-[1px]  dark:text-[#D5DBDB]
            dark:border-[#879596]  dark:hover:text-[#e6fafa] dark:hover:border-[#aab7b8] hover:text-[#16191f] hover:border-[#16191f]"
            >
              <RefreshIcon
                sx={{
                  fontSize: "25px",
                }}
              />
            </div>
          )}
        >
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
                    <TableCell style={{ flex: 2 }}>
                      <span className={header_cell_style}>Job id</span>
                    </TableCell>
                    {/* <TableCell style={{ flex: 1.2 }}>
                      <span className={header_cell_style}>Job name</span>
                    </TableCell> */}
                    {/* <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>Job start date</span>
                    </TableCell> */}
                    <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>Job type</span>
                    </TableCell>
                    {/* <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>Job description</span>
                    </TableCell>
                    <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>
                        Preprocess start date
                      </span>
                    </TableCell> */}
                    {/* <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>
                        Class configuration
                      </span>
                    </TableCell> */}
                    <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>
                        Preprocess instance Type
                      </span>
                    </TableCell>
                    {/* <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>
                        Preprocess instance count
                      </span>
                    </TableCell> */}
                    <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>
                        Preprocess job Status
                      </span>
                    </TableCell>
                    <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>
                        Train instance Type
                      </span>
                    </TableCell>
                    {/* <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>
                        Train instance count
                      </span>
                    </TableCell> */}
                    <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>
                        Train job Status
                      </span>
                    </TableCell>
                    <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>
                        Deploy instance Type
                      </span>
                    </TableCell>
                    <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>
                        Deploy instance count
                      </span>
                    </TableCell>
                    <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>Endpoint Status</span>
                    </TableCell>
                    <TableCell style={{ flex: 1 }}>
                      <span className={header_cell_style}>Approved</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs.map((row, index) => (
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
                      <TableCell style={{ flex: 2 }}>
                        <div className="flex items-center  gap-[20px] ">
                          <Checkbox
                            onChange={(e) => {
                              setIsCheckedList((prev) => {
                                if (e.target.checked) {
                                  return [...prev, row.job_id];
                                } else {
                                  return prev.filter(
                                    (item) => item !== row.job_id
                                  );
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
                          <span className="text-text_blue font-bold text-[14px] font-amazon_ember hover:underline">
                            <Link to={`/create-jobs?job_id=${row.job_id}`}>
                              {row.job_id}
                            </Link>
                          </span>
                        </div>
                      </TableCell>
                      {/* <TableCell style={{ flex: 1.2 }}>
                        <span className={row_cell_style}>{row.job_name}</span>
                      </TableCell> */}
                      {/* <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>{row.job_date}</span>
                      </TableCell> */}
                      <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>{row.job_type}</span>
                      </TableCell>
                      {/* <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>
                          {row.job_description.substring(0, 30)}
                        </span>
                      </TableCell>
                      <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>
                          {row.preprocess_date ? row.preprocess_date : "-"}
                        </span>
                      </TableCell> */}
                      {/* <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>
                          {row.class_configs.length > 0 ? (
                            <div>
                              <p className="text-[15px] text-gray-700 font-medium underline dark:text-gray-100">
                                Main
                              </p>
                              {row.class_configs
                                .filter((config) => config.type === "main")
                                .map((config, index) => (
                                  <div key={index}>
                                    {config.class_name} - {config.class_count}
                                  </div>
                                ))}
                              <p className="text-[15px] text-gray-700 font-medium underline dark:text-gray-100 mt-[5px]">
                                Other
                              </p>
                              {row.class_configs
                                .filter((config) => config.type === "other")
                                .map((config, index) => (
                                  <div key={index}>
                                    {config.class_name} - {config.class_count}
                                  </div>
                                ))}
                            </div>
                          ) : (
                            "-"
                          )}
                        </span>
                      </TableCell> */}
                      <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>
                          {row.instance_type ? row.instance_type : "-"}
                        </span>
                      </TableCell>
                      {/* <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>
                          {row.instance_count ? row.instance_count : "-"}
                        </span>
                      </TableCell> */}
                      <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>
                          {row.preprocessing_job_status == "Unknown" ? (
                            "-"
                          ) : (
                            <>
                              {row.preprocessing_job_status == "Completed" && (
                                <p className="flex items-center gap-[3px]">
                                  <CheckCircleOutlineIcon
                                    sx={{
                                      fontSize: "20px",
                                      color: "#1d8102",
                                      stroke: "#1d8102",
                                      strokeWidth: "0.3px",
                                    }}
                                  />
                                  <span className="text-success_green">
                                    Completed
                                  </span>
                                </p>
                              )}
                              {row.preprocessing_job_status == "InProgress" && (
                                <p className="flex items-center gap-[3px]">
                                  <AccessTimeIcon
                                    sx={{
                                      fontSize: "20px",
                                      color: "#6b7280",
                                      stroke: "#6b7280",
                                      strokeWidth: "0.3px",
                                    }}
                                  />
                                  <span className="text-gray-500">
                                    Inprogress
                                  </span>
                                </p>
                              )}
                              {row.preprocessing_job_status == "Failed" && (
                                <p className="flex items-center gap-[3px]">
                                  <ErrorOutlineIcon
                                    sx={{
                                      fontSize: "20px",
                                      color: "#d13212",
                                      stroke: "#d13212",
                                      strokeWidth: "0.3px",
                                    }}
                                  />
                                  <span className="text-error_red">Failed</span>
                                </p>
                              )}
                            </>
                          )}
                        </span>
                      </TableCell>
                      <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>
                          {row.train_instance_type
                            ? row.train_instance_type
                            : "-"}
                        </span>
                      </TableCell>
                      {/* <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>
                          {row.train_instance_count
                            ? row.train_instance_count
                            : "-"}
                        </span>
                      </TableCell> */}
                      <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>
                          {row.training_job_status == "Unknown" ? (
                            "-"
                          ) : (
                            <>
                              {row.training_job_status == "Completed" && (
                                <p className="flex items-center gap-[3px]">
                                  <CheckCircleOutlineIcon
                                    sx={{
                                      fontSize: "20px",
                                      color: "#1d8102",
                                      stroke: "#1d8102",
                                      strokeWidth: "0.3px",
                                    }}
                                  />
                                  <span className="text-success_green">
                                    Completed
                                  </span>
                                </p>
                              )}
                              {row.training_job_status == "InProgress" && (
                                <p className="flex items-center gap-[3px]">
                                  <AccessTimeIcon
                                    sx={{
                                      fontSize: "20px",
                                      color: "#6b7280",
                                      stroke: "#6b7280",
                                      strokeWidth: "0.3px",
                                    }}
                                  />
                                  <span className="text-gray-500">
                                    Inprogress
                                  </span>
                                </p>
                              )}
                              {row.training_job_status == "Failed" && (
                                <p className="flex items-center gap-[3px]">
                                  <ErrorOutlineIcon
                                    sx={{
                                      fontSize: "20px",
                                      color: "#d13212",
                                      stroke: "#d13212",
                                      strokeWidth: "0.3px",
                                    }}
                                  />
                                  <span className="text-error_red">Failed</span>
                                </p>
                              )}
                            </>
                          )}
                        </span>
                      </TableCell>
                      <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>
                          {row.deploy_instance_type
                            ? row.deploy_instance_type
                            : "-"}
                        </span>
                      </TableCell>
                      <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>
                          {row.deploy_instance_count
                            ? row.deploy_instance_count
                            : "-"}
                        </span>
                      </TableCell>
                      <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>
                          {row.endpoint_status == "Unknown" ? (
                            "-"
                          ) : (
                            <>
                              {row.endpoint_status == "InService" && (
                                <p className="flex items-center gap-[3px]">
                                  <CheckCircleOutlineIcon
                                    sx={{
                                      fontSize: "20px",
                                      color: "#1d8102",
                                      stroke: "#1d8102",
                                      strokeWidth: "0.3px",
                                    }}
                                  />
                                  <span className="text-success_green">
                                    Inservice
                                  </span>
                                </p>
                              )}
                              {row.endpoint_status == "Creating" && (
                                <p className="flex items-center gap-[3px]">
                                  <AccessTimeIcon
                                    sx={{
                                      fontSize: "20px",
                                      color: "#6b7280",
                                      stroke: "#6b7280",
                                      strokeWidth: "0.3px",
                                    }}
                                  />
                                  <span className="text-gray-500">
                                    Creating
                                  </span>
                                </p>
                              )}
                              {row.endpoint_status == "Updating" && (
                                <p className="flex items-center gap-[3px]">
                                  <AccessTimeIcon
                                    sx={{
                                      fontSize: "20px",
                                      color: "#6b7280",
                                      stroke: "#6b7280",
                                      strokeWidth: "0.3px",
                                    }}
                                  />
                                  <span className="text-gray-500">
                                    Updating
                                  </span>
                                </p>
                              )}
                              {row.endpoint_status == "Failed" && (
                                <p className="flex items-center gap-[3px]">
                                  <ErrorOutlineIcon
                                    sx={{
                                      fontSize: "20px",
                                      color: "#d13212",
                                      stroke: "#d13212",
                                      strokeWidth: "0.3px",
                                    }}
                                  />
                                  <span className="text-error_red">Failed</span>
                                </p>
                              )}
                            </>
                          )}
                        </span>
                      </TableCell>

                      <TableCell style={{ flex: 1 }}>
                        <span className={row_cell_style}>
                          {!row.approved ? (
                            "-"
                          ) : (
                            <>
                              <p className="flex items-center gap-[3px]">
                                <CheckCircleOutlineIcon
                                  sx={{
                                    fontSize: "20px",
                                    color: "#1d8102",
                                    stroke: "#1d8102",
                                    strokeWidth: "0.3px",
                                  }}
                                />
                                <span className="text-success_green">
                                  Approved
                                </span>
                              </p>
                            </>
                          )}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    </div>
  );
}

export default JobsTable;
