export default function Home({ user, movies, error }) {
  // console.log(user, movies, error);

  return (
    <div>
      <h2>Home</h2>

      {user && <p>Welcome, {user.name} 🎉</p>}

      {movies && (
        <pre>{JSON.stringify(movies, null, 2)}</pre> // pretty print JSON
      )}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
