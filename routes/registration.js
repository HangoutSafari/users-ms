import router from "../../api-gateway/code/routes";
import { postAuthDetails } from "../controllers/usersViaSupabase";
import express from "express";

const express = require('express');
router = express.Router();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  export function signUserUp(data) {
    // try{
// extract data from data object
    const {username, email, password} = data;

    supabase.auth.signUp({ email, password });
    supabase
        .from('users')
        .insert([
          { id: user.id, name: username },
        ]);


    // } catch (error) {
    //   res.status(500).send("there was an error in signing up");
    // }
   };
  


// async function isUserInDatabase(username, email, res) {
// const data  = await supabase
//     .from('users')
//     .select('username, email')
//     .eq('username', username)
//     .eq('email', email);
// if (data && data.length > 0){
//     console.log("User already exists");
//     res.status(400).send("User already exists");
//     return false
// } else{
//     console.log("User does not exist");
//     res.status(200).send("User does not exist");
//     return true;
// }};

// async function hashPassword(password) {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     return hashedPassword;
// }

// async function instertToDatabase(username, email, password) {
//     const hashedPassword = await hashPassword(password);
//     const data = await supabase
//     .from('users')
//     .insert([
//         { username: username, email: email, password: password },
//     ]);
//     console.log("User inserted");
//     return data;
// }

// router.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;
//         const userExists = await isUserInDatabase(username, email, res);
//         if (!userExists) {
//             const result = await instertToDatabase(username, email, password);
//             res.status(200).json(result);
//         }
//     });