import { createCanvas, loadImage } from 'canvas';
import { simulate } from '@bjornlu/colorblind'
import fs from 'fs';

// URL of the image you want to import
// const imageUrl = 'https://img.freepik.com/free-vector/large-school-building-scene_1308-32058.jpg';
const imageUrl = './src/assets/desert_map/map.png';

// Path where you want to save the output PNG file
const outputPath = 'src/assets/desert_map/';

// Function to simulate the image and export it as PNG inside a canvas
const processImage = (context, image, deficiency) => {
  const srcContext = context
  const distContext = context

  const imageData = srcContext.getImageData(
    0,
    0,
    image.width,
    image.height
  )

  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    const simColor = simulate({ r, g, b }, deficiency)

    data[i] = simColor.r
    data[i + 1] = simColor.g
    data[i + 2] = simColor.b
  }

  distContext.clearRect(0, 0, image.width, image.height)
  distContext.putImageData(imageData, 0, 0)
}

// Function to import the image and export it as PNG inside a canvas
async function importAndExportImage() {
  try {
    // Load the image using the canvas library
    const image = await loadImage(imageUrl);

    // Create a canvas with the same dimensions as the image
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext('2d');


    // simulate
    const deficiencies = ["protanopia", "deuteranopia", "tritanopia", "achromatopsia"]
    for (let deficiency of deficiencies) {
      // Draw the image on the canvas
      context.drawImage(image, 0, 0);

      processImage(context, image, deficiency)

      // Export the canvas as a PNG file
      const stream = canvas.createPNGStream();
      const fileStream = fs.createWriteStream(outputPath + imageUrl.split('/').pop().split('.').shift() + "_" + deficiency + ".png");
      stream.pipe(fileStream);

      // Wait for the file to finish writing
      await new Promise((resolve) => {
        fileStream.on('finish', resolve);
      });
      context.clearRect(0, 0, canvas.width, canvas.height)

      console.log('Image exported successfully!');
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Run the function
importAndExportImage();