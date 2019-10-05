const Dao = require('../db/dao');

const db = new Dao();

class Events {
  static async getAll() {
    const result = await db.all(`SELECT * FROM Event
    JOIN Actor USING(actor_id)
    JOIN Repo USING(repo_id)
    ORDER BY id
  `);
    return result;
  }

  static async add(event) {
    const { actor, repo } = event;

    const actorResult = await db.run(
      `REPLACE INTO Actor (actor_id, login, avatar_url) VALUES (?, ?, ?)`,
      [actor.id, actor.login, actor.avatar_url]
    );
    const repoResult = await db.run(`REPLACE INTO Repo (repo_id, name, url) VALUES (?, ?, ?)`, [
      repo.id,
      repo.name,
      repo.url
    ]);
    const eventResult = await db.run(
      `INSERT INTO Event (id, type, created_at, actor_id, repo_id) VALUES (?, ?, ?, ?, ?)`,
      [event.id, event.type, event.created_at, actorResult.id, repoResult.id]
    );
    return eventResult;
  }

  static async deleteAll() {
    await db.run('DELETE FROM Actor');
    await db.run('DELETE FROM Repo');
    await db.run('DELETE FROM Event');
    return true;
  }

  static async getEventsByActorID(id) {
    const events = await db.all(
      `SELECT * FROM Event
    JOIN Actor USING(actor_id)
    JOIN Repo USING(repo_id)
    WHERE actor_id = ?
    ORDER BY id`,
      [id]
    );
    return events;
  }
}

module.exports = Events;
