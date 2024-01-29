import React, { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { IconButton, Stack, Typography } from '@mui/material';
import { PersonOutlined } from '@mui/icons-material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  selectPosts,
  setCurrentPost,
  setPosts,
} from '../../redux/notificationSlice';
import convertToFormattedDateString from '../../utils/dateUtils';
import { useAppDispatch } from '../../redux/store';
import { selectUserHasAdminRole } from '../../redux/userSlice';
import { API_BASE_URL } from '../../constants';

function Post() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAdmin = useSelector(selectUserHasAdminRole);
  const posts = useSelector(selectPosts);
  const { postId } = useParams();

  useEffect(() => {
    dispatch(setCurrentPost(posts?.find((post) => post.id === postId)));
  }, []);

  const currentPost = posts?.find((post) => post.id === postId);

  return currentPost ? (
    <Stack flexDirection="column" rowGap="16px" flexGrow={1}>
      {isAdmin && (
        <Stack
          flexDirection="row"
          gap="16px"
          sx={{
            position: 'absolute',
            bottom: '32px',
            right: '32px',
          }}
        >
          <IconButton
            size="large"
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1976d2',
              },
            }}
            onClick={() => {
              navigate(`/posts/${postId}/edit`);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="large"
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1976d2',
              },
            }}
            onClick={() => {
              const API_TOKEN = localStorage.getItem('token');

              axios
                .delete(`${API_BASE_URL}/posts/${postId}`, {
                  headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                  },
                })
                .then(() => {
                  axios
                    .get(
                      `${API_BASE_URL}/posts/all?pageNumber=1&pageSize=120`,
                      {
                        headers: {
                          Authorization: `Bearer ${API_TOKEN}`,
                        },
                      },
                    )
                    .then((response) => {
                      dispatch(setPosts(response.data.items));
                      navigate(`/posts/${response.data.items[0].id}`);
                    })
                    .finally(() => {});
                });
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      )}
      <Stack flexDirection="column" rowGap="4px">
        <Stack>
          <Typography sx={{ fontSize: '32px', fontWeight: 'bold' }}>
            {currentPost.title}
          </Typography>
        </Stack>
        <Stack flexDirection="row" columnGap="4px" alignItems="center">
          <PersonOutlined sx={{ fontSize: '20px', color: '#1976D2' }} />
          <NavLink to={`/user/${currentPost.author.id}`}>
            <Typography
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#1976D2' }}
            >
              {currentPost.author.username}
            </Typography>
          </NavLink>
        </Stack>
        <Stack>
          <Typography sx={{ fontSize: '16px' }}>
            {convertToFormattedDateString(currentPost.created)}
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
          {currentPost.description}
        </Typography>
      </Stack>
      <Stack
        flexGrow={1}
        overflow="auto"
        sx={{
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
        <Typography
          sx={{
            fontSize: '16px',
          }}
        >
          {currentPost.text}
        </Typography>
      </Stack>
    </Stack>
  ) : null;
}

export default Post;
