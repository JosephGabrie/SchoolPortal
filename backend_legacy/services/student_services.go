package services

import (
	"github.com/JosephGabrie/SchoolPortal/models"
	"gorm.io/gorm"
)

type StudentService struct {
	DB *gorm.DB
}

func NewStudentService(db *gorm.DB) *StudentService {
	return &StudentService{DB: db}
}

// GetRecentAssignments grabs the 5 most recently created assignments
func (s *StudentService) GetRecentAssignments() ([]models.Assignment, error) {
	var assignments []models.Assignment
	// Sort by DueDate descending and take 5
	result := s.DB.Order("due_date desc").Limit(5).Find(&assignments)
	return assignments, result.Error
}

// GetStudentGrades fetches grades for a specific student
func (s *StudentService) GetStudentGrades(studentID uint) ([]models.Grade, error) {
	var grades []models.Grade
	// Preload Assignment so we know which assignment the grade belongs to
	result := s.DB.Preload("Assignment").Where("user_id = ?", studentID).Find(&grades)
	return grades, result.Error
}

// CalculateAverage calculates the simple arithmetic mean of the student's scores
func (s *StudentService) CalculateAverage(studentID uint) (float64, error) {
	var grades []models.Grade
	if err := s.DB.Where("user_id = ?", studentID).Find(&grades).Error; err != nil {
		return 0, err
	}

	if len(grades) == 0 {
		return 0, nil
	}

	var sum float64
	for _, grade := range grades {
		sum += grade.Score
	}

	return sum / float64(len(grades)), nil
}
