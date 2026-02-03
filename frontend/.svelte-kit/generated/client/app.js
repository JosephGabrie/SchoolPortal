export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19')
];

export const server_loads = [];

export const dictionary = {
		"/": [5],
		"/Student": [6,[2]],
		"/Student/assignments": [7,[2]],
		"/Student/calendar": [8,[2]],
		"/Student/dashboard": [9,[2]],
		"/Teacher": [10,[3]],
		"/Teacher/aabb": [11,[3,4]],
		"/Teacher/aabb/assignments": [12,[3,4]],
		"/Teacher/aabb/myStudents": [13,[3,4]],
		"/Teacher/assignments": [14,[3]],
		"/Teacher/calendar": [15,[3]],
		"/Teacher/dashboard": [16,[3]],
		"/Teacher/test": [17,[3]],
		"/login": [~18],
		"/protected": [~19]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';