import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccount as deleteAccountApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useDeleteAccount() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteAccount, isLoading: isDeleting } = useMutation({
    mutationFn: deleteAccountApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("Account successfully deleted");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteAccount, isDeleting };
}
