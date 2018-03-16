export class Folder {
  name: string;
  owner?: string;
  file?: [{
    displayName: string;
    uid: string;
  }];
  subFolders?: [{
    name: string;
    uid: string;
  }];
}
