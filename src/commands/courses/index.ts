import { Command } from "../../struct/command";

export default new Command({
  name: 'cursos',
  async execute(ctx) {
    ctx.reply('cursos')
  } 
})