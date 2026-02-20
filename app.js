import e from "express";
import aboutRoutes from "./about.js";
const app = e();
const PORT = 3000;

app.set("view engine", "ejs");

// home route
app.get("/", (req, res) => {
  res.send("Welcome to our EXPRESS.JS server!");
});

// app.get("/about", (req, res) => {
//   res.json({
//     message: "About Us",
//     description: "This is a sample Express.js app",
//   });
// });

app.use("/about", aboutRoutes);

app.get("/contact", (req, res) => {
  res.status(200).json({ message: "Contact Us", email: "contact@example.com" });
});

app.get("/user", (req, res) => {
  res.render("index", { username: "John Doe", email: "johndoe@mail.com" });
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
