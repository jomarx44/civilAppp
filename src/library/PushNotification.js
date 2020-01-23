import { Permissions, Notifications } from 'expo';
const PUSH_ENDPOINT = "https://demoapi.coindrop.com.ph/api/v1/users/iidtoken";
import { AsyncStorage } from 'react-native';

export default async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );

  let finalStatus = existingStatus;
  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let push_token = await Notifications.getExpoPushTokenAsync();

  const token = await AsyncStorage.getItem('USER_TOKEN');

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify({
      iid_token: push_token,
    }),
  });
}
