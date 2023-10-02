import axios from 'axios';
import { PresignedUrl, UpdateUserProfile } from '../type/upload.type';
const apiServer = 'http://localhost:5001';
import { UploadFile } from '../type/upload.type';
// import.meta.env

export async function getPresignedUrl({ key, type }: PresignedUrl) {
  return axios({
    method: 'post',
    url: `${apiServer}/upload/signedUrlS3`,
    data: {
      key,
      type,
    },
  });
}

export async function uploadFile({ file, signedRequest }: UploadFile) {
  return axios({
    data: file,
    headers: {
      ['Content-Type']: file.type,
    },
    method: 'PUT',
    url: signedRequest,
  });
}

export async function getUserDetails({ id }: { id: string }) {
  return axios({
    method: 'get',
    url: `${apiServer}/users/${id}`,
  });
}

export async function updateUserById({ id, data }: UpdateUserProfile) {
  return axios({
    method: 'put',
    url: `${apiServer}/users/${id}`,
    data,
  });
}
