import Eleventy from "@11ty/eleventy";
// import httpServer from 'http-server';
import { promises as fs } from "fs";

(async function() {
    let elev = new Eleventy();
    
    //delete docs folder
    console.error(`## Deleting built folder`);
    const folderPath = './docs';
    try {
        await fs.rm(folderPath, { recursive: true }); // Use fs.promises.rmdir()
        console.log(`Folder ${folderPath} has been deleted successfully.`);
    } catch (err) {
        console.error(`Error deleting folder: ${err}`);
    }
    //build and write to
    console.error(`## Building site`);
    await elev.write();
    // start web server
    // console.error(`## Starting server`);
    // const server = httpServer.createServer({root: './docs'});
    // await server.listen(8080);
    // let serverURL = "http://localhost:8080";
})();