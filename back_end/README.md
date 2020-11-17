# Routes

### LISTING

#### /listing/getListings

- req object: none
- res object:

```
{
  "success": boolean,
  "data": {
    "listings": [
      {
        "listingId": int,
        "imageUrl": string,
        "title": string,
        "description": string,
        "price": int,
        "posterId": int
      }
    ]
  }
}
```

#### /listing/getListing

- req object:

```
query params - id: int
```

- res object:

```
{
  "success": boolean,
  "data": {
    "listing":
      {
        "listingId": int,
        "imageUrl": string,
        "title": string,
        "description": string,
        "price": int,
        "posterId": int
      }
  }
}
```

#### /listing/getUserListings

- req object: None

- res object:

```
{
  "success": boolean,
  "data": {
    "listings": [
      {
        "listingId": int,
        "imageUrl": string,
        "title": string,
        "description": string,
        "price": int,
        "posterId": int
      }
    ]
  }
}
```

#### /listing/create

- req object:

```
body: {
  "imageUrl": string,
  "title": string,
  "description": string,
  "price": int
}
```

- res object:

```
{
  "success": boolean,
  "data": {
    "listing":
      {
        "listingId": int,
        "imageUrl": string,
        "title": string,
        "description": string,
        "price": int,
        "posterId": int
      }
  }
}
```

### INQUIRY

#### /inquiry/sendMessage

- req object:

```
body: {
  "message": string
}
```

- res object:

```
{
  "success": boolean,
  "data": {
    "inquiry" {
      "inquiryId": int,
      "senderId": int,
      "listingId": int,
      "messages": [
        {
          "senderId": int,
          "body": string
        }
      ]
    }
  }
}
```

#### /inquiry/getUserInquiries

-req object: None

-res object:

```
{
  "success": boolean,
  "data": {
    "inquiries": [
      {
        "inquiryId": int,
        "senderId": int,
        "listingId": int,
        "messages": [
          {
            "senderId": int,
            "body": string
          }
        ]
      }
    ]
  }
}
```

### AUTH

#### /auth/register

- req object:

```
body: {
  "name": string
  "email": string
  "password": string
}
```

- res object:

```
{
  "success": boolean,
  "data": {
    "user" {
      "userId": int,
      "name": string,
      "email" string
    }
  }
}
```

#### /auth/login

- req object:

```
body: {
  "email": string
  "password": string
}
```

- res object:

```
{
  "success": boolean,
  "data": {
    "user" {
      "userId": int,
      "name": string,
      "email" string
    }
  }
}
```

#### /auth/logout

- req object:

```
body: {
  "email": string
}
```

- res object:

```
{
  "success": boolean
}
```

#### /auth/user

- req object: None

- res object:

```
{
  "success": boolean,
  "data": {
    "user" {
      "userId": int,
      "name": string,
      "email" string
    }
  }
}
```