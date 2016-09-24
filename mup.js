module.exports = {
  servers: {
    one: {
      host: '1.2.3.4',
      username: 'root',
      password: ''
      // pem:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'VoteWithFeet',
    path: './',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'app.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
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
