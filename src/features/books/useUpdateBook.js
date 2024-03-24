import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBook as updateBookApi } from "../../services/apiBooks";
import toast from "react-hot-toast";

export function useUpdateBook() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateBook } = useMutation({
    mutationFn: ({ id, updatedBook, extraInfo }) =>
      updateBookApi(id, updatedBook, extraInfo),
    onSuccess: (data) => {
      toast.success(`Book successfully updated`);
      // Invalidating the books and book queries to trigger a refetch and keep the data fresh
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      queryClient.invalidateQueries({
        queryKey: ["book", String(data.id)],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateBook };
}
