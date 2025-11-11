const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MERN Testing API',
      version: '1.0.0',
      description: 'Task Manager API for MERN Stack Testing Assignment',
    },
    servers: [
      {
        url: 'http://localhost:5001/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };