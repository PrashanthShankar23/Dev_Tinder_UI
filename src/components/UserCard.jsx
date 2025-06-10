import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCard = ({ user, isFeed }) => {
  const { _id, age, gender, photoUrl, about, firstName, lastName } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + id,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(id));
    } catch (error) {}
  };
  return (
    <div className="card bg-base-300 w-80 shadow-sm">
      <figure>
        <img src={photoUrl} className="w-80 h-80" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>

        {isFeed && (
          <div className="card-actions justify-between my-4">
            <button
              className="btn btn-error w-30"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary w-30"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
