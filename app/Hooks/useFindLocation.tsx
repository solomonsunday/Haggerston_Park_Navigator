"use client";
import { useState } from "react";

const useFindLocation = () => {
  const [findLocation, setFindLocation] = useState<boolean>(false);

  return { findLocation, setFindLocation };
};

export default useFindLocation;
