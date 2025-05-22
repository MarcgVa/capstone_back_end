const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const cors = require("cors");

if (process.env.ENV === "dev") {
  app.use(cors({ origin: /localhost/ }));
} else {
  app.use(cors({ origin: "https://grupelawncare.netlify.app" }));
}


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
