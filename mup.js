module.exports = {
  servers: {
    one: {
      host: 'XXXXXXXXXXXXXX',
      username: 'root',
      password: 'XXXXXXXXXX'
      // pem:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'VoteWithYourFeet',
    path: './',
    servers: {
      one: {}
    },
    buildOptions: {
    },
    env: {
      ROOT_URL: 'http://138.68.46.208',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
