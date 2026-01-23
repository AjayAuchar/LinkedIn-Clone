import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Home, LogOut, User, Users } from "lucide-react";
import { checkAuthUser } from "../../utils/helper";
import toast from "react-hot-toast";

const Navbar = () => {
  const authUser = useSelector((state) => state.globalData.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);

  const getNotifications = async () => {
    if (authUser) {
      try {
        const response = await axiosInstance.get("/notifications");
        // console.log(response);
        setNotifications(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getConnectionRequests = async () => {
    if (authUser) {
      try {
        const response = await axiosInstance.get("/connections/requests");
        // console.log(response.data);
        setConnectionRequests(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      toast.error(response.data.message || "Something went wrong.");

      console.log(response);
      await checkAuthUser(dispatch);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const unreadNotificationCount = notifications?.data?.filter(
    (notif) => !notif.read,
  ).length;
  const unreadConnectionRequestsCount = connectionRequests?.data?.length;

  useEffect(() => {
    if (!authUser) return;

    const fetchData = async () => {
      await getNotifications();
      await getConnectionRequests();
    };

    fetchData();
  }, [authUser]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img
                className="h-8 rounded"
                src="/small-logo.png"
                alt="LinkedIn"
              />
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-6">
            {authUser ? (
              <>
                <Link
                  to={"/"}
                  className="text-neutral flex flex-col items-center"
                >
                  <Home size={20} />
                  <span className="text-xs hidden md:block">Home</span>
                </Link>
                <Link
                  to="/network"
                  className="text-neutral flex flex-col items-center relative"
                >
                  <Users size={20} />
                  <span className="text-xs hidden md:block">My Network</span>
                  {unreadConnectionRequestsCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center"
                    >
                      {unreadConnectionRequestsCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/notifications"
                  className="text-neutral flex flex-col items-center relative"
                >
                  <Bell size={20} />
                  <span className="text-xs hidden md:block">Notifications</span>
                  {unreadNotificationCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center"
                    >
                      {unreadNotificationCount}
                    </span>
                  )}
                </Link>
                <Link
                  to={`/profile/${authUser.username}`}
                  className="text-neutral flex flex-col items-center"
                >
                  <User size={20} />
                  <span className="text-xs hidden md:block">Me</span>
                </Link>
                <button
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
                  onClick={() => logout()}
                >
                  <LogOut size={20} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Join now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
