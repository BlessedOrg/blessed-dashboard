import { resizeImageIfNeeded } from './resizeImageIfNeeded';

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export function base64ToFile(base64String: string, fileName: string): File {
  const [, base64Data] = base64String.split(",");
  const byteCharacters = atob(base64Data);
  const byteArrays = [];
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }
  const byteArray = new Uint8Array(byteArrays);
  const blob = new Blob([byteArray], { type: "image/jpeg" });

  return new File([blob], fileName, { type: "image/jpeg" });
}

export const getBase64FromUrl = async (url) => {
	const response = await fetch(url);

	if (!response.ok) {
		return null;
	}

	const blob = await response.blob();
	const resizedBlob = await resizeImageIfNeeded(blob, 300 * 1024);

	return new Promise((resolve, reject) => {
		const reader = new FileReader() as any;
		reader.onloadend = () => resolve(reader.result.replace(/^data:.+;base64,/, ""));
		reader.onerror = (error) => reject(error);
		reader.readAsDataURL(resizedBlob);
	});
};