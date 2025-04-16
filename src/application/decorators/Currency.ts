export function AddThousandSeparator() {
	return (target: any, key: string, descriptor: PropertyDescriptor) => {
		const originalGet = descriptor.get;

		descriptor.get = function () {
			// Modifica o valor retornado pelo getter
			const value = originalGet?.call(this);
			return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		};
	};
}

export function PadStart(maxLength: number) {
	return (target: any, key: string, descriptor: PropertyDescriptor) => {
		const originalGet = descriptor.get;

		descriptor.get = function () {
			// Modifica o valor retornado pelo getter
			const value = originalGet?.call(this);
			return value.padStart(maxLength, "0");
		};
	};
}
