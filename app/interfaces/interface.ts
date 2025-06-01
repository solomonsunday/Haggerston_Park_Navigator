export interface ILocationData {
  name: string;
  coord: { lat: number; lng: number };
  address?: string;
  id?: string;
  isSelected?: boolean;
  isCurrentLocation?: boolean;
  isDestination?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  isFetching?: boolean;
  isPreviousData?: boolean;
  isIdle?: boolean;
  isRefetching?: boolean;
  isMutating?: boolean;
  isPending?: boolean;
  isOptimistic?: boolean;
}

export interface MapFormProps {
  setFindLocation: React.Dispatch<React.SetStateAction<boolean>>;
}
