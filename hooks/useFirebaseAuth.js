import { useState, useEffect } from 'react'

import fire from '../config/fire-config';


const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return;
    }

    setLoading(true)
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);    
    setLoading(false);
  };

// listen for Firebase state change
  useEffect(() => {
    const unsubscribe = fire.auth().onAuthStateChanged(authStateChanged);
    console.log('in here')
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading
  };
}