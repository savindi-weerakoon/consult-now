// amplify/backend/function/assignGroup/src/app.js

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const AWS = require('aws-sdk');

// ─────────── configure AWS SDK ───────────
AWS.config.update({ region: 'eu-north-1' });
const cognito = new AWS.CognitoIdentityServiceProvider();

// ─────────── init Express ───────────
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// ─────────── CORS (adjust if you lock it down) ───────────
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  // handle preflight
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ─────────── your real /assign-group handler ───────────
app.post('/assign-group', async (req, res) => {
  const { group, username } = req.body;
  if (!group || !username) {
    return res
      .status(400)
      .json({ success: false, error: '`group` and `username` are required' });
  }

  try {
    await cognito
      .adminAddUserToGroup({
        UserPoolId: 'eu-north-1_TQAP9AvCc',
        GroupName: group,
        Username: username,
      })
      .promise();

    console.log(`✅ Added ${username} to ${group}`);
    return res.json({ success: true });
  } catch (err) {
    console.error('❌ [assign-group] error:', err);
    return res
      .status(500)
      .json({ success: false, error: err.message || 'unknown error' });
  }
});

// ─────────── catch-all for anything else ───────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// ─────────── local dev runner (ignored on Lambda) ───────────
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`assignGroup app listening on port ${port}`)
  );
}

module.exports = app;
