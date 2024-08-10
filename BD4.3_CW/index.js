const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD4.3_CW/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3_CW" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
Question 1: Fetch All Movies

Create an endpoint /movies to return all the movies.

Create a function fetchAllMovies to fetch all the movies from the database.

Wrap the function call in a try-catch block.

Ensure that errors are caught and return res.status(500).json({ error: error.message }) if anything goes wrong.

Return 404 error if no data is found.

API Call:

<http://localhost:3000/movies>


Expected Response:

{
  'movies': [
    // All the movie entries in the database
  ]
}

*/

// function to fetch all movies from the database
async function fetchAllMovies() {
  let query = "SELECT * FROM movies";
  try {
    if (!db) {
      throw new Error("Database not connected");
    }
    let result = await db.all(query, []);
    if (!result || result.length == 0) {
      throw new Error("No Movies found");
    }
    return { movies: result };
  } catch (error) {
    console.log("Error in fetching Movies ", error.message);
    throw error;
  }
}

// endpoint to fetch all movies
app.get("/movies", async (req, res) => {
  try {
    let movies = await fetchAllMovies();
    res.status(200).json(movies);
    console.log("Succesfully fetched all movies");
  } catch (error) {
    if (error.message === "No Movies found") {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Question 2: Fetch All Movies by Actor

Create an endpoint /movies/actor/:actor to return all movies featuring a specific actor.

Create a function filterByActor to fetch movies filtered by actor from the database.

Wrap the function call in a try-catch block.

Ensure that errors are caught and return res.status(500).json({ error: error.message }) if anything goes wrong.

Return 404 error if no data is found.

API Call:

<http://localhost:3000/movies/actor/Salman%20Khan>


Expected Response:

{
  movies: [
    {
      id: 4,
      title: 'Bajrangi Bhaijaan',
      director: 'Kabir Khan',
      genre: 'Drama',
      release_year: 2015,
      rating: 4.5,
      actor: 'Salman Khan',
      box_office_collection: 130,
    },
    {
      id: 5,
      title: 'Sultan',
      director: 'Ali Abbas Zafar',
      genre: 'Drama',
      release_year: 2016,
      rating: 4.3,
      actor: 'Salman Khan',
      box_office_collection: 120,
    },
  ],
}
*/
// function to fetch movies filtered by actor from the database
async function filterByActor(actor) {
  let query = "SELECT * FROM movies WHERE actor = ?";
  try {
    if (!db) {
      throw new Error("Database not connected");
    }
    let result = await db.all(query, [actor]);
    if (!result || result.length == 0) {
      throw new Error("No Movies found by " + actor);
    }
    return { movies: result };
  } catch (error) {
    console.log("Error in fetching Movies ", error.message);
    throw error;
  }
}
// endpoint to fetch movies filtered by actor
app.get("/movies/actor/:actor", async (req, res) => {
  try {
    let actor = req.params.actor;
    let movies = await filterByActor(actor);
    res.status(200).json(movies);
    console.log("Succesfully fetched all movies by " + actor);
  } catch (error) {
    if (error.message === "No Movies found by " + actor) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Question 3: Fetch All Movies by Director

Create an endpoint /movies/director/:director to return all movies directed by a specific director.

Create a function filterByDirector to fetch movies filtered by director from the database.

Wrap the function call in a try-catch block.

Ensure that errors are caught and return res.status(500).json({ error: error.message }) if anything goes wrong.

Return 404 error if no data is found.

API Call:

<http://localhost:3000/movies/director/S.S.%20Rajamouli>


Expected Response:

{
  movies: [
    {
      id: 2,
      title: 'Baahubali 2: The Conclusion',
      director: 'S.S. Rajamouli',
      genre: 'Action',
      release_year: 2017,
      rating: 4.7,
      actor: 'Prabhas',
      box_office_collection: 181,
    },
  ],
}
*/
// function to fetch movies filtered by director from the database
async function filterByDirector(director) {
  let query = "SELECT * FROM movies WHERE director = ?";
  try {
    if (!db) {
      throw new Error("Database not connected");
    }
    let result = await db.all(query, [director]);
    if (!result || result.length == 0) {
      throw new Error("No Movies found by " + director);
    }
    return { movies: result };
  } catch (error) {
    console.log("Error in fetching Movies ", error.message);
    throw error;
  }
}
// endpoint to fetch movies filtered by director
app.get("/movies/director/:director", async (req, res) => {
  try {
    let director = req.params.director;
    let movies = await filterByDirector(director);
    res.status(200).json(movies);
    console.log("Succesfully fetched all movies by " + director);
  } catch (error) {
    if (error.message === "No Movies found by " + director) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});
