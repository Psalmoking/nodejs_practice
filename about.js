import e from "express";

const router = e.Router();

router.get("/", (req, res) => {
  res.json({
    message: "About Us",
    description: "Express.js application business",
  });
});

router.get("/team", (req, res) => {
  res.status(200).json({
    message: "About our Team",
    description: "This is a nested route for our team information.",
  });
});

export default router;
