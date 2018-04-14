export interface File {
  uid: string;
  created?: string;
  fileName?: string;
  mimeType?: string;
  size?: number;
  displayName: string;
  owner?: string;
}
