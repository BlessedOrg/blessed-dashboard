export function getAppGradient(colors: { color1: string, color2: string }) {
  const { color2, color1 } = colors || {};
  return {
    background: `linear-gradient(247.1deg, ${color1} 0%, ${color2} 67%)`
  };

}
