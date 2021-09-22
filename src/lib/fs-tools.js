
import { join} from "path"

import fs from "fs-extra"

const {writeFile} = fs;

const publicFolderPath = join(process.cwd(), "./public/img/authors")
 

export const saveAuthorPicture = (name, contentAsBuffer) => writeFile(join(publicFolderPath, name), contentAsBuffer)