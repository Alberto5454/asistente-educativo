"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  BookOpen,
  Send,
  Bot,
  User,
  ArrowLeft,
  Paperclip,
  Sparkles,
  LogOut,
  Zap,
  Brain,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { useRouter } from "next/navigation"

function useCustomChat() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant" as const,
      content: `¡Hola estudiante! 🎓 Soy tu asistente de IA educativa. Estoy aquí para ayudarte con tus tareas usando los libros oficiales del centro. ¿En qué materia necesitas ayuda hoy?`,
      createdAt: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input.trim(),
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      })

      if (response.ok) {
        const data = await response.json()

        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant" as const,
          content: "",
          createdAt: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])

        // Simulate typing effect
        const fullResponse = data.response
        let currentText = ""
        const words = fullResponse.split(" ")

        for (let i = 0; i < words.length; i++) {
          currentText += (i === 0 ? "" : " ") + words[i]
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMessage.id ? { ...msg, content: currentText } : msg)),
          )
          // Add small delay between words for typing effect
          await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100))
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.",
        createdAt: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return { messages, input, handleInputChange, handleSubmit, isLoading }
}

function ChatPageContent() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isTyping, setIsTyping] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useCustomChat()

  useEffect(() => {
    if (user?.name && messages.length === 1 && messages[0].id === "welcome") {
      const updatedMessages = [...messages]
      updatedMessages[0] = {
        ...updatedMessages[0],
        content: `¡Hola ${user.name}! 🎓 Soy tu asistente de IA educativa. Estoy aquí para ayudarte con tus tareas usando los libros oficiales del centro. ¿En qué materia necesitas ayuda hoy?`,
      }
      // This would need to be handled differently in the custom hook, but for now we'll keep the static message
    }
  }, [user?.name, messages])

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
    setMessageCount(messages.length - 1)
    if (messages.length > 1) {
      setShowWelcomeAnimation(false)
    }
  }, [messages])

  useEffect(() => {
    if (input.length > 0) {
      setIsTyping(true)
      const timer = setTimeout(() => setIsTyping(false), 1000)
      return () => clearTimeout(timer)
    } else {
      setIsTyping(false)
    }
  }, [input])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const suggestedQuestions = [
    "📐 Ayúdame con matemáticas de 3° ESO",
    "🌱 Explícame la fotosíntesis",
    "📊 ¿Cómo resolver ecuaciones cuadráticas?",
    "📚 Historia de la Guerra Civil Española",
    "🔬 Leyes de Newton en física",
    "📖 Análisis de El Quijote",
    "🎨 Arte del Renacimiento español",
    "🌍 Geografía de Europa",
    "💻 Introducción a la programación",
    "🗣️ Gramática inglesa básica",
  ]

  const handleSuggestionClick = (suggestion: string) => {
    const cleanSuggestion = suggestion.replace(/^[📐🌱📊📚🔬📖🎨🌍💻🗣️]\s/u, "")
    const syntheticEvent = {
      preventDefault: () => {},
      target: { value: cleanSuggestion },
    } as React.FormEvent<HTMLFormElement>

    handleInputChange({ target: { value: cleanSuggestion } } as React.ChangeEvent<HTMLInputElement>)
    setTimeout(() => handleSubmit(syntheticEvent), 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/30">
      {showWelcomeAnimation && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right-5 duration-1000">
          <Card className="border-primary/30 shadow-2xl bg-gradient-to-r from-primary/10 to-blue-50/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Sparkles className="h-6 w-6 text-primary animate-spin" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">¡Bienvenido al Chat Educativo!</p>
                  <p className="text-xs text-muted-foreground">Haz tu primera pregunta para comenzar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-7 w-7 text-primary animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <span className="font-bold text-foreground text-lg">Asistente IA Educativa</span>
                <Badge variant="secondary" className="ml-2 text-xs animate-bounce">
                  <Sparkles className="h-3 w-3 mr-1" />
                  En línea
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-primary px-3 py-1 rounded-full shadow-sm">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-semibold text-primary-foreground">Libros Oficiales</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{user?.name}</div>
                {user?.grade && <div className="text-xs text-muted-foreground">{user.grade}</div>}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hover:bg-destructive/10 hover:text-destructive transition-colors bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-blue-50/50">
                <CardTitle className="text-sm font-bold flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-primary" />
                  Preguntas Sugeridas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-80 overflow-y-auto">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 text-xs hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-105 hover:shadow-md"
                    onClick={() => handleSuggestionClick(question)}
                    disabled={isLoading}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-secondary/20 shadow-lg">
              <CardHeader className="pb-3 bg-gradient-to-r from-secondary/5 to-blue-50/30">
                <CardTitle className="text-sm font-bold flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-secondary" />
                  Materias Disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Matemáticas",
                    "Ciencias",
                    "Historia",
                    "Literatura",
                    "Inglés",
                    "Física",
                    "Química",
                    "Arte",
                    "Geografía",
                    "Informática",
                  ].map((subject) => (
                    <Badge
                      key={subject}
                      variant="outline"
                      className="text-xs hover:bg-primary/10 hover:border-primary transition-colors cursor-pointer hover:scale-105"
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2 text-accent" />
                  Estadísticas de Sesión
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Mensajes enviados:</span>
                  <span className="font-bold text-primary">{messageCount}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Estado de IA:</span>
                  <Badge variant="secondary" className="text-xs">
                    {isLoading ? "Procesando..." : "Disponible"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Actividad:</span>
                    <span className="text-xs text-primary">{Math.min(messageCount * 10, 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(messageCount * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 flex flex-col">
            <Card className="flex-1 flex flex-col border-primary/20 shadow-xl">
              <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 via-blue-50/30 to-secondary/5 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                    Chat Educativo Interactivo
                    {isTyping && (
                      <span className="ml-2 text-xs text-muted-foreground animate-pulse">escribiendo...</span>
                    )}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs animate-pulse">
                      {messageCount} mensajes
                    </Badge>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea ref={scrollAreaRef} className="flex-1 px-6">
                  <div className="space-y-6 pb-4 pt-4">
                    {messages.map((message, index) => (
                      <div
                        key={message.id}
                        className={`flex items-start space-x-3 animate-in slide-in-from-bottom-2 duration-300 ${
                          message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Avatar className="h-10 w-10 shadow-lg border-2 border-background hover:scale-110 transition-transform">
                          <AvatarFallback
                            className={
                              message.role === "assistant"
                                ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
                                : "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground"
                            }
                          >
                            {message.role === "assistant" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                          </AvatarFallback>
                        </Avatar>

                        <div className={`flex-1 max-w-[85%] ${message.role === "user" ? "text-right" : ""}`}>
                          <div
                            className={`rounded-2xl p-4 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] ${
                              message.role === "user"
                                ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground ml-auto"
                                : "bg-gradient-to-br from-card to-muted/50 text-card-foreground border border-border/50"
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 flex items-center">
                            <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2"></span>
                            {message.createdAt
                              ? message.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                              : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex items-start space-x-3 animate-in slide-in-from-bottom-2">
                        <Avatar className="h-10 w-10 shadow-lg border-2 border-background">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                            <Bot className="h-5 w-5 animate-spin" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-gradient-to-br from-card to-muted/50 rounded-2xl p-4 shadow-lg border border-border/50">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                            <div
                              className="w-3 h-3 bg-primary/80 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-3 h-3 bg-primary/60 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="border-t border-border bg-gradient-to-r from-background to-blue-50/20 p-4">
                  <form onSubmit={handleSubmit} className="flex items-end space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 bg-transparent hover:bg-primary/10 hover:border-primary transition-all duration-200 hover:scale-105"
                      type="button"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <Input
                        placeholder="Escribe tu pregunta o tarea aquí... 💭"
                        value={input}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="resize-none border-primary/20 focus:border-primary focus:ring-primary/20 transition-all duration-200 hover:border-primary/40"
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="shrink-0 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground mt-3 text-center flex items-center justify-center">
                    <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
                    La IA responde basándose en los libros oficiales del centro educativo
                    <Sparkles className="h-3 w-3 ml-1 animate-pulse" />
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <ChatPageContent />
    </ProtectedRoute>
  )
}
