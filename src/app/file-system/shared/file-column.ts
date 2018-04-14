import {File} from './file';
import {Column} from './column';

export class FileColumn implements Column {
  file: File;
  url: string;
  displayName: string;

  constructor(displayName: string, file: File, url: string) {
    this.displayName = displayName;
    this.file = file;
    this.url = url;
  }
}
