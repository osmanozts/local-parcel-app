import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabaseClient } from "../utils/supabase";
import { useRouter } from "expo-router";

interface AuthContextType {
  user: any;
  authRole: string | null;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [authRole, setAuthRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setUser(data.user);
      await fetchUserRole(data.user?.id ?? "");
      router.replace("/profile");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      setUser(null);
      setAuthRole(null);
      router.replace("/login");
    } catch (error) {
      console.error("Sign-out error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabaseClient
        .from("profile")
        .select("auth_role")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setAuthRole(data?.auth_role ?? "employee");
    } catch (error) {
      console.error("Error fetching user role:", error);
      setAuthRole(null);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const { data, error } = await supabaseClient.auth.getSession();
      if (data.session?.user) {
        setUser(data.session?.user);
        await fetchUserRole(data.session?.user.id);
      }
      if (error) console.error("Error fetching user:", error);
      setLoading(false);
    };

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });

    checkAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      router.replace("/");
    }
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ user, authRole, login, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
