import app from "./app.js";
import connectionToDb from "../config/db.connection.js";
const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await connectionToDb();
  console.log(`Server is listening on http://localhost:${PORT}`);
});
