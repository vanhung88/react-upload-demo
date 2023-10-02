export interface PresignedUrl {
  key: string;
  type: string;
}

export interface UploadFile {
  file: Blob;
  signedRequest: string;
  onUploadProgress?: (percent: number) => void;
}

export interface UpdateUserProfile {
  id: string;
  data: {
    avatarURL: string;
  };
}
