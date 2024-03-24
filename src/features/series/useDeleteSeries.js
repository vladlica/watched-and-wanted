import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSeries as deleteSeriesApi } from "../../services/apiSeries";
import toast from "react-hot-toast";

export function useDeleteSeries() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteSeries } = useMutation({
    mutationFn: deleteSeriesApi,
    onSuccess: () => {
      toast.success("Series successfully deleted");
      // Invalidating the series query to trigger a refetch and keep the data fresh 
      queryClient.invalidateQueries({
        queryKey: ["series"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteSeries };
}
