import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().default(3000),

  DATABASE_REQUIRED: Joi.boolean().truthy('true').falsy('false').default(true),

  DATABASE_URL: Joi.when('DATABASE_REQUIRED', {
    is: true,
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
});
