const fs = require('fs');

const htmlContent = fs.readFileSync('browse.html', 'utf8');
const match = htmlContent.match(/<script id="tailwind-config">([\s\S]*?)<\/script>/);

if (match && match[1]) {
    // The script contains `tailwind.config = { ... };`
    let configStr = match[1].trim()
        .replace('tailwind.config = ', '')
        .replace(/;$/, '');

    // We need to write this to tailwind.config.js
    const configOut = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  ` + Object.entries(JSON.parse(configStr)).map(([k, v]) => `${k}: ${JSON.stringify(v, null, 2)}`).join(',\n  ') + `
};
`;

    fs.writeFileSync('tailwind.config.js', configOut);
    console.log("Tailwind config exported successfully!");
} else {
    console.log("Could not find tailwind config in HTML.");
}
