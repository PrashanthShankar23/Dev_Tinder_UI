import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(id));
    } catch (err) {}
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data?.data));
    } catch (err) {
      //catch err
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) {
    return (
      <div className="flex justify-center my-10 ">
        <h1 className="font-bold text-xl">No Connection Requests found</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10 ">
      <h1 className="font-bold text-3xl">Requests</h1>
      {requests.map((request) => {
        const { _id, age, gender, photoUrl, firstName, lastName, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                src={photoUrl}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-5">
              <h1 className="font-bold">{firstName + " " + lastName}</h1>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>

            <div className="card-actions justify-between my-4">
              <button
                className="btn btn-primary w-30 "
                onClick={() => reviewRequest("accepted", _id)}
              >
                Accept
              </button>
              <button
                className="btn btn-error w-30"
                onClick={() => reviewRequest("rejected", _id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
