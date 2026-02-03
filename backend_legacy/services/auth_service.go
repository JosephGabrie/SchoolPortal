package services

import (
	"errors"

	"github.com/JosephGabrie/SchoolPortal/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthService struct {
	DB *gorm.DB
}

func NewAuthService(db *gorm.DB) *AuthService {
	return &AuthService{DB: db}
}

// LoginStudent authenticates Students (from the 'students' table)
func (s *AuthService) LoginStudent(username, password string) (models.Student, error) {
	var student models.Student

	if err := s.DB.Where("username = ?", username).First(&student).Error; err != nil {
		return student, errors.New("invalid username or password")
	}

	// 2. Verify Student Password
	err := bcrypt.CompareHashAndPassword([]byte(student.PasswordHash), []byte(password))
	if err != nil {
		return student, errors.New("invalid username or password")
	}

	return student, nil
} // LoginStaff handles Teachers, Parents, and Admins
func (s *AuthService) LoginStaff(username, password string) (*models.User, error) {
	var user models.User
	// Check User Table
	if err := s.DB.Where("username = ?", username).First(&user).Error; err != nil {
		return nil, err
	}
	// Check Password
	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password)); err != nil {
		return nil, errors.New("invalid password")
	}
	return &user, nil
}
