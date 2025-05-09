import useDelay from "@/hooks/useDelay";
import { useCallback, useState } from "react";

type UseTableStatesOptions = {
  defaultPage?: number;
  defaultSearch?: string;
  defaultSearchField?: string;
  defaultSortField?: string;
  defaultSortOrder?: "ASC" | "DESC";
};

export default function useTableStates({
  defaultPage = 1,
  defaultSearch = "",
  defaultSearchField = "",
  defaultSortField = "",
  defaultSortOrder = "ASC",
}: UseTableStatesOptions = {}) {
  const [page, setPage] = useState(defaultPage);
  const [searchValue, setSearchValue] = useState(defaultSearch);
  const [searchField, setSearchField] = useState(defaultSearchField);
  const [sortField, setSortField] = useState(defaultSortField);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">(defaultSortOrder);

  const delay = useDelay(1000);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      delay(() => {
        setSearchValue(e.target.value);
        setPage(1);
      });
    },
    [delay]
  );

  return {
    page,
    searchValue,
    searchField,
    sortField,
    sortOrder,
    setPage,
    setSearchValue,
    setSearchField,
    setSortField,
    setSortOrder,
    handleSearchChange,
  };
}
