import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook as deleteBookApi } from "../../services/apiBooks";
import toast from "react-hot-toast";

export function useDeleteBook() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBook } = useMutation({
    mutationFn: deleteBookApi,
    onSuccess: () => {
      toast.success("Book successfully deleted");
      // Invalidating the books query to trigger a refetch and keep the data fresh 
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBook };
}
