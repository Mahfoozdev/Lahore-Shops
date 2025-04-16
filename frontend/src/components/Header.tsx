import { User } from "../types/types";

interface PropsTypes {
  user: User | null;
}

const Header = ({ user }: PropsTypes) => {
  return (
    <div className="flex gap-32 font-bold w-full justify-center py-10 text-xl font-secondary">
      <div>{user && user.name}</div>
      <div>{user && user.email}</div>

      <div>{user ? "user is logged in " : "user not logged in"}</div>
    </div>
  );
};

export default Header;
