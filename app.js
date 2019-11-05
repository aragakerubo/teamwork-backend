const express = require('express'),
  swaggerJSDoc = require('swagger-jsdoc'),
  swaggerUi = require('swagger-ui-express');

const app = express();

// Extended: https://swagger.io/specification/
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Teamwork API',
      description: 'Teamwork API Documentation',
      contact: {
        name: 'Araga Kerubo'
      },
      servers: [
        {
          url: 'http://localhost:5000',
          description: 'Development server'
        },
        {
          url: 'https://teamwork-backend-staging.herokuapp.com/',
          description: 'Staging server'
        },
        {
          url: 'https://teamwork-backend-production.herokuapp.com/',
          description: 'Production server'
        }
      ]
    }
  },
  apis: ['routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
