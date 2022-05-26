import * as uuid from "uuid";
import * as path from "path";

const FileHelper = {
    saveFile: (file, type: string) => {
        const format = (type: string): string => {
            switch (type) {
                case "photo":
                    return ".jpg";
                default:
                    return ".txt";
            }
        };
        try {
            const filename = uuid.v4() + format(type);
            const filepath = path.resolve("static", filename);
            file.mv(filepath);
            return filename;
        } catch (e) {
            console.log(e);
        }
    },
};

export default FileHelper;
