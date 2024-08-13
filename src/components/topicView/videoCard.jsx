import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";

const VideoCard = ({ videoId, thumbnail, topic, subject, title }) => {
  return (
    <Card
      sx={{
        width: {
          xs: "100%",
          sm: "338px",
          md: "300px",
        },
        boxShadow: "none",
        borderRadius: "8px",
      }}
    >
      <Link to={`/${subject}/${topic}/${videoId}`}>
        <CardMedia
          sx={{
            width: {
              xs: "100%",
              sm: "358px",
              md: "320px",
            },
            height: "180px",
          }}
          alt={title}
          image={thumbnail}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "#fefae0", height: "100%" }}>
        <Link to={`/${subject}/${topic}/${videoId}`}>
          <Typography variant="subtitle1" fontWeight="bold" color="black">
            {title}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
