export const resizeImageIfNeeded = async (blob, maxSizeInBytes = 300 * 1024) => {
  if (blob.size <= maxSizeInBytes) {
    return blob;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      let quality = 0.6;

      do {
        width *= 0.9;
        height *= 0.9;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (resizedBlob) => {
            if (resizedBlob.size <= maxSizeInBytes || quality <= 0.1) {
              resolve(resizedBlob);
            } else {
              quality -= 0.1;
              canvas.toBlob((newBlob) => resolve(newBlob), "image/jpeg", quality);
            }
          },
          "image/jpeg",
          quality
        );
      } while (canvas.toDataURL("image/jpeg", quality).length > maxSizeInBytes && quality > 0.1);
    };
    img.src = URL.createObjectURL(blob);
  });
};