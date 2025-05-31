import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

const Feed = () => {
  let feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      return navigate("/error");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[2]} isFeed={true} />
      </div>
    )
  );
};

export default Feed;
