const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class fileService {

    saveFile(file) {
        try {
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve('static', fileName)
            file.mv(filePath)
            return fileName
        } catch (error) {
            console.log(error)
        }
    }
    
    deleteFile(fileName) {
        try {
            const filePath = path.resolve('static', fileName)
            fs.unlinkSync(filePath)
        } catch (error) {
            console.log(error)
        }
    }

    updateFile(file, pictureName) {
        try {
            this.deleteFile(pictureName)
            const filePath = path.resolve('static', pictureName)
            file.mv(filePath)
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new fileService()