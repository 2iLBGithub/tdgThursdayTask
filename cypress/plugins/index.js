const fs = require('fs');
const path = require('path');
const ADMZip = require('adm-zip');

module.exports = (on, config) => {
  on('task', {
    getLatestFile(folderPath) {
      const files = fs.readdirSync(folderPath);

      files.sort((a, b) => {
        return fs.statSync(path.join(folderPath, b)).mtime.getTime() - fs.statSync(path.join(folderPath, a)).mtime.getTime();
      });

      return files.length > 0 ? files[0] : null;
    },

    moveFileToFixtures(fileName) {
      const sourcePath = path.join('C:/Users/LewisBrennan/CypressLearning/thursdayTdgTask/cypress/downloads', fileName);
      const destPath = path.join('cypress/fixtures', fileName);
      
      fs.renameSync(sourcePath, destPath);
      
      return null;
    },

      readZippedJSON(filePath) {
        if (fs.existsSync(filePath)) {
          const zip = new ADMZip(filePath);
          const zipEntries = zip.getEntries(); 
    
          for (const zipEntry of zipEntries) {
            if (zipEntry.entryName.endsWith('.json')) { 
              return zipEntry.getData().toString('utf8'); 
            }
          }
        }
        return null;
      },

        deleteFile(filePath) {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
          } else {
            throw new Error(`The file ${filePath} does not exist.`);
          }
        }
    });
};

