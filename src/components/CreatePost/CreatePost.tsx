import React from 'react';
import { CircularProgress, Stack, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PostCreationProps } from '../../types';
import RoundedButton from '../CustomButton/RoundedButton';
import { selectCurrentPost, setPosts } from '../../redux/notificationSlice';
import { API_BASE_URL } from '../../constants';
import { useAppDispatch } from '../../redux/store';

function CreatePost({ isEditing }: PostCreationProps) {
  const post = useSelector(selectCurrentPost);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState(isEditing && post ? post.title : '');
  const [description, setDescription] = React.useState(
    isEditing && post ? post.description : '',
  );
  const [text, setText] = React.useState(isEditing && post ? post.text : '');

  const handleSumbit = () => {
    const API_TOKEN = localStorage.getItem('token');
    setIsLoading(true);

    if (isEditing) {
      axios
        .put(
          `${API_BASE_URL}/posts`,
          {
            postId: post?.id,
            title,
            description,
            text,
          },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          },
        )
        .then(() => {
          axios
            .get(`${API_BASE_URL}/posts/all?pageNumber=1&pageSize=120`, {
              headers: {
                Authorization: `Bearer ${API_TOKEN}`,
              },
            })
            .then((response) => {
              dispatch(setPosts(response.data.items));
              navigate(`/posts/${response.data.items[0].id}`);
            })
            .finally(() => {
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(
          `${API_BASE_URL}/posts`,
          {
            title,
            description,
            text,
          },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          },
        )
        .then(() => {
          axios
            .get(`${API_BASE_URL}/posts/all?pageNumber=1&pageSize=120`, {
              headers: {
                Authorization: `Bearer ${API_TOKEN}`,
              },
            })
            .then((response) => {
              dispatch(setPosts(response.data.items));
              navigate(`/posts/${response.data.items[0].id}`);
            })
            .finally(() => {
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return !isLoading ? (
    <Stack
      height="calc(100vh - 176px)"
      padding="16px"
      justifyContent="center"
      alignItems="center"
      overflow="auto"
      sx={{
        gap: '16px',
        lineBreak: 'anywhere',
        '&::-webkit-scrollbar': {
          width: '10px',
          backgroundColor: '#202020',
          borderRadius: '5px',
        },

        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#343434',
          borderRadius: '5px',
        },

        '&::-webkit-scrollbar-track': {
          backgroundColor: '#202020',
          borderRadius: '5px',
        },
      }}
    >
      <TextField
        fullWidth
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(event.target.value);
        }}
        label="Tytuł"
      />
      <TextField
        fullWidth
        value={description}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(event.target.value);
        }}
        label="Opis"
        multiline
        rows={5}
      />
      <TextField
        fullWidth
        value={text}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setText(event.target.value);
        }}
        label="Tekst"
        multiline
        rows={10}
      />
      <RoundedButton
        onClick={handleSumbit}
        text={isEditing ? 'Edytuj' : 'Utwórz'}
      />
    </Stack>
  ) : (
    <Stack flexGrow={1} justifyContent="center" alignItems="center">
      <CircularProgress size="160px" thickness={2} />
    </Stack>
  );
}

export default CreatePost;
