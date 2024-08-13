import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../../apiClient/apiClient";
import { AppLodingContainer, sidebarContext } from "../sidebar/Sidebar";
import { Spin } from "antd";
import VideoCard from "./videoCard";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 40px;
  padding: 20px;

  a {
    text-decoration: none;
    color: #206a3f;
  }
  background-color: #e0e5b680;
  min-height: calc(100vh - 48px);
`;

const AddButton = styled.div`
  width: 320px;
  height: 276px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  background-color: #ede5af;
  cursor: pointer;
  border-radius: 8px;
  display: grid;
  place-content: center;
  font-size: 30px;
  font-family: sans-serif;
  user-select: none;
`;
const TopicView = () => {
  const { topic, subject } = useParams();
  const [videos, setVideos] = React.useState([]);

  const { setHeader } = React.useContext(sidebarContext);

  const [loading, setLoading] = React.useState(true);
  const [generatingVideo, setGeneratingVideo] = React.useState(false);

  const generateVideos = async (c = 0) => {
    try {

      if (generatingVideo) {
        return;
      }
      setGeneratingVideo(true);
      apiClient
        .post(`generatevideo`, {
          subject: topic,
        })
        .then((res) => {
          const videos = res.data?.videos || [];
          setVideos((prev) => [...prev, ...videos]);
          setGeneratingVideo(false);
        });
    } catch (err) {
      setGeneratingVideo(false);
      console.log(err);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (c < 3) {
        return generateVideos(c + 1);
      }
    }
  };
  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`videos/${topic}`)
      .then((res) => {
        setVideos(res.data.videos);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    setHeader(topic);
  }, [topic]);
  if (loading) {
    return (
      <AppLodingContainer
        style={{ height: "calc(100vh - 48px)", width: "100%" }}
      >
        <Spin />
      </AppLodingContainer>
    );
  }
  return (
    <Container>
      {videos.map((video) => {
        return (
          <VideoCard
            {...video}
            subject={subject}
            topic={topic}
            key={video.videoId}
          />
        );
      })}
      <AddButton onClick={generateVideos}>
        {generatingVideo ? (
          <>
            Generating... <Spin size="small" />
          </>
        ) : videos.length === 0 ? (
          "Load a video"
        ) : (
          "Load Another Video"
        )}
      </AddButton>
    </Container>
  );
};

export default TopicView;
