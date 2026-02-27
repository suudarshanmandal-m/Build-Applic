import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useServiceRequests() {
  return useQuery({
    queryKey: [api.serviceRequests.list.path],
    queryFn: async () => {
      const res = await fetch(api.serviceRequests.list.path, { credentials: "include" });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to fetch service requests");
      }
      return api.serviceRequests.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateServiceRequest() {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(api.serviceRequests.create.path, {
        method: api.serviceRequests.create.method,
        body: formData,
        // DO NOT set Content-Type header for FormData, browser will set it with boundary
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.serviceRequests.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit request");
      }
      return api.serviceRequests.create.responses[201].parse(await res.json());
    },
  });
}

export function useUpdateServiceRequestStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number, status: "Pending" | "Completed" }) => {
      const url = buildUrl(api.serviceRequests.updateStatus.path, { id });
      const res = await fetch(url, {
        method: api.serviceRequests.updateStatus.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Failed to update status");
      return api.serviceRequests.updateStatus.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.serviceRequests.list.path] });
    },
  });
}

export function useDeleteServiceRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.serviceRequests.delete.path, { id });
      const res = await fetch(url, {
        method: api.serviceRequests.delete.method,
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Failed to delete request");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.serviceRequests.list.path] });
    },
  });
}
