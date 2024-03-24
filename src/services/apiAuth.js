import supabase from "./supabase";

// Params:
// - fullName: String - The full name of the user
// - email: String - The email address of the user
// - password: String - The password for the user's account
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // In the data property additional information about the user can be added
    options: {
      data: {
        fullName,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

// Params:
// - email: String - The email address of the user
// - password: String - The password for the user's account
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  // To check if there is a current user
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

// Params:
// - password: String - The new password for the user's account
// - fullName: String - The new full name of the user
export async function updateCurrentUser({ password, fullName }) {
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  return data;
}

// Params:
// - password: String - The password for the user's account
export async function deleteAccount(password) {
  // The stored procedure verifies whether the provided password matches the one associated with the currently logged-in user
  // It enables the user to delete their account securely
  // For detailed explanations of the stored procedure, refer to the documentation file: "storedProcedures.md"
  const { data, error } = await supabase.rpc("verify_user_password", {
    password,
  });

  if (error) throw new Error(error.message);

  if (!data) throw new Error("Provided password is incorrect");

  // For detailed explanations of the stored procedure, refer to the documentation file: "storedProcedures.md"
  const { error: errorDelete } = await supabase.rpc("delete_user");

  if (errorDelete) throw new Error(errorDelete.message);

  const { error: errorSignOut } = await supabase.auth.signOut();

  if (errorSignOut) throw new Error(errorSignOut.message);
}
