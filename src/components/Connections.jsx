import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data?.data));
      console.log(res);
    } catch (err) {
      //Handle error
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10 ">
        <h1 className="font-bold text-xl">No Connections found</h1>
      </div>
    );
  }
  connections.map((item) => {
    return <p>{item.firstName}</p>;
  });

  return (
    <div className="text-center my-10 ">
      <h1 className="font-bold text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { age, gender, photoUrl, firstName, lastName, about } =
          connection;
        return (
          <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                alt="photo"
                src={photoUrl}
                className="w-20 h-10 rounded-full"
              />
            </div>
            <div className="text-left mx-5">
              <h1 className="font-bold">{firstName + " " + lastName}</h1>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
