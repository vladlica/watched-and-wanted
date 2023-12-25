import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSeries } from "../../services/apiSeries";
import toast from "react-hot-toast";

export function useToggleSeriesStatus() {
  const queryClient = useQueryClient();

  const { isLoading: isToggling, mutate: toggleStatus } = useMutation({
    mutationFn: ({ id, obj }) => updateSeries(id, obj),
    onSuccess: (data) => {
      toast.success(`Series marked as ${data.status}`);

      queryClient.invalidateQueries({
        queryKey: ["series"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isToggling, toggleStatus };
}
