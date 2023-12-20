export async function signUserUp(supabase, email, password, username) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: username,
      },
    },
  });
  if (error){     
    console.error('query error', error);
    throw error;
  }
  return data;
}
  // else{
  //   console.log("user already exists")
  // }};

export async function userNotInDb(supabase, username) {
const data  = await supabase
    .from('users')
    .select('name')
    .eq('name', username)
    console.log(data)
if (data.length > 0){
    throw new Error("user already exists")
} else{
    return true;
}};