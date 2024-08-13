import React from "react";
import styled from "styled-components";
import { sidebarContext } from "../sidebar/Sidebar";

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 40px 20px;
  border-radius: 5px;
  background-color: #faedce;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: sans-serif;
`;
const Dashboard = () => {
  const { setHeader } = React.useContext(sidebarContext);
  React.useEffect(() => {
    setHeader("EDU Tube");
  }, []);
  return (
    <div>
      <Container>
        <h2>Welcome to your dashboard! 🌟</h2>
        <br />
        It might seem a little empty here at first glance, but this is just the
        beginning of your learning journey—there’s so much to explore! Our
        platform is designed to provide you with a rich, interactive educational
        experience, and it all starts with just a few simple steps.
        <br />
        <br />
        To unlock the treasure trove of knowledge, begin by{" "}
        <b>selecting a subject</b> that interests you. Whether you're curious
        about science, math, history, or any other subject, we have something
        for everyone. Once you've made your choice, <b> click on any topic</b>{" "}
        that piques your curiosity.
        <br />
        <br />
        What happens next? You'll gain access to a diverse range of interactive
        videos, each crafted to make learning engaging, fun, and deeply
        informative. These aren't just your typical videos—they're designed to
        immerse you in the subject matter, making complex concepts easier to
        understand and helping you connect the dots in new and exciting ways.
        <br />
        <br />
        Whether you're here to master a new skill, prepare for an exam, or
        simply learn something new, we're here to support you every step of the
        way. This dashboard will soon become your hub of learning, filled with
        personalized content that evolves as you do.
        <br />
        <br />
        So go ahead—take that first step. Dive into a subject, explore a topic,
        and let the adventure begin. Your journey to knowledge starts here, and
        we’re thrilled to have you on board! 🚀📚
        <br />
        <br />
        <br />
        Happy learning! 🎓
      </Container>
    </div>
  );
};

export default Dashboard;
