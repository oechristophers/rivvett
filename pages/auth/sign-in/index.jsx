import React from 'react';
import SignInPage from './signInPage';
export default function Index() {
  return <SignInPage />;
}

// export async function getServerSideProps(context) {
//   const isAuthenticated = await checkIsAuthenticated();

//   if (isAuthenticated) {
//     return {
//       redirect: {
//         destination: '/', // Redirect to the appropriate page if authenticated
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {}, // Pass props to the SignInPage if necessary
//   };
// }
