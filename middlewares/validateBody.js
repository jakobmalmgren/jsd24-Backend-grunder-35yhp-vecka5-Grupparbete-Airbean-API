export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Valideringsfel",
        error: error.details[0].message,
      });
    }
    req.body = value // Tar bort extra inputs
    next();
  };
};

// // fortsätt här!
