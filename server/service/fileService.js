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
        const filePath = path.resolve('static', fileName)
        fs.unlinkSync(filePath)
    }
}

module.exports = new fileService()