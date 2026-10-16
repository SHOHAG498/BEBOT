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
    console.log('Bot spawned in the world. Starting AFK loop...');
    
    // প্রতি ৩০ সেকেন্ড পর পর চ্যাট মেসেজ পাঠিয়ে এএফকে রাখা
    setInterval(() => {
      try {
        client.queue('text', {
          type: 'chat',
          needs_translation: false,
          source_name: client.username,
          xuid: '',
          platform_chat_id: '',
          message: 'Hello, AFK bot is active!'
        });
        console.log('Sent AFK message.');
      } catch (err) {
        console.log('Failed to send AFK action:', err.message);
      }
    }, 30000);
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
  }, 10000); // ১০ সেকেন্ড বিরতি দিয়ে রি-জয়েন করবে
}

createBot();
