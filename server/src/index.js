import connectedDb from "./conf/db.js";
import app from "./app.js"
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
console.log(
  "ENV CHECK:",
  process.env.GEMINI_API_KEY?.slice(0, 6),
  process.env.GEMINI_API_KEY?.length
);

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
    connectedDb();
    console.log(`Server is listen port on: ${PORT}`);
});