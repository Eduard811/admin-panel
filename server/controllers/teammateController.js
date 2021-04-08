const Teammate = require('../model/Teammate') 
const teammateService = require('../service/teammateService')

class teammateController {

    async create(req, res) {
        try {
            const teammate = await teammateService.create(req.body, req.files.picture)
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

            const {_id, teammate} = req.body

            if (!_id) {
                return res.status(400).json({message: 'id не указан'})
            }

            const updatedTeammate = await Teammate.findByIdAndUpdate(_id, teammate, {new: true})
            return res.json(updatedTeammate)

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
            return res.json(teammate)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new teammateController()