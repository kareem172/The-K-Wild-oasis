import supabase from "./supabase";

export async function signup({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });
  if (error) {
    console.error(error);
    throw new Error("Signup failed", error);
  }
  return data;
}
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error);
    throw new Error("Login failed", error);
  }
  return data;
}
export async function getCurrentUser() {
  let { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  let { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
    throw new Error("Login failed", error);
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error("Logout failed", error);
  }
}
