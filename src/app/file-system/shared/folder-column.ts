import {Column} from './column';
import {Folder} from './folder';

export class FolderColumn implements Column {
  main: Folder;
  displayName: string;

  constructor(main: Folder) {
    this.displayName = main.name;
    this.main = main;
  }
}
