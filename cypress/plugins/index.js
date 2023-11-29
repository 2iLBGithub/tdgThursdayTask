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

    moveLatestFileToFixtures({downloadsFolderPath, fixturesFolderPath}) {
      const files = fs.readdirSync(downloadsFolderPath).sort((a, b) => {
        return fs.statSync(path.join(downloadsFolderPath, b)).mtime - fs.statSync(path.join(downloadsFolderPath, a)).mtime;
      });
      const latestFile = files[0];
      const oldPath = path.join(downloadsFolderPath, latestFile);
      const newPath = path.join(fixturesFolderPath, latestFile);
      fs.renameSync(oldPath, newPath);
      return newPath; 
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
            fs.unlinkSync(filePath);
            return true;  
        }
    });
};

