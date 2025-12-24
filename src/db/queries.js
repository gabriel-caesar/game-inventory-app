const pool = require('./pool');

exports.createNewGame = async (name, genre_id, developer) => {
  try {
    await pool.query(
      `
      INSERT INTO games (name, genre_id, developer)
      VALUES
        ($1, $2, $3)
    `,
      [name, genre_id, developer]
    );
  } catch (error) {
    throw new Error(`Couldn't create the game. ${error}`);
  }
};

exports.createNewGenre = async (name) => {
  try {
    await pool.query(
      `
      INSERT INTO genres (name)
      VALUES
        ($1)
    `,
      [name]
    );
  } catch (error) {
    throw new Error(`Couldn't create the genre. ${error}`);
  }
};

exports.getAllGenres = async () => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM genres;  
    `);
    return rows;
  } catch (error) {
    throw new Error(`Couldn't get all genres. ${error}`);
  }
};

exports.createNewGame = async (name, genre_id, developer) => {
  try {
    await pool.query(
      `
      INSERT INTO games (name, genre_id, developer)
      VALUES
        ($1, $2, $3);
    `,
      [name, genre_id, developer]
    );
  } catch (error) {
    throw new Error(`Couldn't create the game. ${error}`);
  }
};

exports.getAllGames = async () => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        games.id,
        games.name, 
        games.developer, 
        genres.name AS genre_name 
        FROM games
          LEFT JOIN genres ON games.genre_id = genres.id;  
    `);
    return rows;
  } catch (error) {
    throw new Error(`Couldn't get all games. ${error}`);
  }
};

exports.getGame = async (id) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT 
        *
        FROM games
        WHERE games.id = ($1);
    `,
      [id]
    );
    return rows;
  } catch (error) {
    throw new Error(`Couldn't get game with id ${id}. ${error}`);
  }
};

exports.updateGame = async (name, genre_id, developer, game_id) => {
  try {
    await pool.query(
      `
      UPDATE games
        SET
          name = ($1),
          genre_id = ($2),
          developer = ($3)
        WHERE id = ($4);
    `,
      [name, genre_id, developer, game_id]
    );
  } catch (error) {
    throw new Error(`Couldn't update the game ${name}. ${error}`);
  }
};

exports.deleteGame = async (id) => {
  try {
    await pool.query(
      `
      DELETE FROM games WHERE id = ($1);
    `,
      [id]
    );
  } catch (error) {
    throw new Error(`Couldn't delete the game with id ${id}. ${error}`);
  }
};

exports.getGenre = async (id) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT 
        *
        FROM genres
        WHERE genres.id = ($1);
    `,
      [id]
    );
    return rows;
  } catch (error) {
    throw new Error(`Couldn't get genre with id ${id}. ${error}`);
  }
};

exports.updateGenre = async (name, id) => {
  try {
    await pool.query(
      `UPDATE genres
        SET name = ($1) WHERE id = ($2);`,
      [name, id]
    );
  } catch (error) {
    throw new Error(`Couldn't update the genre ${name}. ${error}`);
  }
};

exports.deleteGenre = async (id) => {
  try {
    await pool.query(
      `
      DELETE FROM genres WHERE id = ($1);
    `,
      [id]
    );
  } catch (error) {
    throw new Error(`Couldn't delete the genre with id ${id}. ${error}`);
  }
};

exports.getGamesByGenre = async (genre) => {
  try {
    const { rows } = await pool.query(
      `
        SELECT games.name, games.developer, genres.name AS genre_name FROM games 
        JOIN genres ON games.genre_id = genres.id
        WHERE games.genre_id = (
          SELECT id FROM genres WHERE name = ($1)
        );
      `,
      [genre]
    );
    return rows;
  } catch (error) {
    throw new Error(`Couldn't get games by genre ${genre}. ${error}`)
  }
}
