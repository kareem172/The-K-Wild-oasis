import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

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

export async function updateUserData({ fullName, password, avatar }) {
  if (!fullName && !password && !avatar) return;
  let updatedUser = {};
  if (fullName) updatedUser = { data: { fullName } };
  if (password) updatedUser = { password };

  const { data, error } = await supabase.auth.updateUser(updatedUser);

  if (error) {
    console.error(error);
    throw new Error("Update user data failed", error);
  }

  if (!avatar) return data;

  const fileName = `avatars-${data.user.id}-${Math.random()}`;

  const { data: storageData, error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) {
    console.error(storageError);
    throw new Error("Upload avatar failed", storageError);
  }

  const { data: updateData, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) {
    console.error(updateError);
    throw new Error("Update avatar failed", updateError);
  }

  return updateData;
}
