import { useContext, useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { IUser } from '../../interfaces/IUser';
import { SeverityType } from '../Alert';
import { AuthContext } from '../../context/AuthContext';
import { UtilContext } from '../../context/UtilContext';

class listUserApi {
  users: IUser[] | undefined;
}

export default function UserListsBox() {
  const [allUsers, setAllUsers] = useState<IUser[]>();
  const { user } = useContext(AuthContext);
  const { callAlert } = useContext(UtilContext);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const payload = (await API.get('listUsersApi', '/users', {})) as listUserApi;
        setAllUsers(payload.users);
      } catch (error) {
        if (error instanceof Error)
          callAlert(true, error.message, SeverityType.error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div>
      {allUsers &&
        allUsers.map((iu: IUser) => {
          const preferredUsername = iu.Attributes.find(
            usr => usr.Name === 'preferred_username'
          );
          const email = iu.Attributes.find(usr => usr.Name === 'email');
          return (
            <div key={iu.Username}>
              {iu.Username !== user?.getUsername()
                ? `${preferredUsername?.Value} / ${email?.Value}`
                : 'You'}
            </div>
          );
        })}
    </div>
  );
}
