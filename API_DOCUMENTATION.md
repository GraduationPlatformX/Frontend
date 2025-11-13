# Graduation Platform API Documentation

## Base URL
```
http://localhost:3000/api
```

---

## Authentication Endpoints

### 1. POST /api/auth/register
Register a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "STUDENT"
}
```

**Response: 201 Created**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "STUDENT",
      "status": "ACTIVE",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2. POST /api/auth/login
Login user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "STUDENT",
      "status": "ACTIVE",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. POST /api/auth/logout
Logout user

**Headers:**
```
Authorization: Bearer <token>
```

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## User Endpoints

### 4. GET /api/users
Get all users (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response: 200 OK**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "STUDENT",
      "status": "ACTIVE",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": "2",
      "name": "Dr. Sarah Smith",
      "email": "sarah@example.com",
      "role": "SUPERVISOR",
      "status": "ACTIVE",
      "createdAt": "2024-01-10T09:00:00Z"
    }
  ]
}
```

---

### 5. GET /api/users/:id
Get user by ID

**Response: 200 OK**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "STUDENT",
    "status": "ACTIVE",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 6. PUT /api/users/:id
Update user

**Request Body:**
```json
{
  "name": "John Updated",
  "status": "ACTIVE"
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "John Updated",
    "email": "john@example.com",
    "role": "STUDENT",
    "status": "ACTIVE",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 7. DELETE /api/users/:id
Delete user (Admin only)

**Response: 200 OK**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Group Endpoints

### 8. GET /api/groups
Get all groups

**Response: 200 OK**
```json
{
  "success": true,
  "data": [
    {
      "id": "g1",
      "name": "AI Researchers",
      "description": "Working on machine learning project",
      "leaderId": "1",
      "members": [
        {
          "id": "1",
          "name": "John Doe",
          "email": "john@example.com"
        },
        {
          "id": "2",
          "name": "Alice Johnson",
          "email": "alice@example.com"
        }
      ],
      "supervisorId": "3",
      "projectId": "p1",
      "status": "ACTIVE",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### 9. POST /api/groups
Create a new group

**Request Body:**
```json
{
  "name": "AI Researchers",
  "description": "Working on machine learning project"
}
```

**Response: 201 Created**
```json
{
  "success": true,
  "data": {
    "id": "g1",
    "name": "AI Researchers",
    "description": "Working on machine learning project",
    "leaderId": "1",
    "members": [
      {
        "id": "1",
        "name": "John Doe",
        "email": "john@example.com"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 10. POST /api/groups/:id/members
Add member to group

**Request Body:**
```json
{
  "email": "newmember@example.com"
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "data": {
    "id": "g1",
    "members": [
      {
        "id": "1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      {
        "id": "2",
        "name": "New Member",
        "email": "newmember@example.com"
      }
    ]
  }
}
```

---

### 11. DELETE /api/groups/:id/members/:memberId
Remove member from group

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Member removed successfully"
}
```

---

### 12. GET /api/groups/my-group
Get current user's group

**Response: 200 OK**
```json
{
  "success": true,
  "data": {
    "id": "g1",
    "name": "AI Researchers",
    "description": "Working on machine learning project",
    "leaderId": "1",
    "members": [
      {
        "id": "1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      {
        "id": "2",
        "name": "Alice Johnson",
        "email": "alice@example.com"
      }
    ],
    "supervisorId": "3",
    "projectId": "p1",
    "status": "ACTIVE",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Supervisor Request Endpoints

### 13. GET /api/supervisors
Get all available supervisors

**Response: 200 OK**
```json
{
  "success": true,
  "data": [
    {
      "id": "2",
      "name": "Dr. Sarah Smith",
      "email": "sarah@example.com",
      "specialty": "Machine Learning",
      "maxProjects": 5,
      "currentProjects": 2,
      "availability": "AVAILABLE"
    }
  ]
}
```

---

### 14. POST /api/supervisor-requests
Create supervisor request

**Request Body:**
```json
{
  "supervisorId": "2",
  "projectTitle": "AI-Powered Recommendation System",
  "projectDescription": "Building an intelligent recommendation system using machine learning"
}
```

**Response: 201 Created**
```json
{
  "success": true,
  "data": {
    "id": "sr1",
    "groupId": "g1",
    "supervisorId": "2",
    "projectTitle": "AI-Powered Recommendation System",
    "projectDescription": "Building an intelligent recommendation system using machine learning",
    "status": "PENDING",
    "requestedAt": "2024-01-22T10:30:00Z"
  }
}
```

---

### 15. GET /api/supervisor-requests
Get all requests (filtered by role)

**Response: 200 OK**
```json
{
  "success": true,
  "data": [
    {
      "id": "sr1",
      "groupId": "g1",
      "group": {
        "id": "g1",
        "name": "AI Researchers",
        "members": [...]
      },
      "supervisorId": "2",
      "supervisor": {
        "id": "2",
        "name": "Dr. Sarah Smith",
        "email": "sarah@example.com"
      },
      "projectTitle": "AI-Powered Recommendation System",
      "projectDescription": "Building an intelligent recommendation system using machine learning",
      "status": "PENDING",
      "requestedAt": "2024-01-22T10:30:00Z"
    }
  ]
}
```

---

### 16. PUT /api/supervisor-requests/:id/approve
Approve supervisor request

**Request Body:**
```json
{
  "feedback": "Looking forward to supervising this project"
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "data": {
    "id": "sr1",
    "status": "APPROVED",
    "respondedAt": "2024-01-23T14:00:00Z"
  }
}
```

---

### 17. PUT /api/supervisor-requests/:id/reject
Reject supervisor request

**Request Body:**
```json
{
  "rejectionReason": "Too many projects already"
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "data": {
    "id": "sr1",
    "status": "REJECTED",
    "rejectionReason": "Too many projects already",
    "respondedAt": "2024-01-23T14:00:00Z"
  }
}
```

---

## Project Endpoints

### 18. GET /api/projects
Get all projects

**Response: 200 OK**
```json
{
  "success": true,
  "data": [
    {
      "id": "p1",
      "title": "AI-Powered Recommendation System",
      "description": "Building an intelligent recommendation system using machine learning",
      "groupId": "g1",
      "supervisorId": "2",
      "supervisor": {
        "id": "2",
        "name": "Dr. Sarah Smith",
        "email": "sarah@example.com"
      },
      "status": "IN_PROGRESS",
      "progress": 45,
      "milestones": [
        {
          "id": "m1",
          "title": "Project Proposal",
          "description": "Submit initial project proposal",
          "status": "COMPLETED",
          "dueDate": "2024-02-01",
          "hasSubmission": true,
          "needsReview": false
        }
      ],
      "createdAt": "2024-01-20T10:30:00Z",
      "updatedAt": "2024-02-15T14:20:00Z"
    }
  ]
}
```

---

### 19. GET /api/projects/:id
Get project by ID

**Response: 200 OK**
```json
{
  "success": true,
  "data": {
    "id": "p1",
    "title": "AI-Powered Recommendation System",
    "description": "Building an intelligent recommendation system using machine learning",
    "groupId": "g1",
    "supervisorId": "2",
    "status": "IN_PROGRESS",
    "progress": 45,
    "milestones": [...],
    "createdAt": "2024-01-20T10:30:00Z",
    "updatedAt": "2024-02-15T14:20:00Z"
  }
}
```

---

### 20. GET /api/projects/my-project
Get current user's project

**Response: 200 OK**
```json
{
  "success": true,
  "data": {
    "id": "p1",
    "title": "AI-Powered Recommendation System",
    "description": "Building an intelligent recommendation system using machine learning",
    "groupId": "g1",
    "supervisorId": "2",
    "status": "IN_PROGRESS",
    "progress": 45,
    "milestones": [...],
    "createdAt": "2024-01-20T10:30:00Z",
    "updatedAt": "2024-02-15T14:20:00Z"
  }
}
```

---

## Milestone Endpoints

### 21. GET /api/milestones
Get all milestones (for admin to configure default milestones)

**Response: 200 OK**
```json
{
  "success": true,
  "data": [
    {
      "id": "m1",
      "title": "Project Proposal",
      "description": "Submit initial project proposal",
      "order": 1,
      "isDefault": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### 22. POST /api/milestones
Create a new milestone (Admin only)

**Request Body:**
```json
{
  "title": "Project Proposal",
  "description": "Submit initial project proposal",
  "order": 1,
  "isDefault": true
}
```

**Response: 201 Created**
```json
{
  "success": true,
  "data": {
    "id": "m1",
    "title": "Project Proposal",
    "description": "Submit initial project proposal",
    "order": 1,
    "isDefault": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

## Submission Endpoints

### 23. POST /api/submissions
Upload a submission

**Request:** Multipart/form-data
```
file: <binary>
milestoneId: "m1"
groupId: "g1"
```

**Response: 201 Created**
```json
{
  "success": true,
  "data": {
    "id": "sub1",
    "milestoneId": "m1",
    "groupId": "g1",
    "fileName": "proposal.pdf",
    "fileUrl": "https://storage.example.com/submissions/sub1.pdf",
    "fileSize": 1024000,
    "status": "PENDING",
    "uploadedAt": "2024-01-31T10:30:00Z",
    "comments": []
  }
}
```

---

### 24. GET /api/submissions
Get all submissions (filtered by user role)

**Response: 200 OK**
```json
{
  "success": true,
  "data": [
    {
      "id": "sub1",
      "milestoneId": "m1",
      "milestone": {
        "id": "m1",
        "title": "Project Proposal"
      },
      "groupId": "g1",
      "group": {
        "id": "g1",
        "name": "AI Researchers"
      },
      "fileName": "proposal.pdf",
      "fileUrl": "https://storage.example.com/submissions/sub1.pdf",
      "fileSize": 1024000,
      "status": "APPROVED",
      "uploadedAt": "2024-01-31T10:30:00Z",
      "comments": [
        {
          "id": "c1",
          "author": "Dr. Sarah Smith",
          "authorId": "2",
          "text": "Excellent proposal! Clear objectives and methodology.",
          "date": "2024-02-01T09:00:00Z"
        }
      ]
    }
  ]
}
```

---

### 25. GET /api/submissions/:id
Get submission by ID

**Response: 200 OK**
```json
{
  "success": true,
  "data": {
    "id": "sub1",
    "milestoneId": "m1",
    "groupId": "g1",
    "fileName": "proposal.pdf",
    "fileUrl": "https://storage.example.com/submissions/sub1.pdf",
    "fileSize": 1024000,
    "status": "APPROVED",
    "uploadedAt": "2024-01-31T10:30:00Z",
    "comments": [...]
  }
}
```

---

### 26. PUT /api/submissions/:id/approve
Approve submission

**Response: 200 OK**
```json
{
  "success": true,
  "data": {
    "id": "sub1",
    "status": "APPROVED"
  }
}
```

---

### 27. PUT /api/submissions/:id/reject
Reject submission

**Request Body:**
```json
{
  "feedback": "Needs more details on methodology"
}
```

**Response: 200 OK**
```json
{
  "success": true,
  "data": {
    "id": "sub1",
    "status": "REJECTED"
  }
}
```

---

### 28. POST /api/submissions/:id/comments
Add comment to submission

**Request Body:**
```json
{
  "text": "Excellent work! The methodology is well thought out."
}
```

**Response: 201 Created**
```json
{
  "success": true,
  "data": {
    "id": "c1",
    "author": "Dr. Sarah Smith",
    "authorId": "2",
    "text": "Excellent work! The methodology is well thought out.",
    "date": "2024-02-15T10:30:00Z"
  }
}
```

---

## Chat Endpoints

### 29. GET /api/messages/:groupId
Get messages for a group

**Response: 200 OK**
```json
{
  "success": true,
  "data": [
    {
      "id": "msg1",
      "groupId": "g1",
      "senderId": "1",
      "senderName": "John Doe",
      "content": "Hey team! I've uploaded the proposal draft.",
      "timestamp": "2024-01-28T10:30:00Z",
      "isRead": true
    }
  ]
}
```

---

### 30. POST /api/messages
Send a new message

**Request Body:**
```json
{
  "groupId": "g1",
  "content": "Can we schedule a meeting this week?"
}
```

**Response: 201 Created**
```json
{
  "success": true,
  "data": {
    "id": "msg1",
    "groupId": "g1",
    "senderId": "1",
    "senderName": "John Doe",
    "content": "Can we schedule a meeting this week?",
    "timestamp": "2024-01-28T10:30:00Z",
    "isRead": false
  }
}
```

---

## Notification Endpoints

### 31. GET /api/notifications
Get user notifications

**Response: 200 OK**
```json
{
  "success": true,
  "data": [
    {
      "id": "n1",
      "userId": "1",
      "type": "COMMENT",
      "content": "Dr. Sarah Smith commented on your submission",
      "relatedId": "sub1",
      "isRead": false,
      "createdAt": "2024-02-01T09:00:00Z"
    },
    {
      "id": "n2",
      "userId": "1",
      "type": "REQUEST",
      "content": "Supervisor request approved",
      "relatedId": "sr1",
      "isRead": false,
      "createdAt": "2024-01-23T14:30:00Z"
    }
  ]
}
```

---

### 32. PUT /api/notifications/:id/read
Mark notification as read

**Response: 200 OK**
```json
{
  "success": true,
  "data": {
    "id": "n1",
    "isRead": true
  }
}
```

---

### 33. PUT /api/notifications/mark-all-read
Mark all notifications as read

**Response: 200 OK**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## Statistics Endpoints (Admin)

### 34. GET /api/admin/statistics
Get platform statistics (Admin only)

**Response: 200 OK**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalStudents": 120,
    "totalSupervisors": 25,
    "totalAdmins": 5,
    "totalGroups": 35,
    "totalProjects": 32,
    "totalPendingRequests": 8,
    "totalActiveProjects": 28,
    "totalCompletedProjects": 4
  }
}
```

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "details": "The requested resource could not be found"
  }
}
```

**Common HTTP Status Codes:**
- `200 OK` - Success
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `500 Internal Server Error` - Server error

---

## WebSocket Endpoints (Real-time)

### WS /api/ws
WebSocket connection for real-time updates

**Connection:**
```javascript
const ws = new WebSocket('ws://localhost:3000/api/ws');
```

**Events:**
- `new_message` - New chat message
- `notification` - New notification
- `submission_update` - Submission status changed
- `group_update` - Group updated

**Event Payload Example:**
```json
{
  "type": "new_message",
  "data": {
    "id": "msg1",
    "groupId": "g1",
    "senderId": "1",
    "senderName": "John Doe",
    "content": "Hello everyone!",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

---

## Authentication Token

Most endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Pagination

Endpoints that return lists support pagination:

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

End of API Documentation

