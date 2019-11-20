const express = require('express'),
  swaggerJSDoc = require('swagger-jsdoc'),
  swaggerUi = require('swagger-ui-express'),
  bodyParser = require('body-parser');

const { errorHandler } = require('./helpers/error-handler.helper'),
  routes = require('./routes/index.route');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

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

app.use('/api/v1', routes(router));

app.use(errorHandler);

module.exports = app;
