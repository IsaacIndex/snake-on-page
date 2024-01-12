import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';

// URL of the image you want to import
// const imageUrl = 'https://img.freepik.com/free-vector/large-school-building-scene_1308-32058.jpg';
const imageUrl = './src/assets/snake-graphics.png';

// Path where you want to save the output PNG file
const outputPath = 'src/assets/output.png';

// Function to import the image and export it as PNG inside a canvas
async function importAndExportImage() {
  try {
    // Load the image using the canvas library
    const image = await loadImage(imageUrl);

    // Create a canvas with the same dimensions as the image
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext('2d');

    // Draw the image on the canvas
    context.drawImage(image, 0, 0);

    // Export the canvas as a PNG file
    const stream = canvas.createPNGStream();
    const fileStream = fs.createWriteStream(outputPath);
    stream.pipe(fileStream);

    // Wait for the file to finish writing
    await new Promise((resolve) => {
      fileStream.on('finish', resolve);
    });

    console.log('Image exported successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Run the function
importAndExportImage();