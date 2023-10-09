import { TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { TurnContext, MessageFactory } from "botbuilder";
import fetch from 'node-fetch';

const API_KEY = "PBX4jgvfBkfvkwfZ9TqaabFbAMcHWyj7cJcEhrQg"; // Replace with your API key

export class RepeatCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "";

  async handleCommandReceived(
    context: TurnContext,
    message: any // You can adjust the type as needed
  ): Promise<string | Partial<any> | void> {
    console.log(`App received message: ${message.text}`);

    // Extract the message content to repeat
    const messageToRepeat = message.text.substring("repeat".length).trim();

    if (messageToRepeat) {
      try {
        // Make an API request with the API key in the headers and the message in the request body as JSON
        const response = await fetch(`https://ipkgze8213.execute-api.us-west-2.amazonaws.com/default/model_inference`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
          },
          body: JSON.stringify({ message: messageToRepeat })
        });
        console.log(JSON.stringify({ message: messageToRepeat }));

        // Convert the API response to JSON
        const responseData = await response.json();

        if (responseData) {
          const formattedResponse = `${responseData.body ? responseData.body
            .replace(/\\n/g, '')
            .replace(/<\/text>/g, '')
            .replace(/<text>/g, '')
            .replace(/<history>/g, '')
            .replace(/<\/history>/g, '')
            .replace(/- /g, '')
            .replace(/^"/, '').replace(/"$/, '')
           : 'N/A'}
            ${responseData.url ? responseData.url: ''}
          `;

          // Send the formatted API response data to the user
          await context.sendActivity(MessageFactory.text(formattedResponse));
        } else {
          // Send a message indicating that the response was empty or couldn't be formatted
          await context.sendActivity(MessageFactory.text("The API response is empty or could not be formatted properly."));
        }
      } catch (error) {
        console.error('Error making API request:', error);

        // Send an error message to the user
        await context.sendActivity(MessageFactory.text("An error occurred while making the API request."));
      }
    } else {
      // If no message to repeat, provide a help message
      await context.sendActivity(MessageFactory.text("Please provide a message to repeat after the 'repeat' command."));
    }
  }
}
