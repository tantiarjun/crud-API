import Joi from "joi";

export const validateUser = (req, res, next) => {
  const { name, email, phone } = req.body;
  const userInfo = { name, email, phone };

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name cannot exceed 30 characters",
    }),

    email: Joi.string().email().messages({
      "string.email": "Invalid email format",
    }),

    phone: Joi.string()
      .trim()
      .pattern(/^[0-9]+$/)
      .min(10)
      .required()
      .messages({
        "string.pattern.base": "Phone number must contain only digits",
        "string.min": "Phone number must be at least 10 characters",
      }),
  });

  const { error } = schema.validate(userInfo);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};
