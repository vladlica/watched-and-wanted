import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSeries as updateSeriesApi } from "../../services/apiSeries";
import toast from "react-hot-toast";

export function useUpdateSeries() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSeries } = useMutation({
    mutationFn: ({ id, updatedSeries, extraInfo }) =>
      updateSeriesApi(id, updatedSeries, extraInfo),
    onSuccess: (data) => {
      toast.success(`Series successfully updated`);

      queryClient.invalidateQueries({
        queryKey: ["series"],
      });

      queryClient.invalidateQueries({
        queryKey: ["series", String(data.id)],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSeries };
}
