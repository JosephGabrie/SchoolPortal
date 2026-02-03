import { convex } from "$lib/convex-client";

export function useQuery(query: any, args: any = {}) {
    let data = $state(undefined);
    let isLoading = $state(true);
    let error = $state(undefined);

    $effect(() => {
        let cleanup: (() => void) | undefined;
        
        try {
            const watch = convex.watchQuery(query, args);
            cleanup = watch.onUpdate((newData) => {
                data = newData;
                isLoading = false;
            });
        } catch (err) {
            error = err;
            isLoading = false;
        }

        return () => {
            if (cleanup) cleanup();
        };
    });

    return {
        get data() { return data; },
        get isLoading() { return isLoading; },
        get error() { return error; }
    };
}

export function useMutation(mutation: any) {
    let isLoading = $state(false);
    let error = $state(undefined);

    const mutate = async (args: any) => {
        isLoading = true;
        error = undefined;
        try {
            const result = await convex.mutation(mutation, args);
            return result;
        } catch (err) {
            error = err;
            throw err;
        } finally {
            isLoading = false;
        }
    };

    return {
        mutate,
        get isLoading() { return isLoading; },
        get error() { return error; }
    };
}
