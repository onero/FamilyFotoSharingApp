import {Column} from './column';
import {Folder} from './folder';

export interface FolderColumn extends Column {
  main: Folder;
}
