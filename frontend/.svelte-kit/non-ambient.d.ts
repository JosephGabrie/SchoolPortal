
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/Student" | "/Student/assignments" | "/Student/calendar" | "/Student/dashboard" | "/Teacher" | "/Teacher/aabb" | "/Teacher/aabb/assignments" | "/Teacher/aabb/myStudents" | "/Teacher/assignments" | "/Teacher/calendar" | "/Teacher/dashboard" | "/Teacher/test" | "/auth" | "/auth/callback" | "/login" | "/protected";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/Student": Record<string, never>;
			"/Student/assignments": Record<string, never>;
			"/Student/calendar": Record<string, never>;
			"/Student/dashboard": Record<string, never>;
			"/Teacher": Record<string, never>;
			"/Teacher/aabb": Record<string, never>;
			"/Teacher/aabb/assignments": Record<string, never>;
			"/Teacher/aabb/myStudents": Record<string, never>;
			"/Teacher/assignments": Record<string, never>;
			"/Teacher/calendar": Record<string, never>;
			"/Teacher/dashboard": Record<string, never>;
			"/Teacher/test": Record<string, never>;
			"/auth": Record<string, never>;
			"/auth/callback": Record<string, never>;
			"/login": Record<string, never>;
			"/protected": Record<string, never>
		};
		Pathname(): "/" | "/Student" | "/Student/" | "/Student/assignments" | "/Student/assignments/" | "/Student/calendar" | "/Student/calendar/" | "/Student/dashboard" | "/Student/dashboard/" | "/Teacher" | "/Teacher/" | "/Teacher/aabb" | "/Teacher/aabb/" | "/Teacher/aabb/assignments" | "/Teacher/aabb/assignments/" | "/Teacher/aabb/myStudents" | "/Teacher/aabb/myStudents/" | "/Teacher/assignments" | "/Teacher/assignments/" | "/Teacher/calendar" | "/Teacher/calendar/" | "/Teacher/dashboard" | "/Teacher/dashboard/" | "/Teacher/test" | "/Teacher/test/" | "/auth" | "/auth/" | "/auth/callback" | "/auth/callback/" | "/login" | "/login/" | "/protected" | "/protected/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}