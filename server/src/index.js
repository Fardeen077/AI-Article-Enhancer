import connectedDb from "./conf/db.js";
import dotenv from "dotenv"
import app from "./app.js"

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
    connectedDb();
    console.log(`Server is listen port on: ${PORT}`);
});