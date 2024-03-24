import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createBook as createBookApi } from "../../services/apiBooks";

export function useCreateBook() {
  const queryClient = useQueryClient();

  const { mutate: createBook, isLoading: isCreating } = useMutation({
    mutationFn: ({ newBook, extraInfo }) => createBookApi(newBook, extraInfo),
    onSuccess: () => {
      toast.success("New book successfully created");
      // Invalidating the books query to trigger a refetch and keep the data fresh
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createBook };
}
