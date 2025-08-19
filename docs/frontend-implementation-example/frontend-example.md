# Using the data in docs\backend-endpoints please implement the frontned for them like we did here down please

```powershell
PS D:\ALL-GITHUB\example-app\src\features\settings\instances> dir

    Directory: D:\ALL-GITHUB\example-app\src\features\settings\instances

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           7/15/2025 10:29 AM                components
d----           7/15/2025 10:29 AM                hooks
d----           7/15/2025 10:29 AM                schemas
d----           7/15/2025 10:29 AM                services
d----           7/15/2025 10:29 AM                types

PS D:\ALL-GITHUB\example-app\src\features\settings\instances> dir .\hooks\

    Directory: D:\ALL-GITHUB\example-app\src\features\settings\instances\hooks

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           7/15/2025 10:29 AM           2965 UseInstanceHooks.ts

PS D:\ALL-GITHUB\example-app\src\features\settings\instances> dir .\schemas\

    Directory: D:\ALL-GITHUB\example-app\src\features\settings\instances\schemas

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           7/15/2025 10:29 AM           1182 instanceSchemas.ts

PS D:\ALL-GITHUB\example-app\src\features\settings\instances> dir .\services\

    Directory: D:\ALL-GITHUB\example-app\src\features\settings\instances\services

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           7/15/2025 10:29 AM           1936 instanceServices.ts

PS D:\ALL-GITHUB\example-app\src\features\settings\instances> dir .\types\

    Directory: D:\ALL-GITHUB\example-app\src\features\settings\instances\types

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           7/15/2025 10:29 AM            458 InstanceTypes.ts

PS D:\ALL-GITHUB\example-app\src\features\settings\instances> # View all TypeScript files in one go
PS D:\ALL-GITHUB\example-app\src\features\settings\instances> Get-Content .\hooks\*.ts, .\schemas\*.ts, .\services\*.ts, .\types\*.ts


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInstance,
  deleteInstance,
  getInstance,
  getInstances,
  updateInstance,
  checkInstance
} from "../services/instanceServices";
import type { CreateInstanceRequest, UpdateInstanceRequest } from "../types/InstanceTypes";
import toast from "react-hot-toast";

// Hook to fetch all instances
export const useInstances = () => {
  return useQuery({
    queryKey: ["instances"],
    queryFn: () => getInstances(),
  });
};

// Hook to fetch a single instance
export const useInstance = (instanceId: string) => {
  return useQuery({
    queryKey: ["instance", instanceId],
    queryFn: () => getInstance(instanceId),
    enabled: !!instanceId,
  });
};

// Hook to create a new instance
export const useCreateInstance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (instanceData: CreateInstanceRequest) => createInstance(instanceData),
    onSuccess: () => {
      toast.success("Instance created successfully");
      queryClient.invalidateQueries({ queryKey: ["instances"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create instance");
    },
  });
};

// Hook to update an instance
export const useUpdateInstance = (instanceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (instanceData: UpdateInstanceRequest) => updateInstance(instanceId, instanceData),
    onSuccess: () => {
      toast.success("Instance updated successfully");
      queryClient.invalidateQueries({ queryKey: ["instances"] });
      queryClient.invalidateQueries({ queryKey: ["instance", instanceId] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update instance");
    },
  });
};

// Hook to delete an instance
export const useDeleteInstance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (instanceId: string) => deleteInstance(instanceId),
    onSuccess: () => {
      toast.success("Instance deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["instances"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete instance");
    },
  });
};

// Hook to check an instance connection
export const useCheckInstance = (instanceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => checkInstance(instanceId),
    onSuccess: () => {
      toast.success("Instance connection checked successfully");
      queryClient.invalidateQueries({ queryKey: ["instance", instanceId] });
      queryClient.invalidateQueries({ queryKey: ["instances"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to check instance connection");
    },
  });
};
import { z } from "zod";

// Instance schema for creation
export const createInstanceSchema = z.object({
  name: z.string().min(1, "Instance name is required").max(255, "Instance name cannot exceed 255 characters"),
  code: z.string().min(1, "Instance code is required").max(255, "Instance code cannot exceed 255 characters"),
  url: z.string().min(1, "URL is required").max(255, "URL cannot exceed 255 characters").url("Must be a valid URL"),
  token: z.string().min(1, "Token is required"),
});

export type CreateInstanceFormData = z.infer<typeof createInstanceSchema>;

// Instance schema for update
export const updateInstanceSchema = z.object({
  name: z.string().min(1, "Instance name is required").max(255, "Instance name cannot exceed 255 characters").optional(),
  code: z.string().min(1, "Instance code is required").max(255, "Instance code cannot exceed 255 characters").optional(),
  url: z.string().min(1, "URL is required").max(255, "URL cannot exceed 255 characters").url("Must be a valid URL").optional(),
  token: z.string().min(1, "Token is required").optional(),
});

export type UpdateInstanceFormData = z.infer<typeof updateInstanceSchema>;
import axiosInstance from "@/lib/axiosConfig";
import { handleAxiosError } from "@/lib/axiosConfig";
import type {
  CreateInstanceRequest,
  UpdateInstanceRequest
} from "../types/InstanceTypes";

// Instance services
export const getInstances = async () => {
  try {
    const response = await axiosInstance.get("/instance");
    return response.data.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch instance"));
  }
};

export const getInstance = async (instanceId: string) => {
  try {
    const response = await axiosInstance.get(`/instance/${instanceId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch instance"));
  }
};

export const createInstance = async (data: CreateInstanceRequest) => {
  try {
    const response = await axiosInstance.post("/instance", data);
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create instance"));
  }
};

export const updateInstance = async (instanceId: string, data: UpdateInstanceRequest) => {
  try {
    const response = await axiosInstance.patch(`/instance/${instanceId}`, data);
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update instance"));
  }
};

export const deleteInstance = async (instanceId: string) => {
  try {
    const response = await axiosInstance.delete(`/instance/${instanceId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete instance"));
  }
};

export const checkInstance = async (instanceId: string) => {
  try {
    const response = await axiosInstance.post(`/instance/${instanceId}/check`);
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to check instance"));
  }
};
export interface Instance {
  instanceid: string;
  name: string;
  code: string;
  url: string;
  token: string;
  status: string;
  lastCheck?: Date;
  lastError?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateInstanceRequest {
  name: string;
  code: string;
  url: string;
  token: string;
}

export interface UpdateInstanceRequest {
  name?: string;
  code?: string;
  url?: string;
  token?: string;
}
PS D:\ALL-GITHUB\example-app\src\features\settings\instances>
```
