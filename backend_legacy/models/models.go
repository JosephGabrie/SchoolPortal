package models

import (
	"time"

	"gorm.io/gorm"
)

// User represents Admins, Teachers, and Parents
type User struct {
	gorm.Model
	Username     string `json:"username" gorm:"unique;not null"`
	Email        string `json:"email" gorm:"unique"`
	PasswordHash string `json:"-"`                    // Never return password in JSON
	Role         string `json:"role" gorm:"not null"` // 'admin', 'teacher', 'parent'
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`

	// Relationships
	Children      []Student `json:"children,omitempty" gorm:"foreignKey:ParentID"`
	ClassesTaught []Class   `json:"classes_taught,omitempty" gorm:"foreignKey:TeacherID"`
}

// Student represents the K-8 students (now with login capabilities)
type Student struct {
	gorm.Model
	StudentIDNumber string    `json:"student_id_number" gorm:"unique;not null"`
	Username        string    `json:"username" gorm:"unique"` // New field
	PasswordHash    string    `json:"-"`                      // New field
	FirstName       string    `json:"first_name"`
	LastName        string    `json:"last_name"`
	DateOfBirth     time.Time `json:"date_of_birth" gorm:"type:date"`
	GradeLevel      int       `json:"grade_level"`

	// Relationships
	ParentID    *uint        `json:"parent_id"` // Pointer allows null (if no parent linked yet)
	Parent      User         `json:"parent"`
	Enrollments []Enrollment `json:"enrollments"`
	Grades      []Grade      `json:"grades"`
	Attendance  []Attendance `json:"attendance"`
}

// Class represents a subject or homeroom
type Class struct {
	gorm.Model
	Name         string `json:"name"`
	Description  string `json:"description"`
	ScheduleInfo string `json:"schedule_info"`
	Semester     string `json:"semester"`

	// Relationships
	TeacherID   uint         `json:"teacher_id"`
	Teacher     User         `json:"teacher"`
	Enrollments []Enrollment `json:"enrollments"`
	Assignments []Assignment `json:"assignments"`
}

// Enrollment links Students to Classes (Many-to-Many)
type Enrollment struct {
	gorm.Model
	StudentID  uint      `json:"student_id" gorm:"uniqueIndex:idx_student_class"`
	ClassID    uint      `json:"class_id" gorm:"uniqueIndex:idx_student_class"`
	EnrolledAt time.Time `json:"enrolled_at"`

	// Preload associations
	Student Student `json:"student"`
	Class   Class   `json:"class"`
}

// Assignment represents work created by a teacher for a class
type Assignment struct {
	gorm.Model
	ClassID     uint      `json:"class_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	DueDate     time.Time `json:"due_date"`
	TotalPoints int       `json:"total_points"`
	Category    string    `json:"category"` // e.g., "Homework", "Quiz"
}

// Grade represents a specific score a student received
type Grade struct {
	gorm.Model
	AssignmentID uint      `json:"assignment_id" gorm:"uniqueIndex:idx_assign_student"`
	StudentID    uint      `json:"student_id" gorm:"uniqueIndex:idx_assign_student"`
	Score        float64   `json:"score"`
	Feedback     string    `json:"feedback"`
	IsMissing    bool      `json:"is_missing" gorm:"default:false"`
	SubmittedAt  time.Time `json:"submitted_at"`

	// Preload associations
	Assignment Assignment `json:"assignment"`
	Student    Student    `json:"-"` // Avoid infinite JSON loops
}

// Attendance tracks daily or per-class presence
type Attendance struct {
	gorm.Model
	StudentID uint      `json:"student_id" gorm:"uniqueIndex:idx_att_student_class_date"`
	ClassID   uint      `json:"class_id" gorm:"uniqueIndex:idx_att_student_class_date"`
	Date      time.Time `json:"date" gorm:"type:date;uniqueIndex:idx_att_student_class_date"`
	Status    string    `json:"status"` // 'present', 'absent', 'tardy', 'excused'
	Notes     string    `json:"notes"`
}
