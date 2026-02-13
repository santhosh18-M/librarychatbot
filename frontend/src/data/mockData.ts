export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  publisher: string;
  year: number;
  description: string;
  coverUrl: string;
  available: boolean;
  copiesTotal: number;
  copiesAvailable: number;
  rating: number;
}

export interface BorrowedBook {
  id: string;
  bookId: string;
  title: string;
  author: string;
  borrowDate: string;
  dueDate: string;
  status: "active" | "overdue" | "returned";
  fine: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const books: Book[] = [
  {
    id: "1", title: "Introduction to Algorithms", author: "Thomas H. Cormen",
    category: "Computer Science", isbn: "978-0262033848", publisher: "MIT Press",
    year: 2009, description: "A comprehensive textbook covering a broad range of algorithms in depth. It features lucid writing and an accessible approach to complex topics.",
    coverUrl: "", available: true, copiesTotal: 5, copiesAvailable: 3, rating: 4.7,
  },
  {
    id: "2", title: "Clean Code", author: "Robert C. Martin",
    category: "Software Engineering", isbn: "978-0132350884", publisher: "Prentice Hall",
    year: 2008, description: "A handbook of agile software craftsmanship. Presents principles, patterns, and practices of writing clean code.",
    coverUrl: "", available: true, copiesTotal: 4, copiesAvailable: 1, rating: 4.5,
  },
  {
    id: "3", title: "Design Patterns", author: "Erich Gamma",
    category: "Software Engineering", isbn: "978-0201633610", publisher: "Addison-Wesley",
    year: 1994, description: "Elements of reusable object-oriented software. The classic guide to design patterns.",
    coverUrl: "", available: false, copiesTotal: 3, copiesAvailable: 0, rating: 4.6,
  },
  {
    id: "4", title: "The Pragmatic Programmer", author: "David Thomas",
    category: "Software Engineering", isbn: "978-0135957059", publisher: "Addison-Wesley",
    year: 2019, description: "Your journey to mastery. A guide to becoming a better programmer through practical advice.",
    coverUrl: "", available: true, copiesTotal: 6, copiesAvailable: 4, rating: 4.8,
  },
  {
    id: "5", title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell",
    category: "Artificial Intelligence", isbn: "978-0134610993", publisher: "Pearson",
    year: 2020, description: "The most comprehensive, up-to-date introduction to the theory and practice of artificial intelligence.",
    coverUrl: "", available: true, copiesTotal: 4, copiesAvailable: 2, rating: 4.4,
  },
  {
    id: "6", title: "Database System Concepts", author: "Abraham Silberschatz",
    category: "Database", isbn: "978-0078022159", publisher: "McGraw-Hill",
    year: 2019, description: "Provides a comprehensive introduction to database systems concepts and design.",
    coverUrl: "", available: true, copiesTotal: 3, copiesAvailable: 1, rating: 4.2,
  },
  {
    id: "7", title: "Operating System Concepts", author: "Abraham Silberschatz",
    category: "Operating Systems", isbn: "978-1119800361", publisher: "Wiley",
    year: 2021, description: "The definitive guide to operating systems, covering both theory and practical application.",
    coverUrl: "", available: false, copiesTotal: 3, copiesAvailable: 0, rating: 4.3,
  },
  {
    id: "8", title: "Computer Networking", author: "James Kurose",
    category: "Networking", isbn: "978-0133594140", publisher: "Pearson",
    year: 2016, description: "A top-down approach to computer networking with engaging examples and applications.",
    coverUrl: "", available: true, copiesTotal: 5, copiesAvailable: 3, rating: 4.1,
  },
];

export const borrowedBooks: BorrowedBook[] = [
  { id: "b1", bookId: "1", title: "Introduction to Algorithms", author: "Thomas H. Cormen", borrowDate: "2026-01-15", dueDate: "2026-02-15", status: "active", fine: 0 },
  { id: "b2", bookId: "2", title: "Clean Code", author: "Robert C. Martin", borrowDate: "2026-01-05", dueDate: "2026-02-05", status: "overdue", fine: 2.50 },
  { id: "b3", bookId: "4", title: "The Pragmatic Programmer", author: "David Thomas", borrowDate: "2026-01-28", dueDate: "2026-02-28", status: "active", fine: 0 },
];

export const botResponses: Record<string, string> = {
  hello: "Hello! 👋 Welcome to Smart Library. How can I help you today?",
  search: "You can search for books using the Search Books page in the sidebar, or just tell me the book title you're looking for!",
  borrow: "To borrow a book, search for it and click the 'Borrow' button. Make sure you have your student ID ready.",
  fine: "You can check your fines in the 'Fines' section. Currently, overdue fines are $0.50 per day.",
  hours: "The library is open Monday-Friday 8AM-10PM, Saturday 9AM-6PM, and Sunday 10AM-5PM.",
  recommend: "Based on your reading history, I'd recommend checking out 'The Pragmatic Programmer' and 'Clean Code'. Would you like more suggestions?",
  default: "I'm here to help with anything library-related! You can ask me about book availability, due dates, fines, library hours, or get recommendations. 📚",
};

export function getBotResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return botResponses.hello;
  if (lower.includes("search") || lower.includes("find") || lower.includes("look")) return botResponses.search;
  if (lower.includes("borrow") || lower.includes("checkout") || lower.includes("rent")) return botResponses.borrow;
  if (lower.includes("fine") || lower.includes("penalty") || lower.includes("fee")) return botResponses.fine;
  if (lower.includes("hour") || lower.includes("open") || lower.includes("close") || lower.includes("time")) return botResponses.hours;
  if (lower.includes("recommend") || lower.includes("suggest") || lower.includes("popular")) return botResponses.recommend;
  return botResponses.default;
}
