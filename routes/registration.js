export async function signUserUp(supabase, email, password) {
  // if (userNotInDb(supabase, username)){
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      return data;
    } catch (error) {
      console.log("there was an error",error.message);
  }}
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