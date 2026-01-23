import React, { useEffect } from "react";
import { Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import { axiosInstance } from "../../utils/axios";
import { getPosts } from "../../utils/helper";
import PostCreation from "../../components/PostCreation";
import RecommendedUser from "../../components/RecommendedUser";
import { setRecommendedUserData } from "../../globalSlice";
import Post from "../../components/Post";

const HomePage = () => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.globalData.authUser);
  const recommendedUserData = useSelector(
    (state) => state.globalData.recommendedUserData,
  );
  const posts = useSelector((state) => state.globalData.posts);

  const getRecommendedUsers = async () => {
    try {
      const postRes = await axiosInstance.get("/users/suggestions");
      dispatch(setRecommendedUserData(postRes.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts(dispatch);
    getRecommendedUsers();
  }, []);

  return (
    <div className="bg-gray-100 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>

      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <PostCreation user={authUser} />

        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}

        {posts?.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mb-6">
              <Users size={64} className="mx-auto text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              No Posts Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Connect with others to start seeing posts in your feed!
            </p>
          </div>
        )}
      </div>

      {recommendedUserData?.length > 0 && (
        <div className="col-span-1 lg:col-span-1 hidden lg:block">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4">People you may know</h2>
            {recommendedUserData?.map((user) => (
              <RecommendedUser key={user._id} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
