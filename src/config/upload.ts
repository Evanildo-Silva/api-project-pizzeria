import crypto from "crypto";
import multer from "multer";

import { resolve } from "path";

export default {
  // Upload recebe a pasta de destino para salvar a imagem
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        // Caminho da pasta onde será salvo
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          // Cria um hash
          const filehash = crypto.randomBytes(16).toString("hex");
          // Concatena o hash criado com o nome original do arquivo
          const fileName = `${filehash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
