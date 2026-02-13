import { X, BookOpen, Star } from "lucide-react";
import { Book } from "@/data/mockData";

export default function BookDetailsModal({ book, onClose }: { book: Book; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-card rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="h-48 bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center relative">
          <BookOpen className="h-16 w-16 text-primary/40" />
          <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full bg-card/80 hover:bg-card transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-xl font-bold font-display">{book.title}</h2>
            <p className="text-sm text-muted-foreground">{book.author}</p>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{book.description}</p>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">ISBN</p>
              <p className="font-medium">{book.isbn}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Publisher</p>
              <p className="font-medium">{book.publisher}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Year</p>
              <p className="font-medium">{book.year}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Copies Available</p>
              <p className="font-medium">{book.copiesAvailable} / {book.copiesTotal}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.round(book.rating) ? "text-warning fill-warning" : "text-muted"}`} />
            ))}
            <span className="text-sm text-muted-foreground ml-1">{book.rating}</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${book.available ? "status-available" : "status-unavailable"}`}>
              {book.available ? "Available" : "Unavailable"}
            </span>
            <button
              disabled={!book.available}
              className="flex-1 py-2.5 rounded-xl gradient-primary text-primary-foreground font-medium text-sm disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              Borrow This Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
