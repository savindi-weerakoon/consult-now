import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { GetCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4002;
const REGION = process.env.AWS_REGION || 'eu-north-1';
const TABLE = process.env.DYNAMODB_TABLE || 'UserProfiles';

// DynamoDB Client
const client = new DynamoDBClient({ region: REGION });
const ddb = DynamoDBDocumentClient.from(client);

app.get('/health', (req, res) => {
  res.json({ status: 'User Profile Service is running 🚀' });
});

app.get('/profile/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await ddb.send(
      new GetCommand({
        TableName: TABLE,
        Key: { userId }
      })
    );

    if (!result.Item) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.Item);
  } catch (error) {
    console.error('❌ Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

// Catch-all
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`User Profile Service listening on port ${PORT}`);
});
