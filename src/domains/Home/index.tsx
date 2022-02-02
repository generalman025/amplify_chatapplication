import { withAuthenticator, Grid, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const Home = () => {
  return (
    <Grid
      templateColumns="1fr 1fr"
      templateRows="10rem 10rem"
      gap="var(--amplify-space-small)"
    >
      <View
        columnSpan={2}
        backgroundColor="var(--amplify-colors-blue-10)"
      ></View>
      <View backgroundColor="var(--amplify-colors-blue-40)"></View>
      <View backgroundColor="var(--amplify-colors-blue-60)"></View>
    </Grid>
  );
};

export default withAuthenticator(Home);
