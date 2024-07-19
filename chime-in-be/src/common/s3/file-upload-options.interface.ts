export interface FileUploadOptions {
  // bucket or folder name
  bucket: string;
  // name of file
  key: string;
  file: Buffer;
}
