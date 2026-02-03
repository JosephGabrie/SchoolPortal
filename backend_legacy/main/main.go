package main

import (
	"fmt"
	"github.com/JosephGabrie/SchoolPortal/database"
	"github.com/JosephGabrie/SchoolPortal/handlers"
	"github.com/JosephGabrie/SchoolPortal/models"
	"github.com/JosephGabrie/SchoolPortal/services"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"log"
)

func main() {
	// 1. Init DB
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db := database.Connect()
	db.AutoMigrate(&models.Student{}, &models.User{})

	// Call the seeder function you wrote!
	SeedTestUser(db)

	authService := services.NewAuthService(db)
	authHandler := handlers.NewAuthHandler(authService)
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173, http://localhost:3000", // Fixed https typo
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, POST, PUT, DELETE",
	}))
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("K-8 Portal API is running")
	})

	api := app.Group("/api")
	auth := api.Group("/auth")
	auth.Post("/login/student", authHandler.LoginStudent) // For Students (using username)
	log.Fatal(app.Listen(":3000"))
}

func SeedTestUser(db *gorm.DB) {
	var count int64
	db.Model(&models.User{}).Where("username = ?", "teacher").Count(&count)

	if count == 0 {
		password := "123"
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

		testUser := models.User{
			Username:     "teacher",
			Email:        "teacher@school.edu",
			PasswordHash: string(hashedPassword),
			Role:         "teacher",
			FirstName:    "Mr.",
			LastName:     "Teacher",
		}
		db.Create(&testUser)
		fmt.Println("✅ Test Teacher created: Username 'teacher' / Password '123'")
	} else {
		// Force reset password for testing
		password := "123"
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		db.Model(&models.User{}).Where("username = ?", "teacher").Update("password_hash", string(hashedPassword))
		fmt.Println("♻️  Test Teacher 'teacher' password reset")
	}
}
