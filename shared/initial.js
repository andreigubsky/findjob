import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appName = `findjob`
const newFrontDir = `frontend-${appName}`;
const newBackDir = `backend-${appName}`;
const newDatabaseDir = `database`;

// Creates a directory named 'newDirectory' in the same location as the script

const directoryFrontPath = path.join(__dirname, newFrontDir);

const nestedFrontDirectoryPath = ['src', 'public'];
const foldersFrontToCreate = ['components', 'pages', 'services', 'utils'];
const foldersDatabaseToCreate = ['migrations', 'seeds', 'schema'];

const directoryBackPath = path.join(__dirname, newBackDir);
const nestedBackDirectoryPath = path.join(directoryBackPath, 'src');
const foldersBackToCreate = ['controllers', 'models', 'routers', 'middlware'];

// Creating frontend and backend
fs.mkdir(directoryFrontPath, (err) => {
    if (err) {
        console.error('Error creating directory:', err);
        return;
    }
    console.log('Directory created successfully!');
});
fs.mkdir(directoryBackPath, (err) => {
    if (err) {
        console.error('Error creating directory:', err);
        return;
    }
    console.log('Directory created successfully!');
});


function foldersToCreate(arr, baseDir) {
    arr.forEach(folder => {
        const folderPath = path.join(baseDir, folder);
        if (fs.existsSync(folderPath)) {
            console.log("dir exists")
            return;
        }
        fs.mkdir(folderPath, { recursive: true }, (err) => {
            if (err) {
                console.error(`Ошибка при создании папки ${folderPath}:`, err);
                return;
            }
            console.log(`Папка ${folderPath} успешно создана.`);
        });
    });
}
foldersToCreate(nestedFrontDirectoryPath, newFrontDir);
foldersToCreate(foldersFrontToCreate, newFrontDir + '/src');
foldersToCreate(foldersDatabaseToCreate, newDatabaseDir);

// fs.mkdir(nestedBackDirectoryPath, { recursive: true }, (err) => {
//     if (err) {
//         console.error('Error creating nested directories:', err);
//         return;
//     }
//     console.log('Nested directories created successfully!');
// });

