import { format } from "date-fns";
import { useUser } from "./useUser";

function UserCreated() {
  const {
    user: { created_at },
  } = useUser();

  return (
    <h4>
      Your account was created at {format(new Date(created_at), "dd MMM yyyy ")}
    </h4>
  );
}

export default UserCreated;
