const Dao = require('../db/dao');

const db = new Dao();

class Actors {
  static async getById(actorId) {
    const result = await db.get(
      `SELECT * FROM Actor 
    WHERE actor_id = ? `,
      [actorId]
    );
    if (!result) return null;
    return result;
  }

  static async updateAvatar(avatarUrl, actorId) {
    const result = await db.run(
      `UPDATE Actor 
    SET avatar_url = ? WHERE actor_id = ?`,
      [avatarUrl, actorId]
    );
    return result;
  }

  static async getAllActors() {
    const result = await db.all(`
    SELECT Actor.actor_id as id, Actor.login, Actor.avatar_url FROM  Event
    JOIN Actor USING (actor_id)
    GROUP by actor_id
    ORDER BY count(*) DESC, created_at DESC, login
  `);
    return result;
  }
  static async getStreak() {
    const result = await db.all(`
      SELECT Actor.actor_id as id, Actor.login, Actor.avatar_url,
      ROW_NUMBER() OVER(PARTITION BY actor_id ORDER BY created_at) AS pushevents
      FROM  Event
      JOIN Actor USING (actor_id)
      ORDER BY pushevents DESC, created_at DESC, login
  `);
    return result;
  }
}

module.exports = Actors;
