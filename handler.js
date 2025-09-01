const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.MESSAGES_TABLE;

module.exports.websocketConnect = async (event) => {
  // Handle user connection logic here
};

module.exports.websocketDisconnect = async (event) => {
  // Handle user disconnection logic here
};

module.exports.sendMessage = async (event) => {
  const message = JSON.parse(event.body);
  if (!message.id || !message.content || !message.user || typeof message.content !== 'string') {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid message payload' }),
    };
  }
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: message.id,
      content: message.content,
      user: message.user,
      timestamp: new Date().toISOString(),
    }
  };

  await docClient.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message sent' }),
  };
};