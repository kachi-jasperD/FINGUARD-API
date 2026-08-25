const validateTodo = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        error: error.details.map((detail) => detail.message),
      });
    }

    req.validatedBody = value;

    next();
  };
};

module.exports = validateTodo;