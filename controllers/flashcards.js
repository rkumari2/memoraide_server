const Flashcard = require ('../models/Flashcard')

async function index (req, res) {
    try {
        const cards = await Flashcard.getAll()
        res.status(200).json(cards)
    } catch (err) {
        res.status(500).json({'error': err.message})
    }
}

async function create (req, res) {
    try {
        const subject_id = parseInt(req.params.subject_id); 
        const data = { subject_id, ...req.body };
        const result = await Flashcard.createCard(data)
        res.status(201).send(result)
    } catch (err) {
        res.status(400).json({'error': err.message})  
    }
}

async function show (req, res) {
    try {
        const subject_id = parseInt(req.params.subject_id)
        const flashcards = await Flashcard.getBySubjectId(subject_id)
        res.status(200).json(flashcards)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = {
    index, create, show
}