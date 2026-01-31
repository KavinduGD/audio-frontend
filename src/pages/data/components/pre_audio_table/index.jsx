import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";
import Box from "../../../../components/box";
import SelectOptions from "../../../../components/SelectOptions";
import Slider from "@mui/material/Slider";
import { usePreDataContext } from "../../../../hooks/use_pre_data_context";

import AudioPlayer from "react-h5-audio-player";

const header_cell_style =
  "text-light_grey dark:text-dark_grey font-semibold font-amazon_ember";
const row_cell_style =
  "text-light-black  dark:text-dark_grey font-amazon_ember";

function PreAudioTable() {
  const { isDarkMode } = useDarkModeContext();
  const { pre_data } = usePreDataContext();
  const [audioFiles, setAudioFiles] = useState([]);
  const [className, setClassName] = useState("");
  const [count, setCount] = useState(4);
  const [audioMetadata, setAudioMetadata] = useState({});
  const [currentAudio, setCurrentAudio] = useState(null);

  const audioRefs = useRef([]);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        console.log("className", className);
        const response = await axios.post(
          "http://127.0.0.1:5000/api/zip-data/get-all-audios",
          {
            class_name: className,
          }
        );
        if (response.data.status === "success") {
          setAudioFiles(response.data.audio_files);
        }
      } catch (error) {
        console.error("Error fetching audio files:", error);
      }
    };

    if (className) {
      fetchAudioFiles();
    }
  }, [className]);

  useEffect(() => {
    if (pre_data.length > 0) {
      setClassName(pre_data[0].name);
    }
  }, [pre_data]);

  const fetchMetadata = (url, index) => {
    const audio = new Audio(url);
    audio.addEventListener("loadedmetadata", () => {
      setAudioMetadata((prev) => ({
        ...prev,
        [index]: {
          duration: audio.duration,
        },
      }));
    });

    audio.addEventListener("error", (e) => {
      console.error(`Error loading audio metadata for ${url}:`, e);
    });
  };

  useEffect(() => {
    audioFiles.slice(0, count).forEach((file, index) => {
      fetchMetadata(file.url, index);
    });
  }, [audioFiles, count]);

  const handlePlay = (index) => {
    // Pause all other audio players
    audioRefs.current.forEach((player, i) => {
      if (i !== index && player) {
        player.audio.current.pause();
      }
    });
    setCurrentAudio(index);
  };
  return (
    <Box
      topic="Pre Audio Table"
      optional={() => {
        return (
          <div className="flex items-center w-[500px] gap-[30px]">
            <span>
              {count}/{audioFiles.length}
            </span>
            <Slider
              value={count}
              onChange={(event, newValue) => setCount(newValue)}
              max={audioFiles.length}
              valueLabelDisplay="auto"
              color="#16191F"
              size="small"
            />
            <SelectOptions
              options={pre_data.map((cls) => ({
                value: cls.name,
                label: cls.name,
              }))}
              input_fun={setClassName}
              value={className}
            />
          </div>
        );
      }}
      optional_display={true}
    >
      <div className="p-5">
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
                  <TableCell style={{ flex: 1 }}>
                    <span className={header_cell_style}>Audio name</span>
                  </TableCell>
                  <TableCell style={{ flex: 2 }}>
                    <span className={header_cell_style}>Audio </span>
                  </TableCell>
                  <TableCell style={{ flex: 1.5 }}>
                    <span className={header_cell_style}>Add date</span>
                  </TableCell>
                  <TableCell style={{ flex: 0.5 }}>
                    <span className={header_cell_style}>File size</span>
                  </TableCell>
                  <TableCell style={{ flex: 0.5 }}>
                    <span className={header_cell_style}>Duration</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {audioFiles.slice(0, count).map((row, index) => (
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
                    <TableCell style={{ flex: 1 }}>
                      <span className="text-text_blue font-bold text-[14px] font-amazon_ember">
                        {row.name}
                      </span>
                    </TableCell>
                    <TableCell style={{ flex: 2 }}>
                      <span className={row_cell_style}>
                        {/* add color to the player */}
                        <AudioPlayer
                          ref={(el) => (audioRefs.current[index] = el)}
                          src={row.url}
                          onPlay={() => handlePlay(index)}
                          className={
                            isDarkMode ? "no-border-dark" : "no-border-light"
                          }
                          style={{
                            backgroundColor: isDarkMode ? "#2A2E33" : "#fff",
                          }}
                        />
                      </span>
                    </TableCell>
                    <TableCell style={{ flex: 1.5 }}>
                      <span className={row_cell_style}>
                        {row.last_modified}
                      </span>
                    </TableCell>
                    {/* converts bytes to kb , 2 decimals */}
                    <TableCell style={{ flex: 0.5 }}>
                      <span className={row_cell_style}>
                        {(row.size / 1024).toFixed(1) + " KB"}
                      </span>
                    </TableCell>
                    <TableCell style={{ flex: 0.5 }}>
                      <span className={row_cell_style}>
                        {audioMetadata[index]?.duration
                          ? `${Math.floor(
                              audioMetadata[index].duration / 60
                            )}:${Math.floor(audioMetadata[index].duration % 60)
                              .toString()
                              .padStart(2, "0")}`
                          : "Loading..."}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Box>
  );
}

export default PreAudioTable;
