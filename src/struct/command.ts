import { Context } from "telegraf";

export type CommandType = {
  name: string;
  execute(ctx: Context): Promise<any>;
}

export class Command {
  constructor(options: CommandType) {
    Object.assign(this, options)
  }
}