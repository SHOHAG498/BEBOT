const bedrock = require('bedrock-protocol');

const serverOptions = {
  host: 'srbedrock.falixsrv.me',
  port: 29382,
  username: 'AFK_Bot', 
  offline: true 
};

function createBot() {
  console.log('Connecting to server...');
  const client = bedrock.createClient(serverOptions);

  client.on('join', () => {
    console.log('Bot successfully joined the server!');
  });

  client.on('spawn', () => {
    console.log('Bot spawned in the world. Starting walking/AFK loop...');
    
    // Proti 20 second por por server-e minor movement ba action pathanor loop
    setInterval(() => {
      try {
        // Bedrock protocol er maddhome player action ba packet pathano
        client.queue('player_auth_input', {
          pitch: 0,
          yaw: Math.random() * 360, // protibar mathar dik change korbe jate active thake
          position: [0, 0, 0],
          move_vector: [0.1, 0],
          head_yaw: 0,
          input_data: 0,
          input_command: 0,
          player_epoch: 0,
          counter: 0
        });
        console.log('Sent walk/movement action to stay active.');
      } catch (err) {
        console.log('Movement action skipped:', err.message);
      }
    }, 20000);
  });

  client.on('disconnect', (packet) => {
    console.log('Disconnected from server:', packet);
    reconnect();
  });

  client.on('error', (err) => {
    console.log('Client error occurred:', err);
  });

  client.on('close', () => {
    console.log('Connection closed.');
    reconnect();
  });
}

function reconnect() {
  console.log('Reconnecting in 10 seconds...');
  setTimeout(() => {
    createBot();
  }, 10000);
}

createBot();
