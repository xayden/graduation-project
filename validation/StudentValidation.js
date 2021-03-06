const Joi = require('@hapi/joi');

const Student = require('../model/Student');
const GPError = require('../error/GPError');

class StudentValidation {
    
    static async validateStudentDoesntExist(email) {
        const student = await Student.findOne({ email });
        if (student) throw new GPError.DuplicateError(`Student already exists`);
    }

    static async validateStudentExists(studentId) {
        const student = await Student.findById(studentId);
        if (!student) throw new GPError.InvalidId(`Invalid student id`);
        return student
    }

}

module.exports = StudentValidation;