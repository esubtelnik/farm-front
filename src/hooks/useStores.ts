"use client";
import { useContext } from "react";
import { StoreContext } from "@/context/StoreContext";

export const useStores = () => useContext(StoreContext); 