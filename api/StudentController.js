const router = require('express').Router();
const multer = require('multer');

const Student = require('../model/Student');
const SchemaValidation = require('../validation/SchemaValidation');
const StudentValidation = require('../validation/StudentValidation');
const StudentService = require('../service/StudentService');
const ModelRequests = require('../model-requests');
const { isDoctor } = require('../middleware/authorization');

const studentService = new StudentService(Student, SchemaValidation, StudentValidation, null, ModelRequests);

const storageConfig = require('../config/diskStorageConfig');
const upload = multer({ storage: storageConfig });

router.post('/new', isDoctor, upload.single('video'), async (req, res) => {
    const videoLink = req.file && `uploads/${req.file.filename}`;
    const student = await studentService.addStudent(req.body, videoLink);
    res.json(student);
});

router.get('/search', isDoctor, async (req, res) => {
    const students = await studentService.findStudents(req.query.name, req.query.department);
    res.json(students);
});

module.exports = router;