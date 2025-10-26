# Graduation Project Management Platform - Complete Specification

## Project Overview
Build a comprehensive graduation project management platform that facilitates group-based academic projects by providing students, supervisors, and administrators with tools to collaborate, manage progress, and communicate effectively. The platform should be built using **React**, **TypeScript**, **Tailwind CSS**, and utilize **shadcn/ui components**.

## Technical Stack
- **Frontend Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: shadcn/ui component library
- **Icons**: lucide-react
- **State Management**: React Context API
- **Data Storage**: localStorage (for prototype) with preparation for backend integration
- **Notifications**: sonner@2.0.3 for toast notifications
- **Design**: Responsive, mobile-first, clean and minimal UI

## User Roles & Authentication

### Three User Roles:
1. **STUDENT** - Can create/join groups, submit work, communicate with team
2. **SUPERVISOR** - Manages project requests, provides feedback, monitors progress
3. **ADMIN** - Oversees all activities, manages users and system settings

### Authentication Features:
- Login and Registration pages with role selection
- JWT-based authentication (prepared for backend)
- Role-based routing and dashboard access
- Session persistence using localStorage
- Demo accounts for testing:
  - Student: student@test.com / password
  - Supervisor: supervisor@test.com / password
  - Admin: admin@test.com / password

## Core Features

### 1. Group Management (Students)
**Group Size**: 2-6 members per group

**Features**:
- **Create Group**: 
  - Group name and description
  - Automatic leader assignment (creator becomes leader)
  - Leader indicated with crown icon
- **Add Members**: 
  - Invite by email address
  - Send invitations to other students
- **Remove Members**: 
  - Only group leader can remove members
  - Leader cannot be removed
- **Join Group**: 
  - Join existing groups using invite code
  - Accept group invitations
- **View Group Members**: 
  - Display member avatars (initials)
  - Show member names and emails
  - Highlight group leader
- **Member Count Badge**: Display current number of members

### 2. Supervisor Request System

**Student Actions**:
- **Browse Supervisors**: 
  - View available supervisors
  - See supervisor specialties (Machine Learning, Web Development, Mobile Development, Data Science, etc.)
  - View supervisor contact information
- **Send Supervisor Request**: 
  - Select supervisor from dropdown
  - Submit supervision request for group project
  - Include project details
- **Request Status Tracking**: View status of sent requests

**Supervisor Actions**:
- **View Pending Requests**: 
  - See all incoming supervision requests
  - View group details (name, members)
  - View project details (title, description)
  - See request timestamp
- **Approve/Reject Requests**: 
  - Accept or decline supervision requests
  - Provide feedback/reason for rejection
- **Request Dashboard**: 
  - Counter for pending requests
  - Filter by status (Pending, Approved, Rejected)

**Admin Oversight**:
- **Monitor All Requests**: View all supervision requests in the system
- **Request Analytics**: Track approval/rejection rates
- **View Request Details**: Access full request history and status

### 3. Project Milestone Tracking

**Default Milestones** (Admin configurable):
1. Project Proposal
2. Literature Review
3. System Design
4. Implementation
5. Final Report

**Milestone Features**:
- **Status Types**: PENDING, IN_PROGRESS, COMPLETED
- **Due Dates**: Set and track deadlines for each milestone
- **Progress Tracking**: 
  - Visual progress bar
  - Percentage completion
  - Completed vs. total milestones counter
- **Timeline View**: 
  - Chronological display of milestones
  - Visual indicators (icons) for status
  - Connected timeline with vertical lines
- **Milestone Details**: 
  - Title and description
  - Due date display
  - Status badge with color coding
  - Upload requirements

### 4. Submission & File Management

**Student Submission Features**:
- **Upload Files**: 
  - Upload submissions for each milestone
  - Support for various file types (PDF, ZIP, etc.)
  - File size display
  - Upload timestamp
- **Submission Status**: 
  - PENDING (awaiting review)
  - APPROVED (accepted by supervisor)
  - REJECTED (needs revision)
  - IN_REVIEW (being reviewed)
- **View Submissions**: 
  - List all submitted work
  - File name and type display
  - Submission date
  - Current status badge
- **Download Submissions**: Access previously uploaded files

**Supervisor Review Features**:
- **Review Queue**: 
  - List of submissions needing review
  - Filter by project/group
  - Priority indicators
- **Add Comments/Feedback**: 
  - Comment on submissions
  - Provide detailed feedback
  - Request revisions
- **Approve/Reject Submissions**: 
  - Accept quality work
  - Request changes with explanations
- **Feedback Display**: 
  - Show supervisor name
  - Timestamp for feedback
  - Feedback text in highlighted card
- **Download Submissions**: Access student work for review

### 5. Real-time Group Chat

**Chat Features**:
- **Message Interface**: 
  - Clean, modern chat UI
  - Message bubbles (different colors for sender/receiver)
  - User initials in circular avatars
- **Send Messages**: 
  - Text input field
  - Send button
  - Submit on Enter key
- **Message Display**: 
  - Sender name (or "You" for current user)
  - Message content
  - Timestamp (HH:MM format)
  - Different styling for own messages vs. others
- **Auto-scroll**: Automatically scroll to latest message
- **Online Status**: 
  - Show number of online group members
  - Green indicator for online status
- **Message History**: 
  - Persistent chat history
  - Load previous messages
  - Scroll through conversation
- **Real-time Updates**: Prepare for WebSocket integration

### 6. Notification System

**Notification Types**:
1. **COMMENT**: New supervisor feedback on submissions
2. **REQUEST**: Supervision request status updates
3. **SUBMISSION**: New submissions from students (for supervisors)
4. **MILESTONE**: Milestone deadline reminders
5. **GROUP**: Group membership changes

**Notification Features**:
- **Notification Panel**: 
  - Bell icon with unread count badge
  - Dropdown panel with notification list
  - Maximum height with scroll
- **Notification Items**: 
  - Type-specific icons (different colors)
  - Notification content/message
  - Relative timestamp ("2h ago", "1d ago", "Just now")
  - Read/unread state (blue background for unread)
  - Blue dot indicator for unread
- **Actions**: 
  - Mark individual as read
  - Mark all as read button
  - Remove/dismiss notifications
  - Click to navigate to relevant section
- **Empty State**: 
  - Display when no notifications
  - Bell icon placeholder
  - "No notifications" message

### 7. Role-Based Dashboards

#### Student Dashboard
**Tabs**:
1. **Overview**: 
   - Summary cards (Group Status, Project Progress, Supervisor Info)
   - Recent activity feed
   - Quick stats
2. **My Group**: 
   - Full group management interface
   - Member list and actions
   - Supervisor request functionality
3. **Project**: 
   - Project details and description
   - Milestone timeline view
   - Progress tracking
   - Supervisor information
4. **Submissions**: 
   - Upload interface for each milestone
   - Submission history
   - View supervisor feedback
   - Download previous submissions
5. **Group Chat**: 
   - Real-time messaging interface
   - Full chat functionality

**Header**:
- App logo and title
- Welcome message with user name
- Notification bell with count
- Logout button

#### Supervisor Dashboard
**Tabs**:
1. **Overview**: 
   - Stats cards (Pending Requests, Active Projects, Reviews Needed, Total Students)
   - Recent activity feed
   - Quick metrics
2. **Requests**: 
   - List of supervision requests
   - Group and project details
   - Approve/Reject buttons
   - Request metadata (timestamp, status)
3. **My Projects**: 
   - List of supervised projects
   - Progress indicators
   - Milestone tracking per project
   - Links to review submissions
4. **Reviews**: 
   - Submission review queue
   - File details
   - Add comment interface
   - Download and review files

**Header**:
- Supervisor icon and title
- Welcome message
- Notification panel
- Logout button

#### Admin Dashboard
**Tabs**:
1. **Overview**: 
   - System statistics (Total Users, Groups, Projects, Pending Requests)
   - Recent activity log
   - System health monitoring
   - Platform analytics
2. **Users**: 
   - User management table
   - Search functionality
   - Filter by role
   - Add/Edit/Delete users
   - User status display
   - Role icons and badges
3. **Groups**: 
   - Group management table
   - View all groups
   - Group members list
   - Assigned supervisor
   - Project association
   - Group status
   - Edit/Delete actions
4. **Requests**: 
   - Monitor all supervision requests
   - Filter by status
   - View request details
   - Override approval/rejection
5. **Settings**: 
   - Default milestones configuration
   - Add/Edit/Delete milestones
   - System-wide settings
   - Platform configuration

**Header**:
- Admin shield icon
- Platform name
- User welcome
- Logout button

## UI/UX Design Requirements

### Design System
- **Color Scheme**: 
  - Primary: Blue (#2563eb, #3b82f6)
  - Success: Green (#22c55e)
  - Warning: Orange (#f97316)
  - Error: Red (#ef4444)
  - Background: Light gray (#f9fafb)
  - Card background: White (#ffffff)
- **Typography**: 
  - Use default globals.css typography settings
  - No manual font size/weight classes unless specified
  - Clean, readable fonts
- **Spacing**: Consistent padding and margins using Tailwind spacing scale
- **Borders**: Subtle borders (border-gray-200) for cards and separators
- **Shadows**: Minimal shadows (shadow-sm) for depth
- **Border Radius**: Rounded corners (rounded-lg) for modern look

### Components to Use (shadcn/ui)
- **Card**: Primary container for content sections
- **Button**: All interactive actions
- **Input**: Form fields and search
- **Textarea**: Multi-line text input
- **Badge**: Status indicators, counts, labels
- **Tabs**: Navigation within dashboards
- **Dialog**: Modal windows for create/edit actions
- **Select**: Dropdown selections
- **Table**: Data display (users, groups, requests)
- **Progress**: Visual progress indicators
- **Popover**: Notification panel
- **Alert**: Important messages
- **Skeleton**: Loading states
- **Avatar**: User representation (fallback with initials)
- **Separator**: Visual dividers
- **Label**: Form field labels
- **Switch**: Toggle settings
- **Checkbox**: Multi-select options

### Responsive Design
- **Mobile First**: Design for mobile, enhance for desktop
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Responsive Grids**: 
  - 1 column on mobile
  - 2-3 columns on tablet
  - 3-4 columns on desktop
- **Navigation**: 
  - Hamburger menu on mobile
  - Full tabs on desktop
- **Cards**: Stack vertically on mobile, grid on desktop

### Interactions & States
- **Loading States**: 
  - Spinner for initial page load
  - Skeleton loaders for content
  - Button loading states with text change
- **Empty States**: 
  - Meaningful messages
  - Helpful icons
  - Action suggestions
- **Error States**: 
  - Toast notifications for errors
  - Inline validation messages
  - Clear error descriptions
- **Success Feedback**: 
  - Toast notifications
  - Success badges
  - Visual confirmations
- **Hover Effects**: 
  - Button hover states
  - Card hover effects
  - Link underlines
- **Disabled States**: Grayed out, no pointer events

## Data Structure & Models

### User Model
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'SUPERVISOR' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}
```

### Group Model
```typescript
interface Group {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  members: Array<{
    id: string;
    name: string;
    email: string;
  }>;
  supervisorId?: string;
  projectId?: string;
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED';
  createdAt: string;
}
```

### Project Model
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  groupId: string;
  supervisorId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    dueDate: string;
    hasSubmission: boolean;
    needsReview: boolean;
  }>;
  progress: number; // 0-100
  createdAt: string;
  updatedAt: string;
}
```

### Supervisor Request Model
```typescript
interface SupervisorRequest {
  id: string;
  groupId: string;
  supervisorId: string;
  projectTitle: string;
  projectDescription: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
  respondedAt?: string;
  rejectionReason?: string;
}
```

### Submission Model
```typescript
interface Submission {
  id: string;
  milestoneId: string;
  groupId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
  uploadedAt: string;
  comments: Array<{
    id: string;
    author: string;
    authorId: string;
    text: string;
    date: string;
  }>;
}
```

### Chat Message Model
```typescript
interface Message {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}
```

### Notification Model
```typescript
interface Notification {
  id: string;
  userId: string;
  type: 'COMMENT' | 'REQUEST' | 'SUBMISSION' | 'MILESTONE' | 'GROUP';
  content: string;
  relatedId?: string; // ID of related entity
  isRead: boolean;
  createdAt: string;
}
```

### Supervisor Model
```typescript
interface Supervisor {
  id: string;
  name: string;
  email: string;
  specialty: string; // e.g., "Machine Learning", "Web Development"
  maxProjects: number;
  currentProjects: number;
  availability: 'AVAILABLE' | 'LIMITED' | 'UNAVAILABLE';
}
```

## Component Structure

### File Organization
```
/src
  /components
    /ui                    # shadcn/ui components
    AuthContext.tsx        # Authentication context provider
    Login.tsx             # Login and registration page
    StudentDashboard.tsx  # Student dashboard container
    SupervisorDashboard.tsx # Supervisor dashboard container
    AdminDashboard.tsx    # Admin dashboard container
    GroupManagement.tsx   # Group CRUD operations
    ProjectView.tsx       # Project details and timeline
    ChatInterface.tsx     # Real-time messaging component
    NotificationPanel.tsx # Notification dropdown
  App.tsx                 # Main app component with routing
  /styles
    globals.css           # Global styles and Tailwind config
```

### Key Components to Build

1. **AuthContext** - Authentication state management
2. **Login** - Login/Register with role selection
3. **StudentDashboard** - Full student interface with tabs
4. **SupervisorDashboard** - Full supervisor interface with tabs
5. **AdminDashboard** - Full admin interface with tabs
6. **GroupManagement** - Create, join, manage groups
7. **ProjectView** - Project details, milestones, timeline
8. **ChatInterface** - Real-time group chat
9. **NotificationPanel** - Notification dropdown with actions
10. **SubmissionUpload** - File upload with drag & drop
11. **SupervisorRequestForm** - Request supervision dialog
12. **MilestoneCard** - Individual milestone display
13. **ActivityFeed** - Recent activity timeline
14. **StatsCard** - Dashboard statistics display
15. **UserTable** - Admin user management
16. **GroupTable** - Admin group management

## Functional Requirements

### Authentication Flow
1. User lands on login page
2. Can switch between login and registration
3. Registration requires: name, email, password, role selection
4. Login requires: email, password
5. On successful auth, store user in localStorage
6. Route to appropriate dashboard based on role
7. Persist session across page refreshes
8. Logout clears session and returns to login

### Student Workflow
1. Register/Login as student
2. Create or join a group (if not in one)
3. Add group members via email
4. Browse available supervisors
5. Request supervisor for project
6. Wait for approval
7. View project milestones
8. Upload submissions for milestones
9. Receive feedback from supervisor
10. Communicate via group chat
11. Track project progress

### Supervisor Workflow
1. Register/Login as supervisor
2. View incoming supervision requests
3. Review group and project details
4. Approve or reject requests
5. Monitor supervised projects
6. Review student submissions
7. Provide feedback and comments
8. Track multiple project progresses
9. Receive notifications for new submissions

### Admin Workflow
1. Login as admin
2. View system-wide statistics
3. Manage all users (add, edit, delete)
4. Monitor all groups and projects
5. Oversee all supervision requests
6. Configure default milestones
7. View system health and analytics
8. Access all platform data

## Mock Data Requirements

For the prototype, create comprehensive mock data:

- **5-10 Mock Students**
- **3-5 Mock Supervisors** with different specialties
- **1-2 Mock Admins**
- **3-5 Mock Groups** with varying member counts
- **2-4 Mock Projects** at different progress stages
- **5-10 Mock Supervisor Requests** with different statuses
- **Multiple Mock Submissions** with comments/feedback
- **10-20 Mock Chat Messages** per group
- **10-15 Mock Notifications** for each role

## Future Backend Integration Preparation

Structure the code to easily integrate with a backend:

### API Structure (to be implemented)
```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
GET    /api/groups
POST   /api/groups
PUT    /api/groups/:id
DELETE /api/groups/:id
POST   /api/groups/:id/members
DELETE /api/groups/:id/members/:memberId
GET    /api/supervisors
POST   /api/requests
GET    /api/requests
PUT    /api/requests/:id
GET    /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
POST   /api/submissions
GET    /api/submissions
PUT    /api/submissions/:id
POST   /api/submissions/:id/comments
GET    /api/messages/:groupId
POST   /api/messages
GET    /api/notifications
PUT    /api/notifications/:id/read
```

### Service Layer Pattern
Create service files that currently use mock data but can be easily swapped:
- `authService.ts`
- `userService.ts`
- `groupService.ts`
- `projectService.ts`
- `submissionService.ts`
- `chatService.ts`
- `notificationService.ts`

### WebSocket Preparation
Prepare for real-time features:
- Chat messages
- Notifications
- Online status
- Live updates

## Accessibility Requirements
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management in modals
- Screen reader friendly
- Sufficient color contrast
- Clear focus indicators

## Performance Considerations
- Lazy load components where appropriate
- Optimize re-renders with React.memo
- Use proper keys in lists
- Debounce search inputs
- Paginate large lists
- Optimize images
- Code splitting for dashboards

## Testing Scenarios

### Manual Testing Checklist
- [ ] User can register with all three roles
- [ ] User can login with correct credentials
- [ ] User sees appropriate dashboard for their role
- [ ] Student can create a group
- [ ] Student can add members to group
- [ ] Student can request a supervisor
- [ ] Supervisor can view pending requests
- [ ] Supervisor can approve/reject requests
- [ ] Student can upload submissions
- [ ] Supervisor can review submissions
- [ ] Supervisor can add comments/feedback
- [ ] Group chat sends and displays messages
- [ ] Notifications appear and can be managed
- [ ] Admin can view all users
- [ ] Admin can manage groups
- [ ] Admin can view all requests
- [ ] Admin can configure milestones
- [ ] Responsive design works on mobile
- [ ] Session persists on page refresh
- [ ] Logout clears session properly

## Error Handling
- Display user-friendly error messages
- Toast notifications for errors
- Validation feedback for forms
- Network error handling
- Loading states for async operations
- Graceful degradation
- Empty states for no data

## Additional Features (Nice to Have)
- Profile editing
- Password reset
- Email notifications (preparation)
- File preview before download
- Drag & drop file upload
- Advanced search and filtering
- Export data (CSV, PDF)
- Dark mode
- Activity logs
- Project templates
- Milestone templates
- Bulk operations (admin)
- Advanced analytics dashboard

## Success Criteria

The platform should:
1. ✅ Support all three user roles with distinct interfaces
2. ✅ Allow students to form groups of 2-6 members
3. ✅ Enable supervisor request and approval workflow
4. ✅ Track project progress through milestones
5. ✅ Support file submissions with feedback
6. ✅ Provide real-time group chat
7. ✅ Display relevant notifications for all users
8. ✅ Work responsively on all device sizes
9. ✅ Persist user sessions
10. ✅ Use clean, modern, and intuitive UI

## Implementation Notes

- Use TypeScript for type safety
- Follow React best practices and hooks
- Use functional components throughout
- Implement proper error boundaries
- Add loading states for better UX
- Use environment variables for configuration
- Comment complex logic
- Keep components focused and reusable
- Follow consistent naming conventions
- Organize imports properly
- Use proper TypeScript interfaces/types
- Implement proper form validation
- Handle edge cases (empty states, errors, loading)
- Use meaningful variable and function names
- Keep functions small and focused
- Avoid prop drilling (use Context where appropriate)

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests (when implemented)
npm test
```

## Essential Dependencies
```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "latest",
    "sonner": "2.0.3",
    "react-hook-form": "7.55.0"
  }
}
```

---

This specification covers every feature, component, and interaction in your graduation project management platform. Use this as a comprehensive guide for any AI code generator to recreate or enhance the system.
