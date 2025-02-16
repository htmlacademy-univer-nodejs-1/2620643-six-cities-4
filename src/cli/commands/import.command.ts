import chalk from 'chalk';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName() {
    return '--import';
  }

  public execute(...parametrs: string[]): void {
    const [filename] = parametrs;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      const resultArray = fileReader.toArray();
      console.log(chalk.blue(JSON.stringify(resultArray, null, 2)));
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error('Cant import from this file');
      console.error(`Details: ${err.message}`);
    }
  }
}
