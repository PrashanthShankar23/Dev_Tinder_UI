import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionSlice";

const imageUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAACUCAMAAAD4QXiGAAAAMFBMVEXm5uampqagoKDW1tajo6Pp6enj4+Oqqqqtra2xsbHe3t7MzMzT09PAwMDJycm8vLyda8pFAAADr0lEQVR4nO2c25KDIAxARQiKePn/v120te1uWxchF5zhPO3s05lMgBBim6ZSqVQqlUqlUqlUKpXLA4Hff1yB4DpoP03LyjR5PVzCPjiOk+s6pcwNpbrOTWNTvPy4mDbY/iH8bxml1Q6AwfcftHf53g9lxh3s7Mw3783duNmW5w6gj73v7rq0fAc7qf+8N3c1lRV20H2M9+be64LUwUcFfA+7L0d9/jfDf6mbWVp4ZzrjvblP0so3TosXog5ze1pcqXYWz3XwKeJBXXqZgu7O58qK6WQ3R2hcmnhQd42oesLqfKhLrtKQK8nioW6XzJfkXNmC7sS8YUzbV3baUSrokJMrK52QOei8kIegC2U6uExxpZyIOehscaVEgg4Ze/mOmSTMbdaWeDd3ll887xTaETmNPIK4Up5fPKdkeSJRvNgFxXzhT/Qhuk9xaN4P7OYYu/mK5jfHCHkIOr95Zp240/I3pxNvzm/m/Nsiljl/vyupzVKEec0WfvMRaVfk31uuu58PGEVuKHP5T3+Mi4XM1eK6tWIzo5gLPLzAiCCulECbCzAK9FCeC9xDMRJdJM3XR9B8ZN5cbP6O3kmEHKPJJdPiCtjsXq5MyEPQM9eoWcSeW4bMmPPXLDuQdY4ayXfoIaPsMk4u5JklgNj71k09eWcU2xEf6on5YmSeiF7NbVLhZXr5QbSkaQvpSYtk9TLEE9RLEV8vGaeWadjICxFfl+mJCibcJooR36aJI2ctjSptqjgyY0rKlCcR6oLDOF8AOy6Rs9DLWFC2QONd9EixUc7LTs09gTHe++4+ljA/H5bm128rvrq38gsVrD81wf1wN1423UEnX6LNIlkCgM/oLZpebqg4t1Uk1bUA67I7RU4i2U8WiF+iLrDHoIhLqMOQODH/pt7xqqOJc6ujvLQ81DlfXHBy/KHO2KZDGfh7Ueca/cvr4H5U5+nqwoAzH/JKy5LqtkcXV6rneHdBTvIbDKmOMwL9Dn3bC2fE4h3612ik8a13qAe6LNqp/xdD+x6d9jFoHMSfjJJ5rxB6U4acNugkh9ATuuMIZaLlCLpmANFevmMWIm/U+8RHc7I7hqcVD+pEpxHVwf9iTlQCIE3iHkE0pYs0t30EzUw37TF0g+YwSp2qOAPNBIalFw/qFEuU4OL8TkuwRHM/7o80JxiR4ligNEs0d6wyDopnDISv+2Mg2FyyfwoiDoofjGARJ7nSXdecY4GGJYovznKEkhyituWB4PjXPOCLVyqVSqVCwg8lNTLF1n5W7AAAAABJRU5ErkJggg==";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      return navigate("/login");
    } catch (err) {
      //redirect to error page
      console.error();
    }
  };
  return (
    <div className="navbar bg-neutral shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          👨‍💻👩‍💻 DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <div className="form-control flex items-center">
            Welcome, {user.firstName}
          </div>
          <div className="dropdown dropdown-end mx-6">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl ?? imageUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
