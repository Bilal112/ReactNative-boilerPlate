import { Alert } from 'react-native';
// import { API_URL } from './Config';

async function GetAllUsersWithGender(gender: String) {
  const response = await fetch(
    `https://onlinedemolink.com/custom_live/test-apis/api/users/${gender}`
  );
  const data = await response.json();
  return data;
}

async function LikeAndDislike(action: String,user:String) {
  const response = await fetch(
    `https://onlinedemolink.com/custom_live/test-apis/api/action/${action}/${user}`,
    {
        method:'POST',
    }
  );
  const data = await response.json();
  return data;
}

//  async function fetchPublishableKey(
//   paymentMethod?: string
// ): Promise<string | null> {
//   try {
//     const response = await fetch(
//       // `${API_URL}/stripe-key?paymentMethod=${paymentMethod}`
//     );

//     const { publishableKey } = await response.json();

//     return publishableKey;
//   } catch (e) {
//     console.warn('Unable to fetch publishable key. Is your server running?');
//     Alert.alert(
//       'Error',
//       'Unable to fetch publishable key. Is your server running?'
//     );
//     return null;
//   }
// }
export { GetAllUsersWithGender ,LikeAndDislike};




