import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./App.css";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Loader from "./Loader";
import Pagination from "./Pagiantion";
import axios from "axios";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState();
  const [githubUsername, setGithubUsername] = useState();
  const [bio, setBio] = useState();
  const [followers, setFollowers] = useState();
  const [siteUrl, setSiteUrl] = useState();
  const [location, setLocation] = useState();
  const [repo, setRepo] = useState();
  const [test, setTest] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  // Paginate Stuffs
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = posts.slice(firstPostIndex, lastPostIndex);

  // Change Page
  const paginate = (pageNumber, e) => {
    setCurrentPage(pageNumber);
    e.target.classList.add("active");
  };

  useEffect(() => {
    if (test === true) {
      const fetchPost = async () => {
        setIsLoading(true);
        const res = await axios.get(
          "https://api.github.com/users/Dev-SalamSheikh/repos?per_page=100&type=owner"
        );
        setPosts(res.data);
        setIsLoading(false);
      };
      fetchPost();
    }
  }, [test]);

  console.log(posts);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.github.com/users/Dev-SalamSheikh")
      .then((res) => res.json())
      .then(
        (result) => {
          setAvatarUrl(result.avatar_url);
          setGithubUsername(result.login);
          setBio(result.bio);
          setFollowers(result.followers);
          setSiteUrl(result.blog);
          setLocation(result.location);
          setRepo(result.public_repos);
          setIsLoading(false);
        },
        (err) => {
          console.log(err);
        }
      );
  }, []);

  console.log(currentPage);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container className="pb-5">
          <div className="App w-100 min-vh-100 d-flex align-items-center flex-wrap justify-content-center gap-4">
            <div className="github_profile_pic">
              <img src={avatarUrl} alt="ProfileImage" />
            </div>
            <div className="github_statistics">
              <h1>
                <span>github.com/</span>
                {githubUsername}
              </h1>
              <span className="bio">{bio}</span>
              <p className="pt-3 pb-0">Total Followers - {followers}</p>
              <span>
                Personal Portfolio -
                <a
                  href={siteUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "goldenrod" }}
                >
                  {" "}
                  {siteUrl}
                </a>
              </span>
              <h5 className="lcoation">From - {location}</h5>
              <p
                style={{ color: "goldenrod", fontSize: "24px" }}
                className="total_repo fw-bold"
              >
                Total Public Repository - {repo}
              </p>
              <Button className="click_button" onClick={() => setTest(true)}>
                Show All Public Repositories
              </Button>
            </div>
          </div>

          <div className="mt-5 d-flex flex-row flex-wrap align-items-center justify-content-center text-center gap-5">
            {currentPost.map((item, index) => (
              <div key={index}>
                <Card
                  text="white"
                  bg="dark"
                  style={{ width: "15rem", border: "1px solid goldenrod" }}
                >
                  <Card.Body style={{ padding: "20px" }}>
                    <Card.Title
                      style={{
                        textTransform: "uppercase",
                        color: "goldenrod",
                      }}
                    >
                      {item.name}
                    </Card.Title>
                    <Card.Text>
                      {item.description
                        ? item.description
                        : "Description is not avaiable in this Repository"}
                    </Card.Text>
                    <Card.Text style={{ color: "goldenrod" }}>
                      Default Branch: {item.default_branch}
                    </Card.Text>
                    <Card.Text style={{ color: "lightblue" }}>
                      Most Used Language: {item.language}
                    </Card.Text>
                    <Card.Text>Repo Froks: {item.forks_count}</Card.Text>

                    <a
                      href={item.clone_url}
                      alt={"link"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button className="repo_btn">Browse Code</Button>
                    </a>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      )}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
}

export default App;
