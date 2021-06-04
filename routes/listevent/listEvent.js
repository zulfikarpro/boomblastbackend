const eventController = require('../../controller/eventController');
const auth = require('../../middleware/auth');

module.exports = async function (fastify, opts) {
    fastify.addHook('preHandler', async (req, res) => {
      auth(req, res);
      if (req.sent) return; // stop on error (like user authentication)
    });
  
    fastify.post('/', (req, res) => {
      console.log('ini body');
      // return createTransaction(req, res);
      return eventController(req, res);
    });
  };
  