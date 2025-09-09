"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Plus, Search, Edit, Trash2, ArrowLeft, Filter } from "lucide-react"
import Link from "next/link"

interface Book {
  id: string
  title: string
  subject: string
  grade: string
  author: string
  isbn: string
  description: string
  chapters: Chapter[]
  status: "active" | "inactive"
}

interface Chapter {
  id: string
  title: string
  content: string
  pageNumber: number
}

const initialBooks: Book[] = [
  {
    id: "1",
    title: "Matemáticas 3º ESO",
    subject: "Matemáticas",
    grade: "3º ESO",
    author: "Editorial Santillana",
    isbn: "978-84-294-8765-4",
    description: "Libro oficial de matemáticas para 3º de ESO que cubre álgebra, geometría y estadística.",
    status: "active",
    chapters: [
      {
        id: "1-1",
        title: "Números racionales e irracionales",
        content: "Los números racionales son aquellos que pueden expresarse como fracción...",
        pageNumber: 12,
      },
      {
        id: "1-2",
        title: "Ecuaciones de primer grado",
        content: "Una ecuación de primer grado es una igualdad algebraica...",
        pageNumber: 45,
      },
    ],
  },
  {
    id: "2",
    title: "Biología y Geología 4º ESO",
    subject: "Ciencias Naturales",
    grade: "4º ESO",
    author: "Editorial Anaya",
    isbn: "978-84-678-3421-7",
    description: "Texto completo de biología y geología para 4º de ESO con enfoque en evolución y genética.",
    status: "active",
    chapters: [
      {
        id: "2-1",
        title: "La célula y sus componentes",
        content: "La célula es la unidad básica de la vida...",
        pageNumber: 8,
      },
      {
        id: "2-2",
        title: "Genética y herencia",
        content: "Los genes son las unidades de herencia...",
        pageNumber: 78,
      },
    ],
  },
  {
    id: "3",
    title: "Historia de España 2º Bachillerato",
    subject: "Historia",
    grade: "2º Bachillerato",
    author: "Editorial Vicens Vives",
    isbn: "978-84-316-9876-2",
    description: "Historia contemporánea de España desde el siglo XIX hasta la actualidad.",
    status: "active",
    chapters: [
      {
        id: "3-1",
        title: "La Guerra Civil Española",
        content: "La Guerra Civil Española (1936-1939) fue un conflicto...",
        pageNumber: 156,
      },
    ],
  },
]

export default function LibrosAdminPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  const [selectedGrade, setSelectedGrade] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  const subjects = Array.from(new Set(books.map((book) => book.subject)))
  const grades = Array.from(new Set(books.map((book) => book.grade)))

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "all" || book.subject === selectedSubject
    const matchesGrade = selectedGrade === "all" || book.grade === selectedGrade

    return matchesSearch && matchesSubject && matchesGrade
  })

  const handleAddBook = (newBook: Omit<Book, "id">) => {
    const book: Book = {
      ...newBook,
      id: Date.now().toString(),
    }
    setBooks([...books, book])
    setIsAddDialogOpen(false)
  }

  const handleEditBook = (updatedBook: Book) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)))
    setEditingBook(null)
  }

  const handleDeleteBook = (bookId: string) => {
    setBooks(books.filter((book) => book.id !== bookId))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">Gestión de Libros</span>
            </div>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Libro
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Libro</DialogTitle>
                <DialogDescription>
                  Completa la información del libro para agregarlo a la base de conocimientos.
                </DialogDescription>
              </DialogHeader>
              <BookForm onSubmit={handleAddBook} onCancel={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filtros y Búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar libros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las materias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las materias</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los cursos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los cursos</SelectItem>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {filteredBooks.length} de {books.length} libros
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{book.title}</CardTitle>
                    <CardDescription className="mb-3">{book.author}</CardDescription>
                  </div>
                  <Badge variant={book.status === "active" ? "default" : "secondary"}>
                    {book.status === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{book.subject}</Badge>
                  <Badge variant="outline">{book.grade}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{book.description}</p>

                <div className="text-xs text-muted-foreground mb-4">
                  <p>ISBN: {book.isbn}</p>
                  <p>Capítulos: {book.chapters.length}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Ver Contenido
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{book.title}</DialogTitle>
                        <DialogDescription>{book.description}</DialogDescription>
                      </DialogHeader>
                      <BookContentView book={book} />
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm" onClick={() => setEditingBook(book)}>
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button variant="outline" size="sm" onClick={() => handleDeleteBook(book.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron libros</h3>
              <p className="text-muted-foreground mb-4">No hay libros que coincidan con los filtros seleccionados.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedSubject("all")
                  setSelectedGrade("all")
                }}
              >
                Limpiar filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      {editingBook && (
        <Dialog open={!!editingBook} onOpenChange={() => setEditingBook(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Libro</DialogTitle>
              <DialogDescription>Modifica la información del libro.</DialogDescription>
            </DialogHeader>
            <BookForm book={editingBook} onSubmit={handleEditBook} onCancel={() => setEditingBook(null)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function BookForm({
  book,
  onSubmit,
  onCancel,
}: {
  book?: Book
  onSubmit: (book: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: book?.title || "",
    subject: book?.subject || "",
    grade: book?.grade || "",
    author: book?.author || "",
    isbn: book?.isbn || "",
    description: book?.description || "",
    status: book?.status || "active",
    chapters: book?.chapters || [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(book ? { ...book, ...formData } : formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="author">Autor/Editorial</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="subject">Materia</Label>
          <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar materia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Matemáticas">Matemáticas</SelectItem>
              <SelectItem value="Ciencias Naturales">Ciencias Naturales</SelectItem>
              <SelectItem value="Historia">Historia</SelectItem>
              <SelectItem value="Literatura">Literatura</SelectItem>
              <SelectItem value="Inglés">Inglés</SelectItem>
              <SelectItem value="Física">Física</SelectItem>
              <SelectItem value="Química">Química</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="grade">Curso</Label>
          <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar curso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1º ESO">1º ESO</SelectItem>
              <SelectItem value="2º ESO">2º ESO</SelectItem>
              <SelectItem value="3º ESO">3º ESO</SelectItem>
              <SelectItem value="4º ESO">4º ESO</SelectItem>
              <SelectItem value="1º Bachillerato">1º Bachillerato</SelectItem>
              <SelectItem value="2º Bachillerato">2º Bachillerato</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="isbn">ISBN</Label>
          <Input id="isbn" value={formData.isbn} onChange={(e) => setFormData({ ...formData, isbn: e.target.value })} />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{book ? "Actualizar" : "Agregar"} Libro</Button>
      </div>
    </form>
  )
}

function BookContentView({ book }: { book: Book }) {
  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="info">Información</TabsTrigger>
        <TabsTrigger value="chapters">Capítulos</TabsTrigger>
      </TabsList>

      <TabsContent value="info" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Materia</Label>
            <p className="text-sm text-muted-foreground">{book.subject}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Curso</Label>
            <p className="text-sm text-muted-foreground">{book.grade}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Autor</Label>
            <p className="text-sm text-muted-foreground">{book.author}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">ISBN</Label>
            <p className="text-sm text-muted-foreground">{book.isbn}</p>
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium">Descripción</Label>
          <p className="text-sm text-muted-foreground mt-1">{book.description}</p>
        </div>
      </TabsContent>

      <TabsContent value="chapters" className="space-y-4">
        {book.chapters.map((chapter) => (
          <Card key={chapter.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{chapter.title}</CardTitle>
                <Badge variant="outline">Pág. {chapter.pageNumber}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{chapter.content}</p>
            </CardContent>
          </Card>
        ))}

        {book.chapters.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No hay capítulos agregados aún.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
