import { useEffect } from "react";

export const useDebounce = (callback, delay, deps = []) => {
    if (!Array.isArray(deps)) {
        throw new Error("deps must be an array");
    }

    useEffect(() => {
        const timer = setTimeout(callback, delay);
        return () => clearTimeout(timer);
    }, deps);
};