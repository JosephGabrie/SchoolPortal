package handlers

import (
	"os"
	"time"

	"github.com/JosephGabrie/SchoolPortal/services"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

type AuthHandler struct {
	Service *services.AuthService
}

func NewAuthHandler(service *services.AuthService) *AuthHandler {
	return &AuthHandler{Service: service}
}

// LoginRequest represents the JSON body sent by the frontend
type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"` // The raw password, NOT the hash
}

// LoginUser handles Admins, Teachers, and Parents

// LoginStudent handles K-8 Student logins
func (h *AuthHandler) LoginStudent(c *fiber.Ctx) error {
	var req LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	student, err := h.Service.LoginStudent(req.Username, req.Password)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid username or password"})
	}

	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "dev_secret_do_not_use_in_prod"
	}

	claims := jwt.MapClaims{
		"user_id":     student.ID,
		"grade_level": student.GradeLevel,
		"role":        "student", // Explicitly set role to student
		"type":        "student",
		"exp":         time.Now().Add(time.Hour * 72).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, _ := token.SignedString([]byte(secret))

	return c.JSON(fiber.Map{
		"token":   t,
		"student": student,
	})
} // LoginUnified checks both Students and Staff tables
func (h *AuthHandler) LoginUnified(c *fiber.Ctx) error {
	var req LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "dev_secret"
	}

	// 1. TRY STUDENT LOGIN
	student, err := h.Service.LoginStudent(req.Username, req.Password)
	if err == nil {
		// Success: It is a Student
		claims := jwt.MapClaims{
			"user_id": student.ID,
			"role":    "student",
			"exp":     time.Now().Add(time.Hour * 72).Unix(),
		}
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		t, _ := token.SignedString([]byte(secret))

		return c.JSON(fiber.Map{
			"token": t,
			"role":  "student",
			"user":  student, // Return the student object
		})
	}

	// 2. TRY STAFF/USER LOGIN
	user, err := h.Service.LoginStaff(req.Username, req.Password)
	if err == nil {
		// Success: It is a Teacher/Parent/Admin
		claims := jwt.MapClaims{
			"user_id": user.ID,
			"role":    user.Role, // e.g., "teacher" or "admin"
			"exp":     time.Now().Add(time.Hour * 72).Unix(),
		}
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		t, _ := token.SignedString([]byte(secret))

		return c.JSON(fiber.Map{
			"token": t,
			"role":  user.Role,
			"user":  user, // Return the user object
		})
	}

	// 3. BOTH FAILED
	return c.Status(401).JSON(fiber.Map{"error": "Invalid username or password"})
}
