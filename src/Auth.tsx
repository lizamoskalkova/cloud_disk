import { ApiError, Provider, Session, User } from "@supabase/supabase-js";
import React, { useContext, useState, useEffect } from "react";
import { supabaseClient } from "./Supabase";

interface AuthContextValue {
  signUp: (data: any) => Promise<{
    user: User | null;
    session: Session | null;
    error: ApiError | null;
  }>;
  signIn: (data: any) => Promise<{
    session: Session | null;
    user: User | null;
    provider?: Provider;
    url?: string | null;
    error: ApiError | null;
  }>;
  signOut: () => Promise<{
    error: ApiError | null;
  }>;
  user?: User | null;
}
const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabaseClient.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);
    
    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const value = {
    signUp: (data) => supabaseClient.auth.signUp(data),
    signIn: (data) => supabaseClient.auth.signIn(data),
    signOut: () => supabaseClient.auth.signOut(),
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext) as AuthContextValue;
