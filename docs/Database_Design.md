
---

# 🗄️ docs/Database_Design.md

```md
# Database Design

## Entities

### Users
- user_id (PK)
- name
- email
- role (patron/librarian)
- membership_id

### Books
- book_id (PK)
- title
- author
- category
- isbn
- availability_status

### Transactions
- transaction_id (PK)
- user_id (FK)
- book_id (FK)
- issue_date
- due_date
- return_date

### Holds
- hold_id (PK)
- user_id (FK)
- book_id (FK)
- status

### Fines
- fine_id (PK)
- user_id (FK)
- amount
- status

## Relationships
- One user → many transactions
- One book → many transactions
- Users can place multiple holds
