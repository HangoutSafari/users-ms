import { getUsersData, getUserIdData, getAnimalsByUserId } from "../adapters/supabaseAdapter.js";

export async function getUsers(req, res) {
  try {
    const data = await getUsersData();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(`error in viaSupabase: ${err}`);
  }
}

export async function getUserId(req, res) {
  try {
    const UserId = parseInt(req.params.number);
    const users = await getUserIdData(UserId);
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getUserAnimals(req, res) {
  try {
    const userId = parseInt(req.params.userId);
    const animals = await getAnimalsByUserId(userId);
    res.json(animals);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function postAuthDetails(req, res) {
  const userData = req.body;
  console.log(userData);
  console.log(userData);
  console.log(userData);
  console.log(userData);
 return res.status(200).json({ message: "Registration successful", userData })
 };


// Register user using Supabase Auth
// const { user, error } = await supabaseAuth.auth.signUp({
//   username,
//   email,
//   password,