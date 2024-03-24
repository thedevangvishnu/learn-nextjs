const UserProfile = ({ params }: any) => {
  return (
    <div
      className="flex flex-col items-center justify-center
    gap-6 h-screen"
    >
      <h1 className="text-2xl">UserProfile</h1>
      <h3>
        Profile id: <span>{params.id}</span>
      </h3>
    </div>
  );
};

export default UserProfile;
