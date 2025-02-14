type ParsedCommand = Record<string, string[]>

export class CommandParser {
  static parse(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let currentComand = '';

    for (const argument of cliArguments) {
      if (argument.startsWith('--')) {
        parsedCommand[argument] = [];
        currentComand = argument;
      } else if (currentComand && argument) {
        parsedCommand[currentComand].push(argument);
      }
    }

    return parsedCommand;
  }
}
