import React, { useEffect } from "react";
import { apiClient } from "../../apiClient/apiClient";

import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { AppLodingContainer, sidebarContext } from "../sidebar/Sidebar";
import { Image, Spin } from "antd";
import styled from "styled-components";
import visualizerThumbnail from "./visualizer.jpg";
import axios from "axios";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 500px;
  gap: 20px;
  padding: 20px;
  background-color: #e0e5b680;
  .concept-box {
    padding: 20px;
    background-color: #fefae0;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

    .concept-time {
      color: blue;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .concept-map {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    & > div {
      cursor: pointer;
    }

    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    height: calc(100vh - 178px);
  }

  .video-container {
    background-color: #fefae0;
    padding: 30px;
    display: grid;
    place-items: center;
    border: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
  min-height: calc(100vh - 48px);
`;

const formatTime = (seconds) => {
  const minutes = Math.floor(parseFloat(seconds) / 60);
  const remainingSeconds = parseFloat(seconds) % 60;
  const formattedMinutes = String(parseInt(minutes)).padStart(2, "0");
  const formattedSeconds = String(parseInt(remainingSeconds)).padStart(2, "0");
  return ` ${formattedMinutes}:${formattedSeconds} `;
};
const Learn = () => {
  const { topic, videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [concepts, setConcepts] = useState([]);
  const { setHeader } = React.useContext(sidebarContext);
  const playerRef = React.useRef(null);
  const [playing, setPlaying] = useState(false);

  const [loadingConcepts, setLoadingConcepts] = useState(false);

  const fetchConcept = async (description, concept, cancelToken, c = 0) => {
    try {
      const conceptData = await apiClient
        .get(`/htmlcontent/${description}`, {
          cancelToken: cancelToken,
        })
        .then((res) => res.data);
      if (!conceptData) return null;

      setConcepts((prev) => [
        ...prev,
        {
          ...concept,
          ...conceptData,
        },
      ]);
    } catch (e) {
      console.log(e);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (c < 3) {
        return fetchConcept(description, concept, cancelToken, c + 1);
      }
      return setLoadingConcepts(false);
    }
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    apiClient
      .get(`/video/${videoId}`, {
        cancelToken: source.token,
      })
      .then(async (res) => {
        setHeader(topic);
        setVideo(res.data);

        const video = res.data;
        const conceptList = video?.concept || video?.concepts || [];

        setConcepts([]);
        setLoadingConcepts(true);

        try {
          await Promise.all(
            conceptList.map(async (concept) => {
              let description =
                concept["concept description"] ||
                concept["description"] ||
                concept["concept"] ||
                "";

              description = description.trim();
              description = description.replaceAll("/", "-");

              if (!description) return null;

              await fetchConcept(description, concept, source.token);
            })
          );
        } catch (err) {
          console.log(err);
        }
        setLoadingConcepts(false);

        return () => {
          source.cancel();
        };
      });
  }, []);
  // error handling for destructuring of the objects
  if (!video?.title)
    return (
      <AppLodingContainer
        style={{ height: "calc(100vh - 48px)", width: "100%" }}
      >
        <Spin />
      </AppLodingContainer>
    );

  // object destructuring in action

  const openPopupWindow = (htmlContent) => {
    // Open a new pop-up window with specific dimensions and features
    const popupWindow = window.open(
      "",
      "PopupWindow",
      "width=800,height=800,scrollbars=no,resizable=no"
    );

    // Write the HTML content into the new pop-up window
    popupWindow.document.write(htmlContent);

    // Finalize and render the content in the pop-up window
    popupWindow.document.close();
  };

  const onSeek = (e, time) => {
    e.preventDefault();
    playerRef.current.seekTo(time);

    setPlaying(true);
  };

  return (
    <Container>
      <div>
        <div className="video-container">
          <Stack direction={{ xs: "column", md: "row" }}>
            <Box flex={1}>
              <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${videoId}`}
                  className="react-player"
                  controls
                  ref={playerRef}
                  onPlay={() => setPlaying(true)}
                  playing={playing}
                  //   onSeek={(e) => console.log("Seek", e)}
                  //   onDuration={(duration) => console.log("Duration", duration)}
                />
                <Typography
                  color="#060303"
                  fontWeight="bold"
                  variant="h5"
                  p={2}
                >
                  {video.title}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </div>
      </div>
      <div>
        <div className="concept-box">
          <Typography variant="h5">
            {" "}
            {loadingConcepts ? "Building " : ""}Interactive Playground
          </Typography>
          {loadingConcepts ? (
            <div style={{ display: "grid", placeContent: "center" }}>
              <Spin size="small" />{" "}
            </div>
          ) : null}
        </div>
        <br />
        <div className="concept-map">
          {concepts.map((concept) => (
            <div className="concept-box">
              <Typography variant="h6">
                {concept["concept description"] || concept.topic}
                <span className="concept-time">
                  <div onClick={(e) => onSeek(e, concept.start)}>
                    <span style={{ fontSize: 16 }}>
                      {formatTime(concept.start)}
                    </span>
                    <span> - </span>
                    <span style={{ fontSize: 16 }}>
                      {formatTime(concept.end)}
                    </span>
                  </div>
                </span>
              </Typography>
              <br />

              <div onClick={() => openPopupWindow(concept.html_content)}>
                <Image
                  src={visualizerThumbnail}
                  width={"100%"}
                  preview={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Learn;
