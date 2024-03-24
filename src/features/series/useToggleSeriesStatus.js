import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSeries } from "../../services/apiSeries";
import toast from "react-hot-toast";

export function useToggleSeriesStatus() {
  const queryClient = useQueryClient();

  const { isLoading: isToggling, mutate: toggleStatus } = useMutation({
    mutationFn: ({ id, obj }) => updateSeries(id, obj),
    onSuccess: (data) => {
      toast.success(`Series marked as ${data.status}`);
      // Invalidating the series query to trigger a refetch and keep the data fresh 
      queryClient.invalidateQueries({
        queryKey: ["series"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isToggling, toggleStatus };
}
