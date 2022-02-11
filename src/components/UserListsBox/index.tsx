import { useContext, useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { SeverityType } from '../Alert';
import { AuthContext } from '../../context/AuthContext';
import { UtilContext } from '../../context/UtilContext';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { Person } from '@mui/icons-material';
import styles from '../../styles/ChatBox.module.css';

export default function UserListsBox() {
  const [allUsers, setAllUsers] = useState<User[]>();
  const { user } = useContext(AuthContext);
  const { callAlert } = useContext(UtilContext);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const payload = (await API.get(
          'listUsersApi',
          '/users',
          {}
        )) as ListUserApi;
        setAllUsers(payload.users);
      } catch (_) {
        callAlert(true, 'Something went wrong!!!', SeverityType.error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <List key="footer" dense={true}>
      {allUsers &&
        allUsers.map((iu: User) => {
          const preferredUsername = iu.Attributes.find(
            (usr) => usr.Name === 'preferred_username'
          );
          return (
            <ListItem key={iu.Username}>
              <ListItemAvatar className={styles.userList}>
                <Avatar>
                  <Person color="primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  `${preferredUsername?.Value}` +
                  (iu.Username === user?.getUsername() ? ' (You)' : '')
                }
              />
            </ListItem>
          );
        })}
    </List>
  );
}

type ListUserApi = {
  users: User[] | undefined;
};

type User = {
  Attributes: [
    {
      Name: string;
      Value: string;
    }
  ];
  Username: string;
};
