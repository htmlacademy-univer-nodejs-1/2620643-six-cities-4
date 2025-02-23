import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Command } from './command.interface.js';
import { createOffer } from '../../shared/helpers/offer.js';
import { getErrorMessage } from '../../shared/helpers/common.js';

export class ImportCommand implements Command {
  public getName() {
    return '--import';
  }

  private onImportedLine(line: string){
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number){
    console.info(`${count} rows imported.`);
  }

  public execute(...parametrs: string[]): void {
    const [filename] = parametrs;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err) {
      console.error('Cant import from this file');
      console.error(getErrorMessage(err));
    }
  }
}
