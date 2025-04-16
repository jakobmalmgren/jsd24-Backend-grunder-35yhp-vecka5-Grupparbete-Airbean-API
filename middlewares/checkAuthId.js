const checkAuthId = (req, res, next) => {
  const authId = req.headers["x-api-key"];
  if (!authId || authId !== process.env.AUTH_ID) {
    return res.status(401).json({
      message: "Logga in för att se orderhistorik",
    });
  }
  req.authId = authId;
  next();
};
export { checkAuthId };
