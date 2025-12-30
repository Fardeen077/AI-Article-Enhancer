import connectedDb from "./conf/db.js";
import app from "./app.js"
import dotenv from "dotenv";
<<<<<<< HEAD
import cors from "cors";

dotenv.config({ path: "./.env" });
// console.log(
//   "ENV CHECK:",
//   process.env.GEMINI_API_KEY?.slice(0, 6),
//   process.env.GEMINI_API_KEY?.length
// );

app.use(cors({
  origin: process.env.CLIENT_SIDE_URL,
  credentials: true,
}));

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
  connectedDb();
  console.log(`Server is listen port on: ${PORT}`);
=======
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
>>>>>>> e7d242a5046fea1bac6e50989c6b1a9474cadb60
});