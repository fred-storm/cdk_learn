import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const outlook = async function getForecast(url) {
  const forecast = await fetch(url);
  if (!forecast.ok) {
    throw new Error("Fetching Forecast Failed!");
  }
  const wForecast = await forecast.json();
  //console.log(forecast);
  const period = wForecast.properties.periods;
  return period.slice(0, 2);
};

export const handler = async (event) => {
  // TODO implement
  for (const { messageId, body } of event.Records) {
    console.log("SQS message %s: %j", messageId, body);
    const g2 = JSON.parse(body);
    //return g2.responsePayload;
    const forecast = await outlook(g2.responsePayload);
    console.log(forecast);
    const client = new SNSClient();
    const input = {
      TopicArn: "arn:aws:sns:us-east-1:767397778099:outlook",
      Message: JSON.stringify(forecast),
    };
    const sendCommand = new PublishCommand(input);
    const response = await client.send(sendCommand);
    const sendMessage = response;
    return sendMessage;
    //return forecast;
  }
};
