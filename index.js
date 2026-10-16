const bedrock = require('bedrock-protocol');

const serverOptions = {
  host: 'srbedrock.falixsrv.me',
  port: 29382,
  username: 'AFK_Bot', // বোটের ইন-গেম নাম
  offline: true       // ক্র‍্যাকড সার্ভারের জন্য অফলাইন মোড
  // এখানে version অংশটি সরিয়ে দেওয়া হয়েছে
};

function createBot() {
  console.log('Connecting to server...');
  const client = bedrock.createClient(serverOptions);

  client.on('join', () => {
    console.log('Bot successfully joined the server!');
  });

  client.on('spawn', () => {
    console.log('Bot spawned in the world. Starting AFK loop...');
    
    // প্রতি ৩০ সেকেন্ড পর পর এএফকে কাটানোর জন্য চ্যাট পাঠানো
    setInterval(() => {
      try {
        client.queue('text', {
          type: 'chat',
          needs_translation: false,
          source_name: client.username,
          xuid: '',
          platform_chat_id: '',
          message: 'Hello, I am an AFK bot!'
        });
        console.log('Sent AFK message to keep active.');
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
  console.log('Reconnecting in 5 seconds...');
  setTimeout(() => {
    createBot();
  }, 5000);
}

createBot();
