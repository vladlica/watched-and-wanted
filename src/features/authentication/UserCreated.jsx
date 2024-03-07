import { format } from "date-fns";
import { useOutletContext } from "react-router-dom";

function UserCreated() {
  const { created_at } = useOutletContext();

  return (
    <h4>
      Your account was created at {format(new Date(created_at), "dd MMM yyyy ")}
    </h4>
  );
}

export default UserCreated;
