const Teammate = require('../model/Teammate') 
const fileService = require('../service/fileService')

class teammateController {

    async create(req, res) {
        try {
            const {name, profession} = req.body
            const {picture} = req.files
            const fileName = fileService.saveFile(picture)
            const teammate = await Teammate.create({name, profession, picture: fileName})
            res.json(teammate)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getAll(req, res) {
        try {
            const teammates = await Teammate.find()
            return res.json(teammates)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params

            if (!id) {
                return res.status(400).json({message: 'id не указан'})
            }

            const teammate = await Teammate.findById(id)
            return res.json(teammate)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    async update(req, res) {
        try {
            const {_id, name, profession, pictureName} = req.body

            if (!_id) {
                return res.status(400).json({message: 'id не указан'})
            }

            if (!!req.files) {
                fileService.updateFile(req.files.picture, pictureName)
            }

            const teammate = {name, profession}
            const updatedTeammate = await Teammate.findByIdAndUpdate(_id, {...teammate, picture: pictureName}, {new: true})
            res.json(updatedTeammate)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async delete(req, res) {
        try {

            const {id} = req.params

            if (!id) {
                return res.status(400).json({message: 'id не указан'})
            }

            const teammate = await Teammate.findByIdAndDelete(id)
            fileService.deleteFile(teammate.picture)
            return res.json(teammate)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new teammateController()