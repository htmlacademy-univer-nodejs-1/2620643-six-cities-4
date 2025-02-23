import axios from 'axios';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { Command } from './command.interface.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/tsv-file-writer.js';
import { getErrorMessage } from '../../shared/helpers/common.js';

export class GenerateCommand implements Command{
  private initialData!: MockServerData;

  private async load(url: string){
    try{
      const {data} = await axios.get(url);
      this.initialData = data;
    }catch{
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number){
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvOfferWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++){
      await tsvOfferWriter.write(tsvOfferGenerator.generate());
    }

  }

  getName(): string {
    return '--generate';
  }

  public async execute(...parametrs: string[]): Promise<void> {
    const [count, filepath, url] = parametrs;
    const offerCount = Number(count);

    try{
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch(error){
      console.error('Can\'t generate data');

      console.log(getErrorMessage(error));
    }
  }
}
