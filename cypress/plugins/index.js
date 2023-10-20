const fs = require('fs');
const path = require('path');
const ADMZip = require('adm-zip');

module.exports = (on, config) => {
  on('task', {
    getLatestFile(folderPath) {
      const files = fs.readdirSync(folderPath);

      files.sort((a, b) => {
        return fs.statSync(path.join(folderPath, b)).mtime.getTime() -
               fs.statSync(path.join(folderPath, a)).mtime.getTime();
      });

      return files.length > 0 ? files[0] : null;
    },

    moveFileToFixtures(fileName) {
      const sourcePath = path.join('C:/Users/LewisBrennan/CypressLearning/thursdayTdgTask/cypress/downloads', fileName);
      const destPath = path.join('cypress/fixtures', fileName);
      
      fs.renameSync(sourcePath, destPath);
      
      return null;
    },

    readFile(filePath) {
        if (fs.existsSync(filePath)) {
          return fs.readFileSync(filePath, 'utf8');
        }
        return null;
      },

      readZippedJSON(filePath) {
        if (fs.existsSync(filePath)) {
          const zip = new ADMZip(filePath);
          const zipEntries = zip.getEntries(); // Returns an array of ZipEntry records
    
          for (const zipEntry of zipEntries) {
            if (zipEntry.entryName.endsWith('.json')) { // You're specifically looking for a .json file inside the zip
              return zipEntry.getData().toString('utf8'); // Decompresses and returns the content of the JSON file
            }
          }
        }
        return null;
      }
    });
};

