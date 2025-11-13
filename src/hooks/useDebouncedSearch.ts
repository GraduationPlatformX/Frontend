import { useCallback, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { User } from "@/types";
import { toast } from "sonner";
import { api } from "@/services/api";

export function useDebouncedSearch(
  delay: number = 300,
  searchType: "students" | "supervisors" = "students"
) {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (query: string) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/users/search-${searchType}?query=${query}`
      );
      setUsers(response.data.data);
      setLoading(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
      setLoading(false);
    }
  };
  const debouncedFn = useMemo(
    () =>
      debounce((value: string) => {
        if (value.trim() !== "") {
          fetchUsers(value);
        }
      }, delay),
    [delay]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      debouncedFn(value); // <-- always latest typed value
    },
    [debouncedFn]
  );

  return { searchValue, onChange, setSearchValue, users, loading };
}
