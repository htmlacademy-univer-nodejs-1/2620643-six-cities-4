export type Command = {
  getName(): string;
  execute(...parametrs: string[]) : void;
}
