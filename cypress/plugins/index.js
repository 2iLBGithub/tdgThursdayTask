const fs = require('fs');
const path = require('path');

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
    }
  });
};

