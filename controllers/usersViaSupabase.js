import { getUsersData, getUserIdData, getAnimalsByUserId, getFriendsForUser } from "../adapters/supabaseAdapter.js";

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

export async function getFriends(req, res) {
  try {
    const userId = parseInt(req.params.userId);
    const friendsData = await getFriendsForUser(userId);
    
    console.log(friendsData.friends);
    let detailedFriends = {'id':null}
    if(friendsData.friends != null){

      const friendKeys = Object.keys(friendsData.friends);
      
      detailedFriends = await Promise.all(
        friendKeys.map(async (friendKey) => await getUserIdData(friendKey))
        );
      }
     
    res.json(detailedFriends);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
