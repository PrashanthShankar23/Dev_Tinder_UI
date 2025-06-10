import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import Error from "./Error";

const Feed = () => {
  let feed = useSelector((store) => store.feed);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (isError) {
    return <Error message={"Error! Unable to load feed"} />;
  }
  if (!feed) return;

  if (feed && feed.length === 0) {
    return (
      <div className="flex justify-center my-10 ">
        <h1 className="font-bold text-xl text-pink">No New Users found!</h1>
      </div>
    );
  }
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} isFeed={true} />
      </div>
    )
  );
};

export default Feed;
