"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Filter } from "lucide-react"

interface KnowledgeItem {
  id: string
  title: string
  subject: string
  grade: string
  content: string
  relevance: number
}

interface KnowledgeBaseProps {
  query: string
  onSelectContent: (content: string) => void
}

export function KnowledgeBase({ query, onSelectContent }: KnowledgeBaseProps) {
  const [searchTerm, setSearchTerm] = useState(query)

  // Simulated knowledge base - this would be replaced with actual database queries
  const knowledgeItems: KnowledgeItem[] = [
    {
      id: "1",
      title: "Ecuaciones de primer grado",
      subject: "Matemáticas",
      grade: "3º ESO",
      content:
        "Una ecuación de primer grado es una igualdad algebraica que contiene una incógnita elevada a la primera potencia. Para resolverla, debemos despejar la incógnita aplicando las propiedades de las igualdades...",
      relevance: 95,
    },
    {
      id: "2",
      title: "La fotosíntesis",
      subject: "Ciencias Naturales",
      grade: "4º ESO",
      content:
        "La fotosíntesis es el proceso mediante el cual las plantas verdes y otros organismos transforman la energía lumínica en energía química. Este proceso ocurre en los cloroplastos...",
      relevance: 88,
    },
    {
      id: "3",
      title: "Guerra Civil Española",
      subject: "Historia",
      grade: "2º Bachillerato",
      content:
        "La Guerra Civil Española (1936-1939) fue un conflicto bélico que enfrentó a dos bandos: el bando republicano y el bando nacional. Las causas del conflicto fueron múltiples...",
      relevance: 82,
    },
  ]

  const filteredItems = knowledgeItems
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => b.relevance - a.relevance)

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar en la base de conocimientos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectContent(item.content)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {item.subject} • {item.grade}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {item.relevance}% relevante
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground line-clamp-2">{item.content}</p>
            </CardContent>
          </Card>
        ))}

        {filteredItems.length === 0 && (
          <Card className="text-center py-8">
            <CardContent>
              <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No se encontró contenido relevante en la base de conocimientos.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
