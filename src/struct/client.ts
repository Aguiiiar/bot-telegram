import { Telegraf } from "telegraf";
import { env } from "../env";
import { CommandType } from "./command";
import { join } from "node:path";
import { existsSync, readdirSync } from "node:fs";

export class Client extends Telegraf {
  constructor() {
    super(env.TELEGRAM_BOT_TOKEN);
    this.loadCommands();
  }

  async launch() {
    await super.launch();
    console.log('[TELEGRAM] server started');
  }

  async loadCommands() {
    const commandsPath = join(__dirname, "..", "commands");

    if (!existsSync(commandsPath)) return;

    readdirSync(commandsPath).map((subFolder) => {

      readdirSync(join(commandsPath, subFolder))
        .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
        .forEach(async (fileName) => {
          const command: CommandType = (
            await import(`../commands/${subFolder}/${fileName}`)
          ).default;

          if (!command.name) return;

          this.command(command.name, command.execute);
        });
    });
  }
}
