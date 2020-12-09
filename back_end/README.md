# Routes

### LISTING

#### /listing/getListings

- req object: none
- res object:

```
{
  "success": boolean,
  "message": string (only sent if error),
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
  "message": string (only sent if error),
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
  "message": string (only sent if error),
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
  "message": string (only sent if error),
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
  "listingId": string
  "message": string
}
```

- res object:

```
{
  "success": boolean,
  "message": string (only sent if error),
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
  "message": string (only sent if error),
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
  "message": string (only sent if error),
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
  "message": string (only sent if error),
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
  "message": string (only sent if error),
  "data": {
    "user" {
      "userId": int,
      "name": string,
      "email" string
    }
  }
}
```

### WEBSOCKETS

#### ws://localhost:5000 (actionType="newListing")

- res from listener when new listing is posted:
  
```
data = {
  "listingCreated": boolean,
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
```

#### ws://localhost:5000 (actionType="newInquiryMessage")

- res from listener when new inquiry has been sent for a listing of theirs (most recent message in list will be specific message that was just received):
  
```
data = {
  "inquiryReceived": boolean,
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
```

#### ws://localhost:5000 (actionType="imageProcessDone")

- res from listener when an image has finished being resized and uploaded to aws (it is now accessible via its url):
  
```
data = {
  "imageProcessed": boolean,
  "image" {
      "url": string,
    }
}
```