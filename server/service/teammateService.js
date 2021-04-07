const Teammate = require('../model/Teammate')
const fileService = require('../service/fileService')

class teammateService {
    async create(teammate, picture) {
        const fileName = fileService.saveFile(picture)
        const createdTeammate = await Teammate.create({...teammate, picture: fileName})
        return createdTeammate
    }
}

module.exports = new teammateService()