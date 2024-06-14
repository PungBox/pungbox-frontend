import React, { SetStateAction, createContext, useContext, useState } from 'react';

const AuthContext = createContext<{
  bucketId: string | null;
  setBucketId: React.Dispatch<SetStateAction<string | null>>;
}>({
  bucketId: null,
  setBucketId: () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [bucketId, setBucketId] = useState<string | null>('001bc76f-436f-4a7e-a1a0-e1ed389e9262');

  return <AuthContext.Provider value={{ bucketId, setBucketId }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
