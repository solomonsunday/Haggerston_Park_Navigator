import { LoadScript, Libraries } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

export const MapWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
      libraries={libraries}
    >
      {children}
    </LoadScript>
  );
};
