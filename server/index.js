


const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
const cors = require('cors');
const axios = require('axios'); // For Node.js
const jwt = require('jsonwebtoken'); // For JWT handling
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



app.use(cors({ origin: 'http://localhost:3000', credentials: true }));



// Step 1: Redirect to Google OAuth
app.get('/api/auth/google', (req, res) => {
  console.log("GET /api/auth/google called");

  const redirect_uri = 'http://localhost:5000/api/auth/google/callback';
  console.log("Redirect URI set:", redirect_uri);

  const scope = 'openid email profile';
  console.log("Scope set:", scope);

  const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`;
  console.log("Constructed Google Auth URL:", authURL);

  res.redirect(authURL);
  console.log("Redirected to Google Auth URL");
});

// Step 2: Callback from Google → Get tokens → Create JWT
app.get('/api/auth/google/callback', async (req, res) => {
  console.log("GET /api/auth/google/callback called");

  const code = req.query.code;
  console.log("Authorization code received:", code);

  const redirect_uri = 'http://localhost:5000/api/auth/google/callback';
  console.log("Redirect URI for token exchange:", redirect_uri);

  try {
    console.log("Requesting tokens from Google...");

    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri,
      grant_type: 'authorization_code',
    });

    console.log("Token response received:", response.data);

    const { id_token, access_token } = response.data;
    console.log("Extracted id_token:", id_token);
    console.log("Extracted access_token:", access_token);

    console.log("Requesting user info from Google...");
    const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userInfo.data;
    console.log("User info received:", user);

    // You can store the user in DB here (MongoDB)
    console.log("User info ready to be stored or used");

    const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1d' });
    console.log("JWT generated:", token);

    res.cookie('token', token, { httpOnly: true }).redirect('http://localhost:3000/dashboard');
    console.log("JWT set in cookie and redirected to dashboard");

  } catch (err) {
    console.error("Error during Google callback handling:", err);
    res.status(500).send('Authentication Failed');
  }
});

// Example route that needs auth
app.get('/api/protected', (req, res) => {
  console.log("GET /api/protected called");

  const token = req.cookies.token;
  console.log("Token from cookies:", token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Token decoded:", decoded);

    res.send({ message: 'Protected content', user: decoded });
    console.log("Protected content sent");
  } catch (err) {
    console.error("Unauthorized access attempt:", err);
    res.status(401).send('Unauthorized');
  }
});


app.listen(5000, () => console.log('✅ Server running on port 3000'));
