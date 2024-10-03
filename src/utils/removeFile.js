export function removeFileFromFolder(folderPath, fileName) {
    // Construct the full path to the file
    const filePath = path.join(folderPath, fileName);
  
    // Check if the file exists before trying to delete it
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(File `${fileName} does not exist in folder ${folderPath}`);
        return;
      }
  
      // Remove the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(Error + `removing file + ${fileName}: `, err);
          return;
        }
        console.log(File + `${fileName}  removed successfully from  ${folderPath}`);
      });
    });
}