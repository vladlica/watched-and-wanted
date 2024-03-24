import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createSeries as createSeriesApi } from "../../services/apiSeries";

export function useCreateSeries() {
  const queryClient = useQueryClient();

  const { mutate: createSeries, isLoading: isCreating } = useMutation({
    mutationFn: ({ newSeries, extraInfo }) =>
      createSeriesApi(newSeries, extraInfo),
    onSuccess: () => {
      toast.success("New series successfully created");
      // Invalidating the series query to trigger a refetch and keep the data fresh 
      queryClient.invalidateQueries({ queryKey: ["series"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createSeries };
}
