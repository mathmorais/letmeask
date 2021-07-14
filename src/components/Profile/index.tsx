import { User } from "../../entities/User";
import "./styles.scss";

export const Profile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <section className="profile-container">
      <img className="profile-photo" src={user.photoURL} alt="Usuário" />
      <span>{user.displayName}</span>
    </section>
  );
};
