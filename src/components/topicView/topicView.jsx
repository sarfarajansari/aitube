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
  gap: 20px;
  justify-content: space-around;
  padding: 20px;

  a {
    text-decoration: none;
    color: #206a3f;
  }
  background-color: #e0e5b680;
  min-height: calc(100vh - 48px);
`;
const TopicView = () => {
  const { topic, subject } = useParams();
  const [videos, setVideos] = React.useState([]);

  const { setHeader } = React.useContext(sidebarContext);

  const [loading, setLoading] = React.useState(true);

  const fetchVideos = async (c = 0) => {
    try {
      setLoading(true);
      await apiClient.get(`videos/${topic}`).then((res) => {
        setVideos(res.data.videos);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (c < 3) {
        return fetchVideos(c + 1);
      }
    }
  };
  useEffect(() => {
    fetchVideos();
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
    </Container>
  );
};

export default TopicView;
