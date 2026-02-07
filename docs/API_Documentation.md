# API Documentation

## ScaleDown API Integration

### Purpose
- Compress large book summaries
- Speed up catalog search
- Improve recommendation performance

### Authentication
Authorization: Bearer <SCALEDOWN_API_KEY>


### Example Request
POST /scaledown/compress

```json
{
  "text": "Long book summary text here",
  "compression_ratio": 0.2
}


### Example Response
{
  "compressed_text": "Shortened summary",
  "original_size": 5200,
  "compressed_size": 1040
}
