import { AmplifyGreetings } from '@aws-amplify/ui-react';

function StatusBar(user: any) {
  return (<AmplifyGreetings username={user.user.username} />);
}

export default StatusBar;