import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "./Home.css";
import { useLoggedInStore } from "../../app/store";
import MemeListContainer from "../overview/MemeListContainer/MemeListContainer";
import MemeService from "../../services/memeService";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const [userName, setUserName] = useState("");
  const [mostRecentPublishedMemes, setMostRecentPublishedMemes] = useState([]);
  const [latestPublicMemes, setLatestPublicMemes] = useState([]);
  const isAuthenticated = useLoggedInStore((state) => state.loggedIn);
  const memeService = new MemeService();

  const [filter, setFilter] = useState({
    title: "",
    creator: "",
    likes: "",
    dislikes: "",
    comments: "",
    creationDate: "",
  });

  const fetchMemes = async () => {
    const mostRecentPublishedMemes = await memeService.retrieveMemesAccess(
      2,
      "public"
    );
    const allMemes = await memeService.getAllMemes();
    const sortedMemes = allMemes.sort(
      (a, b) => b.votes.length - a.votes.length
    );
    const mostVotedMemes = sortedMemes.slice(0, 2);

    //const newMemes = mostRecentPublishedMemes.slice(0, 2);
    setMostRecentPublishedMemes(mostRecentPublishedMemes);
    setLatestPublicMemes(mostVotedMemes);
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      let userData = JSON.parse(localStorage.getItem("loginData"));
      setUserName(userData.name);
    } else {
      setUserName("");
    }
  }, [isAuthenticated]);
  return (
    <Container className="index-root">
      <Row>
        <Col>
          <h1>Welcome back {userName}</h1>
        </Col>
      </Row>
      <Row className="index-fast-actions-container">
        <Col
          className="index-fast-actions shadow rounded"
          as={Link}
          to="/editor"
        >
          Create new Meme
        </Col>
        <Col
          className="index-fast-actions shadow rounded"
          as={Link}
          to="/overview"
        >
          <Container>Search for Memes</Container>
        </Col>
        <Col
          className="index-fast-actions shadow rounded"
          as={Link}
          to="/profile"
        >
          <Container>View Profil</Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="index-header">Recently published memes</h4>
          <Container className="index-container">
            <MemeListContainer
              memes={mostRecentPublishedMemes}
              filter={filter}
              fetchMemes={fetchMemes}
            ></MemeListContainer>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="index-header">Most viral memes</h4>
          <Container className="index-container">
            <MemeListContainer
              memes={latestPublicMemes}
              filter={filter}
              fetchMemes={fetchMemes}
            ></MemeListContainer>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
