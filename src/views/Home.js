import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Bots list</h1>

      <Link to="/workaway-messaging">
        <button>Workaway messaging</button>
      </Link>
    </div>
  );
}

export default Home;
