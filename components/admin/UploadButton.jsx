import axios from 'axios';
export default function UploadButton({
  setIsUploading,
  setImages,
  images = [],
  resizeAndEdit,
}) {
  const uploadImages = async (ev) => {
    const selectedFiles = ev.target?.files;
    if (selectedFiles?.length > 0) {
      setIsUploading(true);
      const data = new FormData();

      //resize using canvas
      const resizeImage = (
        file,
        intrinsicWidth,
        intrinsicHeight,
        renderWidth,
        renderHeight,
      ) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              // Determine if resizing is necessary
              const shouldResize =
                img.width !== intrinsicWidth || img.height !== intrinsicHeight;

              if (!shouldResize) {
                // If dimensions match, return the image as-is
                canvas.width = renderWidth;
                canvas.height = renderHeight;
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, renderWidth, renderHeight);
                ctx.drawImage(img, 0, 0, renderWidth, renderHeight);
                canvas.toBlob((blob) => {
                  resolve({ blob, renderWidth, renderHeight });
                }, file.type);
                return;
              }

              // Calculate aspect ratio for resizing
              const aspectRatio = img.width / img.height;

              // Maintain intrinsic dimensions while scaling the image
              let targetWidth = intrinsicWidth;
              let targetHeight = targetWidth / aspectRatio;

              if (targetHeight > intrinsicHeight) {
                targetHeight = intrinsicHeight;
                targetWidth = targetHeight * aspectRatio;
              }

              // Set canvas size to intrinsic dimensions
              canvas.width = intrinsicWidth;
              canvas.height = intrinsicHeight;

              // Fill canvas with white background
              ctx.fillStyle = '#e7e7e7';
              ctx.fillRect(0, 0, intrinsicWidth, intrinsicHeight);

              // Draw resized image centered on the canvas
              const xOffset = (intrinsicWidth - targetWidth) / 2;
              const yOffset = (intrinsicHeight - targetHeight) / 2;
              ctx.drawImage(img, xOffset, yOffset, targetWidth, targetHeight);

              // Convert canvas to a blob and resolve
              canvas.toBlob((blob) => {
                resolve({ blob, renderWidth, renderHeight });
              }, file.type);
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      };

      const removeBackground = (
        file,
        targetColor = '#e7e7e7',
        targetColors = ['#ffffff', '#dbdbdb'],
        tolerance = 20,
      ) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              canvas.width = img.width;
              canvas.height = img.height;

              ctx.drawImage(img, 0, 0);

              const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height,
              );
              const data = imageData.data;

              const targetRgb = hexToRgb(targetColor);
              const targetRgbArray = targetColors.map(hexToRgb);

              for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // Check if the pixel color is within the tolerance range of any target color
                const isTargetColor = targetRgbArray.some(
                  ([tr, tg, tb]) =>
                    Math.abs(r - tr) < tolerance &&
                    Math.abs(g - tg) < tolerance &&
                    Math.abs(b - tb) < tolerance,
                );

                if (isTargetColor) {
                  // Convert pixel to target color
                  data[i] = targetRgb[0]; // Red
                  data[i + 1] = targetRgb[1]; // Green
                  data[i + 2] = targetRgb[2]; // Blue
                  data[i + 3] = 255; // Alpha (Fully opaque)
                }
              }

              ctx.putImageData(imageData, 0, 0);

              canvas.toBlob((blob) => {
                resolve(blob);
              }, file.type);
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      };

      // Helper function to convert hex color to RGB
      const hexToRgb = (hex) => {
        let r = 0,
          g = 0,
          b = 0;
        // 3 digits
        if (hex.length === 4) {
          r = parseInt(hex[1] + hex[1], 16);
          g = parseInt(hex[2] + hex[2], 16);
          b = parseInt(hex[3] + hex[3], 16);
        }
        // 6 digits
        else if (hex.length === 7) {
          r = parseInt(hex[1] + hex[2], 16);
          g = parseInt(hex[3] + hex[4], 16);
          b = parseInt(hex[5] + hex[6], 16);
        }
        return [r, g, b];
      };

      for (const file of selectedFiles) {
        if (resizeAndEdit) {
          // Remove the background before resizing
          const blobWithNoBackground = await removeBackground(file);

          // Resize the image
          const { blob } = await resizeImage(
            blobWithNoBackground,
            750,
            958,
            140,
            179,
          ); // Intrinsic: 750x958, Render: 140x179
          data.append('file', blob, file.name);
        } else {
          // If no resizing/editing, upload the file as-is
          data.append('file', file);
        }
      }
      const res = await axios.post('/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data.fileLinks);
      setImages([...images, ...res.data.fileLinks]);
      setIsUploading(false);
    }
  };
  return (
    <label className=" w-24 h-24  text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-300 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
        />
      </svg>
      Upload <input type="file" className="hidden" onChange={uploadImages} />
    </label>
  );
}
