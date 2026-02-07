import React from "react";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Check, Clock, UserCheck, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

const RecommendedUser = ({ user }) => {
  const [requestStatus, setRequestStatus] = useState(null);

  const connectionStatus = async () => {
    try {
      const statusRes = await axiosInstance.get(
        `/connections/status/${user?._id}`,
      );
      setRequestStatus(statusRes);
    } catch (error) {
      console.error("Error fetching connection status:", error);
    }
  };

  const sendConnectionRequest = async () => {
    try {
      const conReq = await axiosInstance.post(
        `/connections/request/${user?._id}`,
      );
      toast.success("Connection request sent successfully");
      connectionStatus();
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      const acceptReq = await axiosInstance.put(
        `/connections/accept/${requestId}`,
      );
      toast.success("Connection request accepted");
      connectionStatus();
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      const rejectReq = await axiosInstance.put(
        `/connections/reject/${requestId}`,
      );
      toast.success("Connection request rejected");
      connectionStatus();
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  };

  const renderButton = () => {
    switch (requestStatus?.data?.status) {
      case "pending":
        return (
          <button
            className="px-3 py-1 rounded-full text-sm bg-yellow-500 text-white flex items-center cursor-pointer"
            disabled
          >
            <Clock size={16} className="mr-1" />
            Pending
          </button>
        );
      case "received":
        return (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => acceptRequest(requestStatus?.data?.requestId)}
              className={`rounded-full p-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white cursor-pointer`}
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => rejectRequest(requestStatus?.data?.requestId)}
              className={`rounded-full p-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white cursor-pointer`}
            >
              <X size={16} />
            </button>
          </div>
        );
      case "connected":
        return (
          <button
            className="px-3 py-1 rounded-full text-sm bg-green-500 text-white flex items-center"
            disabled
          >
            <UserCheck size={16} className="mr-1" />
            Connected
          </button>
        );
      default:
        return (
          <button
            className="px-3 py-1 rounded-full text-sm border border-primary text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors duration-200 flex items-center"
            onClick={handleConnect}
          >
            <UserPlus size={16} className="mr-1" />
            Connect
          </button>
        );
    }
  };

  const handleConnect = () => {
    if (requestStatus?.data?.status === "not_connected") {
      sendConnectionRequest(user._id);
    }
  };

  useEffect(() => {
    connectionStatus();
  }, []);

  return (
    <div className="flex items-center justify-between mb-4">
      <Link
        to={`/profile/${user?.username}`}
        className="flex items-center flex-grow"
      >
        <img
          src={user?.profilePicture || "/avatar.png"}
          alt={user?.name}
          className="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold text-sm">{user?.name}</h3>
          <p className="text-xs text-info">{user?.headline}</p>
        </div>
      </Link>
      {renderButton()}
    </div>
  );
};

export default RecommendedUser;
