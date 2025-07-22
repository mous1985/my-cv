const { chromium } = require('playwright');
const path = require('path');

async function convertToPDF() {
  // Lance un navigateur Chromium
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Charge le fichier HTML anglais
  const htmlPath = path.join(__dirname, 'mustapha_cv_en.html');
  await page.goto(`file://${htmlPath}`);
  
  // Attend que la page soit complètement chargée (polices, CSS, etc.)
  await page.waitForLoadState('networkidle');
  
  // Optimisations pour PDF
  await page.addStyleTag({
    content: `
      @media print {
        body {
          background: white !important;
          padding: 0 !important;
        }
        .cv-container {
          box-shadow: none !important;
          border-radius: 0 !important;
          margin: 0 !important;
        }
      }
    `
  });
  
  // Génère le PDF avec des options optimisées
  await page.pdf({
    path: 'CV_Mustapha_Benazzouz_EN.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0.5cm',
      right: '0.5cm',
      bottom: '0.5cm',
      left: '0.5cm'
    }
  });
  
  await browser.close();
  console.log('✅ PDF généré avec succès : CV_Mustapha_Benazzouz_EN.pdf');
}

convertToPDF().catch(console.error);
