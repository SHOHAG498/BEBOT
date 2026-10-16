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
    console.log('Bot spawned in the world and is now safely AFK.');
    // এখানে চ্যাট স্প্যাম বন্ধ রাখা হয়েছে যাতে সার্ভার থেকে কিক না করে
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
