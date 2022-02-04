import { useContext, useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { IUser } from '../../interfaces/IUser';
import { SeverityType } from '../Alert';
import { AuthContext } from '../../context/AuthContext';

type ChatBoxProps = {
  callAlert: (
    showAlert: boolean,
    alertMessage: string,
    severity: SeverityType
  ) => void;
};

export default function UserListsBox({ callAlert }: ChatBoxProps) {
  const [allUsers, setAllUsers] = useState<IUser[]>();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const users = (await API.get('listUsersApi', '/users', {})) as any;
        setAllUsers(users['users']);
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
        allUsers.map((u: IUser) => {
          const preferredUsername = u.Attributes.find(
            (u) => u.Name === 'preferred_username'
          );
          const email = u.Attributes.find((u) => u.Name === 'email');
          return (
            <div key={u.Username}>
              {(user as any).username !== u.Username
                ? `${preferredUsername?.Value} / ${email?.Value}`
                : 'You'}
            </div>
          );
        })}
    </div>
  );
}
