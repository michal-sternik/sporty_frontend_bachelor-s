import { IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect } from 'react';
import { PersonOutlined } from '@mui/icons-material';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../constants';
import { useAppDispatch } from '../../redux/store';
import { selectPosts, setPosts } from '../../redux/notificationSlice';
import { selectUserHasAdminRole } from '../../redux/userSlice';
import { convertError } from '../../utils/errorHandleUtils';
import zpiApi from '../../api';

function Posts() {
  const posts = useSelector(selectPosts);
  const isAdmin = useSelector(selectUserHasAdminRole);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const API_TOKEN = localStorage.getItem('token');
    try {
      zpiApi
        .get(`${API_BASE_URL}/posts/all?pageNumber=1&pageSize=120`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        })
        .then((response) => {
          dispatch(setPosts(response.data.items));
          navigate(`/posts/${response.data.items[0].id}`);
        });
    } catch (e: any) {
      convertError(e);
    }
  }, []);

  return (
    <Stack
      columnGap="16px"
      rowGap="16px"
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        height: '100%',
        backgroundColor: '#202020',
        padding: '16px',
      }}
    >
      {isAdmin && (
        <IconButton
          onClick={() => navigate('/posts/create')}
          size="large"
          sx={{
            position: 'absolute',
            bottom: '32px',
            left: '32px',
            zIndex: 3,

            backgroundColor: '#1976d2',

            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          <AddIcon />
        </IconButton>
      )}
      <Stack
        flexDirection={{ xs: 'row', md: 'column' }}
        rowGap="16px"
        columnGap="16px"
        sx={{
          overflowY: 'auto',
          backgroundColor: '#2C2C2C',
          minWidth: { xs: '100%', md: '320px' },
          width: { xs: '100%', md: '320px' },
          height: { xs: '140px', md: 'calc(100vh - 112px)' },
          minHeight: '140px',
          borderRadius: '5px',
          padding: '16px',
          '&::-webkit-scrollbar': {
            height: '10px',
            backgroundColor: '#202020',
            borderRadius: '5px',
            width: '10px',
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
        {posts?.map((post) => {
          return (
            <Stack
              flexDirection="column"
              rowGap="8px"
              sx={{
                minWidth: { xs: '200px', md: '100%' },
                maxWidth: { xs: '200px', md: '100%' },
                border: '2px solid #1976D2',
                borderRadius: '16px',
                padding: '16px',
              }}
              key={post.id}
            >
              <Stack>
                <NavLink to={`/posts/${post.id}`}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: '#FFFFFF',
                    }}
                  >
                    {post.title}
                  </Typography>
                </NavLink>
              </Stack>
              <Stack flexDirection="row" columnGap="4px" alignItems="center">
                <PersonOutlined sx={{ fontSize: '20px', color: '#1976D2' }} />
                <NavLink to={`/user/${post.author.id}`}>
                  <Typography
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: '#1976D2',
                      fontWeight: 'bold',
                    }}
                  >
                    {post.author.username}
                  </Typography>
                </NavLink>
              </Stack>
              <Stack sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {post.description}
                </Typography>
              </Stack>
              <Stack sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {post.text}
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
      <Stack
        flexGrow={1}
        sx={{
          backgroundColor: '#2C2C2C',
          borderRadius: '5px',
          padding: '32px',
        }}
      >
        <Outlet />
      </Stack>
    </Stack>
  );
}

export default Posts;
