import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBook } from "../../services/apiBooks";
import toast from "react-hot-toast";

export function useToggleBookStatus() {
  const queryClient = useQueryClient();

  const { isLoading: isToggling, mutate: toggleStatus } = useMutation({
    mutationFn: ({ id, obj }) => updateBook(id, obj),
    onSuccess: (data) => {
      toast.success(`Book marked as ${data.status}`);

      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isToggling, toggleStatus };
}
