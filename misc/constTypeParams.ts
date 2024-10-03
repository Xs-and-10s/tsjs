// without const T...
declare function useStatuses<T>(statuses: T[]): T;
const loadingStatus = useStatuses(["loading", "idle"]);
//    ^?

// AFTER const T...
declare function useStatuses2<const T>(statuses: t[]): T;
const loadingStatus2 = useStatuses2(["loading", "idle"]);
//    ^?
// ... should be type "loading" | "idle"
