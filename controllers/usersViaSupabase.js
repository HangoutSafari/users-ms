import { getUsersData, getUserIdData, getAnimalsByUserId, handleUser, getFriendsForUser, getEventsOfUser, getEvent } from "../adapters/supabaseAdapter.js";
import { getAuthDataFrom, getServiceFunction, getDataFrom, getDataWithFunction } from "../dbHelper.js";
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
    let detailedFriends = { 'id': null }
    if (friendsData.friends != null) {

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


export async function postAuthDetails(req, res) {
  const userData = req.body;
  try {
    const value = await handleUser(userData)
    res.status(200).json({ message: "Registration successful", data: value })
  }
  catch (err) {
    res.status(500).send(err.message);
  }
};


export async function getUserEvents(req, res) {
  try {
    const userId = parseInt(req.params.userId);
    const userEvents = await getEventsOfUser(userId);

    for (let i = 0; i < userEvents.length; i++) {
      const event = await getEvent(userEvents[i].event_id);
      userEvents[i].event_id = event;
    }

    res.json(userEvents);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getUserDashboard(req, res) {
  getServiceFunction(req, res, "get_user_dashboard", "given_id", req.params.id);
}

export async function getAnimalDashboard(req, res) {
  getServiceFunction(req, res, "get_animal_dashboard", "given_id", req.params.id);
}

export async function getFeed(req, res) {
  getServiceFunction(req, res, "get_feed");
}