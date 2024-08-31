
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

const PORT = 8000 || process.env.PORT;
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/songs", require("./routers/songs.router"));

try {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
} catch (error) {
    console.warn(error)
}