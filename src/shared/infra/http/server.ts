import "reflect-metadata";
import { app } from "./app";

const port = 3333;

app.listen(port, () => {
  console.log(`Server running on port ${port}!🚀`);
});
