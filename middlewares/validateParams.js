export const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({
        message: "Felaktiga URL-parametrar",
        error: error.details[0].message,
      });
    }
    req.params = value; // Rensar bort skräp
    next();
  };
};
