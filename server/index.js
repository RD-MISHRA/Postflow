


const express = require('express');
const { TwitterApi } = require('twitter-api-v2');

const app = express();
app.use(express.json());

// ✅ Correct OAuth 1.0a client (v1.1 API)
const client = new TwitterApi({
  
});

app.get('/tweet', async (req, res) => {
  const  text  = "rdx";

  if (!text) return res.status(400).json({ error: 'Tweet text is required' });

  try {
    const tweet = await client.v2.tweet(text);
    console.log('✅ Tweet posted:', tweet);
    res.status(200).json({ message: 'Tweet posted!', tweetId: tweet.id_str });
  } catch (error) {
    console.error('❌ Tweet failed:', error);
    res.status(500).json({ error: 'Tweet failed', details: error.data || error.message });
  }
});

app.listen(3000, () => console.log('✅ Server running on port 3000'));
