const usersCtrl = require('../controllers/users.controller'),
  { authorize } = require('../helpers/index.helper'),
  roleType = require('../helpers/roles.helper');

module.exports = router => {
  /**
   * @swagger
   * securityDefinitions:
   *  Bearer:
   *    type: apiKey
   *    name: Authorization
   *    in: header
   */
  /**
   * @swagger
   * tags:
   *  - name: user
   *    description: Operations about the user
   */
  /**
   * @swagger
   * definitions:
   *  CreateUser:
   *    type: object
   *    properties:
   *      firstname:
   *        type: string
   *        example: Jon
   *      lastname:
   *        type: string
   *        example: Snow
   *      email:
   *        type: string
   *        example: jonnysnow@gmail.com
   *      password:
   *        type:  string
   *        example: QueenSlayer2
   *      gender:
   *        type: string
   *        example: male
   *      jobrole:
   *        type: string
   *        example: Resource Manager
   *      department:
   *        type: string
   *        example: Human Resource
   *      address:
   *        type: string
   *        example: Kasarani, Nairobi
   */
  /**
   * @swagger
   * path:
   *  /auth/create-user:
   *    post:
   *      tags:
   *      - user
   *      summary: Create a new user
   *      description: Add user endpoint
   *      operationId: addUser
   *      consumes:
   *      - application/json
   *      - application/xml
   *      produces:
   *      - application/json
   *      - application/xml
   *      parameters:
   *      - in: header
   *        name: authorization
   *        type: string
   *        required: true
   *      - in: body
   *        name: body
   *        description: User object that is to be created
   *        required: true
   *        schema:
   *          $ref: '#/definitions/CreateUser'
   *      responses:
   *        201:
   *          description: User successfully created
   *        401:
   *          description: Access token is missing or invalid
   *        405:
   *          description: Invalid input
   *      security:
   *        - Bearer: []
   */
  router.post(
    '/auth/create-user',
    authorize(roleType.Admin),
    (req, res, next) => {
      usersCtrl.create(req, res).catch(e => next(e));
    }
  );
  /**
   * @swagger
   * path:
   *  /auth/signin:
   *    get:
   *      tags:
   *      - user
   *      summary: Sign in a user into the system
   *      description: Sign in user endpoint
   *      operationId: signinUser
   *      produces:
   *      - application/json
   *      - application/xml
   *      parameters:
   *      - in: query
   *        name: email
   *        type: string
   *        required: true
   *        description: User signin email
   *      - in: query
   *        name: password
   *        type: string
   *        description: User signin password
   *        required: true
   *      responses:
   *        200:
   *          description: User successfully signed in
   *          headers:
   *            X-Expires-After:
   *              type: string
   *              format: date-time
   *              description: Date in UTC when token expires
   *        400:
   *          description: Invalid username/password provided
   *        401:
   *          description: Authentication error
   */
  router.get('/auth/signin', (req, res, next) => {
    usersCtrl.signin(req, res).catch(e => next(e));
  });
};
