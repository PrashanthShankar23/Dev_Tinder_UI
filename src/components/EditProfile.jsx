import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age ?? "");
  const [gender, setGender] = useState(user.gender ?? "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl ?? "");
  const [about, setAbout] = useState(user.about ?? "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(err.response?.data ?? "Something went wrong");
    }
  };
  return (
    <div>
      <div className="flex justify-center my-10 ">
        <div className="flex justify-center">
          <div className="card bg-neutral w-96 shadow-sm ">
            <div className="card-body ">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label my-2">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label my-2">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label my-2">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label my-2">
                    <span className="label-text">Gender</span>
                  </div>

                  <select
                    className="select select-bordered"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label my-2">
                    <span className="label-text">photoUrl</span>
                  </div>
                  <input
                    type="text"
                    className="input"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label my-2">
                    <span className="label-text">About You</span>
                  </div>
                  <textarea
                    type="text"
                    className="textarea"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, photoUrl, about }}
          isFeed={false}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
