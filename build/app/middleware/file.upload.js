"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { mongo_connection_url } = process.env;
// const storage = new GridFsStorage({
//     url: mongo_connection_url,
//     options: { useNewUrlParser: true, useUnifiedTopology: true},
//     file: (req: Request, file: any) => {
//         const match = ["image/png", "image/jpeg"];
//         if(match.indexOf(file.memetype) === -1){
//             const filename = `${Date.now()}-wishy-${file.originalname}`;
//             return filename;
//         }
//     }
// })
