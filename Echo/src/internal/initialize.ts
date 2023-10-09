import { HelloWorldCommandHandler } from "../helloworldCommandHandler";
import { BotBuilderCloudAdapter } from "@microsoft/teamsfx";
import ConversationBot = BotBuilderCloudAdapter.ConversationBot;
import config from "./config";
import { RepeatCommandHandler } from "../repeatCommandHandler";

// Create the command bot and register the command handlers for your app.
// You can also use the commandApp.command.registerCommands to register other commands
// if you don't want to register all of them in the constructor
export const commandApp = new ConversationBot({
  // The bot id and password to create CloudAdapter.
  // See https://aka.ms/about-bot-adapter to learn more about adapters.
  adapterConfig: {
    MicrosoftAppId: config.botId,
    MicrosoftAppPassword: config.botPassword,
    MicrosoftAppType: "MultiTenant",
  },
  command: {
    enabled: true,
    commands: [new HelloWorldCommandHandler(), new RepeatCommandHandler()],
  },
});

// import { HelloWorldCommandHandler } from "../helloworldCommandHandler";
// import { BotBuilderCloudAdapter } from "@microsoft/teamsfx";
// import { RepeatCommandHandler } from "../repeatCommandHandler"; // Import the RepeatCommandHandler
// import config from "./config";

// // Create the command bot and register the command handlers for your app.
// // You can also use the commandApp.command.registerCommands to register other commands
// // if you don't want to register all of them in the constructor
// export const commandApp = new ConversationBot({
//   // The bot id and password to create CloudAdapter.
//   // See https://aka.ms/about-bot-adapter to learn more about adapters.
//   appId: config.botId,
//   appPassword: config.botPassword,
//   appType: "MultiTenant",
// }).createBot<HelloWorldCommandHandler, RepeatCommandHandler>(
//   [HelloWorldCommandHandler, RepeatCommandHandler] // Register both command handlers here
// );

