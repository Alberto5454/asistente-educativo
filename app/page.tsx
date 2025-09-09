"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, MessageCircle, Users, Award, Brain, Clock, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function HomePage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">EduCenter IA</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="#inicio" className="text-foreground hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link href="#cursos" className="text-foreground hover:text-primary transition-colors">
              Cursos
            </Link>
            <Link href="#sobre-nosotros" className="text-foreground hover:text-primary transition-colors">
              Sobre Nosotros
            </Link>
            <Link href="#contacto" className="text-foreground hover:text-primary transition-colors">
              Contacto
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">Hola, {user.name}</span>
                <Link href="/chat">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat IA
                  </Button>
                </Link>
                {user.role === "teacher" || user.role === "admin" ? (
                  <Link href="/admin/libros">
                    <Button variant="outline" size="sm">
                      Admin Libros
                    </Button>
                  </Link>
                ) : null}
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <Brain className="h-4 w-4 mr-2" />
            Inteligencia Artificial Educativa
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Aprende con la ayuda de
            <span className="text-primary"> IA Avanzada</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Nuestro centro educativo de secundaria integra inteligencia artificial para resolver tus tareas usando los
            libros oficiales del centro. Aprende de manera personalizada y eficiente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link href="/chat">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Ir al Chat IA
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Comenzar Chat con IA
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Iniciar Sesión
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">¿Por qué elegir EduCenter IA?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combinamos educación tradicional con tecnología de vanguardia para ofrecerte la mejor experiencia de
              aprendizaje.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-4" />
                <CardTitle>IA Personalizada</CardTitle>
                <CardDescription>
                  Nuestra IA está entrenada específicamente con los libros de texto del centro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Recibe respuestas precisas y contextualizadas basadas en el material oficial de tus materias.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>Disponible 24/7</CardTitle>
                <CardDescription>Accede a ayuda académica en cualquier momento del día</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No importa la hora, nuestra IA está lista para ayudarte con tus tareas y dudas académicas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Profesores Expertos</CardTitle>
                <CardDescription>Equipo docente altamente calificado supervisando el proceso</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nuestros profesores validan y mejoran constantemente las respuestas de la IA para garantizar calidad.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>Material Oficial</CardTitle>
                <CardDescription>Basado en los libros de texto aprobados por el centro</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Todas las respuestas se fundamentan en el contenido oficial de tus materias y programas de estudio.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Resultados Comprobados</CardTitle>
                <CardDescription>Mejora significativa en el rendimiento académico</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Los estudiantes que usan nuestra plataforma muestran mejores calificaciones y comprensión.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>Chat Intuitivo</CardTitle>
                <CardDescription>Interfaz fácil de usar diseñada para estudiantes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Simplemente escribe tu pregunta o sube tu tarea, y recibe ayuda inmediata y comprensible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">¿Listo para mejorar tus calificaciones?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Únete a cientos de estudiantes que ya están usando nuestra IA educativa para alcanzar sus metas académicas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link href="/chat">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Ir al Chat IA
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Empezar Ahora - Gratis
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Ver Demo
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="font-bold text-foreground">EduCenter IA</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Revolucionando la educación secundaria con inteligencia artificial.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Educación</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Matemáticas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Ciencias
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Literatura
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Historia
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Tutoriales
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 EduCenter IA. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      {user && (
        <div className="fixed bottom-6 right-6 z-50">
          <Link href="/chat">
            <Button
              size="lg"
              className="rounded-full shadow-lg bg-secondary hover:bg-secondary/90 h-14 w-14 p-0"
              aria-label="Abrir chat con IA"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
