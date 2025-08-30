import { CSSPropertiesColor, PreferenceType } from "@src-types/color";

export namespace Color_Parses {
	// Função para converter RGB para hexadecimal
	export const rgb2hex = (
		r: number,
		g: number,
		b: number
	): CSSPropertiesColor => {
		const toHex = (value: number) => value.toString(16).padStart(2, "0");
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
	};

	// Função fornecida para calcular o hue
	export function rgb2hue(r: number, g: number, b: number): number {
		r /= 255;
		g /= 255;
		b /= 255;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const c = max - min;

		let hue: number = 0;
		if (c === 0) {
			hue = 0;
		} else {
			switch (max) {
				case r:
					hue = ((g - b) / c + (g < b ? 6 : 0)) * 60;
					break;
				case g:
					hue = ((b - r) / c + 2) * 60;
					break;
				case b:
					hue = ((r - g) / c + 4) * 60;
					break;
			}
		}
		return hue;
	}

	// Função auxiliar para converter HSL para RGB
	export const hsl2rgb = (
		h: number,
		s: number,
		l: number
	): { r: number; g: number; b: number } => {
		const c = (1 - Math.abs(2 * l - 1)) * s;
		const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
		const m = l - c / 2;

		let r = 0,
			g = 0,
			b = 0;

		if (0 <= h && h < 60) {
			r = c;
			g = x;
			b = 0;
		} else if (60 <= h && h < 120) {
			r = x;
			g = c;
			b = 0;
		} else if (120 <= h && h < 180) {
			r = 0;
			g = c;
			b = x;
		} else if (180 <= h && h < 240) {
			r = 0;
			g = x;
			b = c;
		} else if (240 <= h && h < 300) {
			r = x;
			g = 0;
			b = c;
		} else {
			r = c;
			g = 0;
			b = x;
		}

		return {
			r: Math.round((r + m) * 255),
			g: Math.round((g + m) * 255),
			b: Math.round((b + m) * 255),
		};
	};

	// Função auxiliar para converter hexadecimal para RGB
	export const hex2rgb = (
		color: CSSPropertiesColor
	): { r: number; g: number; b: number } => {
		if (typeof color === "string" && color.startsWith("#")) {
			const hex = color.slice(1);
			const bigint = parseInt(hex, 16);

			if (hex.length === 3) {
				return {
					r: ((bigint >> 8) & 0xf) * 17,
					g: ((bigint >> 4) & 0xf) * 17,
					b: (bigint & 0xf) * 17,
				};
			}

			return {
				r: (bigint >> 16) & 0xff,
				g: (bigint >> 8) & 0xff,
				b: bigint & 0xff,
			};
		}
		throw new Error("Formato de cor não suportado.");
	};
}

export namespace Color_Generate {
	export const hex = (preference: PreferenceType): CSSPropertiesColor => {
		while (true) {
			const randomColor = Math.floor(Math.random() * 16777215); // Cor aleatória entre 0x000000 e 0xFFFFFF
			const hexColor = `#${randomColor.toString(16).padStart(6, "0")}`; // Converte para hexadecimal

			// Converte a cor hexadecimal para RGB
			const { r, g, b } = Color_Parses.hex2rgb(hexColor);

			// Calcula o brilho da cor
			const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

			// Define a cor com base na preferência
			if (preference === "light" && brightness > 0.5) return hexColor;
			if (preference === "dark" && brightness <= 0.5) return hexColor;
		}
	};
}

export namespace Color_Get {
	// Função para obter uma cor análoga (variando a tonalidade ligeiramente)
	export const analogous = (color: CSSPropertiesColor): CSSPropertiesColor => {
		const { r, g, b } = Color_Parses.hex2rgb(color);

		// Converte RGB para HSL usando rgb2hue
		const h = Color_Parses.rgb2hue(r, g, b);
		const s = calculateSaturation(r, g, b); // Função para calcular saturação
		const l = calculateLightness(r, g, b); // Função para calcular luminosidade

		// Ajusta o HSL para obter a cor análoga
		const analogousH = (h + 50) % 360; // Incrementa a tonalidade em 30 graus
		const analogousS = Math.min(s * 1.1, 1); // Aumenta levemente a saturação
		const analogousL = Math.max(l, 0.4); // Garante uma luminosidade mínima de 0.4

		// Converte de volta para RGB
		const analogousRgb = Color_Parses.hsl2rgb(
			analogousH,
			analogousS,
			analogousL
		);

		// Converte RGB para hexadecimal
		return Color_Parses.rgb2hex(analogousRgb.r, analogousRgb.g, analogousRgb.b);
	};

	// Função para calcular saturação
	function calculateSaturation(r: number, g: number, b: number): number {
		const max = Math.max(r, g, b) / 255;
		const min = Math.min(r, g, b) / 255;
		const l = (max + min) / 2;

		if (max === min) return 0;
		return l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
	}

	// Função para calcular luminosidade
	function calculateLightness(r: number, g: number, b: number): number {
		const max = Math.max(r, g, b) / 255;
		const min = Math.min(r, g, b) / 255;
		return (max + min) / 2;
	}

	// Função para mesclar duas cores
	export function mixColors(
		color1: string,
		color2: string,
		weight: number = 0.5
	): string {
		// Converte as cores de hexadecimal para RGB
		const { r: r1, g: g1, b: b1 } = Color_Parses.hex2rgb(color1);
		const { r: r2, g: g2, b: b2 } = Color_Parses.hex2rgb(color2);

		// Interpola entre as cores
		const mixedR = Math.round(r1 * (1 - weight) + r2 * weight);
		const mixedG = Math.round(g1 * (1 - weight) + g2 * weight);
		const mixedB = Math.round(b1 * (1 - weight) + b2 * weight);

		// Converte a cor resultante de volta para hexadecimal
		return Color_Parses.rgb2hex(mixedR, mixedG, mixedB);
	}
}

export function getBackgroundColor(
	item_color: CSSPropertiesColor,
	color_from_theme: CSSPropertiesColor,
	weight?: number
): string {
	const [r, g, b] = color_from_theme
		.replace(/[rgb() ]/g, "")
		.split(",")
		.map((value: string) => Number.parseInt(value));
	return Color_Get.mixColors(
		Color_Parses.rgb2hex(r, g, b),
		`${item_color}`,
		0.09
	);
}
