const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const AWS = require('aws-sdk');

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// ✅ New: Assign Group Endpoint
app.post('/assign-group', async (req, res) => {
  const { username, group } = req.body;

  const userPoolId = process.env.AUTH_TEST7D2204C81_USERPOOLID; // check exact env var name

  if (!username || !group || !userPoolId) {
    return res.status(400).json({ error: 'Missing username, group, or userPoolId' });
  }

  const cognito = new AWS.CognitoIdentityServiceProvider();

  try {
    await cognito.adminAddUserToGroup({
      GroupName: group,
      Username: username,
      UserPoolId: userPoolId
    }).promise();

    res.json({ success: true, message: 'User added to group' });
  } catch (error) {
    console.error('Cognito error:', error);
    res.status(500).json({ error: 'Failed to assign group' });
  }
});

// (Optional) test endpoint
app.get('/assign-group', (req, res) => {
  res.json({ message: 'GET on /assign-group working' });
});

app.listen(3000, () => console.log("Server started"));

module.exports = app;
