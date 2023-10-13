import './App.css';
import { Avatar, Button, Upload } from 'antd';
import type { RcFile } from 'antd/lib/upload';
import {
  getPresignedUrl,
  getUserDetails,
  updateUserById,
  uploadFile,
} from './apis/uploadApi';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { UserOutlined } from '@ant-design/icons';
import { UpdateUserProfile } from './type/upload.type';

function App() {
  const queryClient = useQueryClient();
  const USER_DETAIL_ID = 'clno3wqln0000mgso9a8p76pn';
  const { data } = useQuery('userDetail', () =>
    getUserDetails({ id: USER_DETAIL_ID })
  );
  const updateUserProfile = useMutation({
    mutationFn: (data: UpdateUserProfile) => updateUserById(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userDetail'] });
    },
  });

  const userDetails = data?.data;

  const handleUpload = async ({
    file,
  }: {
    file: string | Blob | RcFile | File;
  }) => {
    try {
      const { data } = await getPresignedUrl({
        key: (file as File).name,
        type: (file as File).type,
      });

      const uploadUrl = data?.signedRequest;
      const url = data?.url;
      if (uploadUrl) {
        await uploadFile({
          file: file as Blob,
          signedRequest: data?.signedRequest,
        });
        updateUserProfile.mutate({
          id: USER_DETAIL_ID,
          data: {
            avatarURL: url,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <b>Profile detail</b>
      <p>first name: {userDetails?.firstName}</p>
      <p>last name: {userDetails?.lastName}</p>
      <p>email: {userDetails?.email}</p>
      <p>phone: {userDetails?.phoneNumber}</p>
      <p>Avatar:</p>
      <div>
        <Avatar
          alt="image"
          size={300}
          src={userDetails?.avatarURL}
          style={{ marginRight: '20px' }}
          icon={<UserOutlined />}
        />
        <Upload
          accept="image/*"
          customRequest={handleUpload}
          showUploadList={false}
          progress={{
            showInfo: false,
            strokeWidth: 4,
          }}
        >
          <Button>Update Avatar</Button>
        </Upload>
        <br />
      </div>
    </div>
  );
}

export default App;
