"use client";

import { Text } from "@atoms/Text";

const Home = () => {
  const get = async () => {
    try {
      const data = await fetch("/api/auth");
      console.log(data);
    } catch (error) {
      console.error("Error fetching: ", error);
      return null;
    }
  };
  return (
    <main>
      <Text>{"Flippo project!"}</Text>
      <button onClick={get}>{"wipe check"}</button>
      <a href='https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost:3030%2Fapi%2Fauth&prompt=consent&response_type=code&client_id=56332811871-78hk7pi2gn9fi4aqlhtoidhtr464oagu.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&access_type=offline'>
        Ну давай, работай!
      </a>
    </main>
  );
};

export default Home;
