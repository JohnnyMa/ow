import {Predicate, Context} from './predicate';
import hasItems from '../utils/has-items';

export class WeakMapPredicate<T1 extends object = any, T2 = any> extends Predicate<WeakMap<T1, T2>> {
	/**
	 * @hidden
	 */
	constructor(context?: Context<WeakMap<T1, T2>>) {
		super('weakMap', context);
	}

	/**
	 * Test a WeakMap to include all the provided keys. The keys are tested by identity, not structure.
	 *
	 * @param keys The keys that should be a key in the WeakMap.
	 */
	hasKeys(...keys: T1[]) {
		return this.addValidator({
			message: (_, missingKeys) => `Expected WeakMap to have keys \`${JSON.stringify(missingKeys)}\``,
			validator: map => hasItems(map, keys)
		});
	}

	/**
	 * Test a WeakMap to include any of the provided keys. The keys are tested by identity, not structure.
	 *
	 * @param keys The keys that could be a key in the WeakMap.
	 */
	hasAnyKeys(...keys: T1[]) {
		return this.addValidator({
			message: () => `Expected WeakMap to have any key of \`${JSON.stringify(keys)}\``,
			validator: map => keys.some(key => map.has(key))
		});
	}
}
