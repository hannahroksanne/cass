declare module 'unitransform' {
  export function rgba(color: string): [number, number, number, number]
  export function rgbToHsluv(rgb: [number, number, number]): [number, number, number]
  export function hsluvToHex(hsluv: [number, number, number]): string
  export function clamp100(num: number): number
  export function clampHue(hue: number): number
  export function getHsluv(color: string): [number, number, number]
  export function useProperties(modified: string, modifier: string, properties: string): string
  export function formatColor(color: [number, number, number]): string
  export function lighten(color: string, adjustment: number): string
  export function darken(color: string, adjustment: number): string
  export function saturate(color: string, adjustment: number): string
  export function desaturate(color: string, adjustment: number): string
  export function rotate(color: string, adjustment: number): string
  export function setHue(color: string, hue: number): string
  export function getHue(color: string): number
  export function setSaturation(color: string, saturation: number): string
  export function getSaturation(color: string): number
  export function setLightness(color: string, lightness: number): string
  export function getLightness(color: string): number
}
