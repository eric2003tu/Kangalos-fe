# Models and Endpoints Overview

## Prisma Models

The following models are defined in `prisma/schema.prisma`.

- **Attachment** – files uploaded for projects.
- **Category** – hierarchical tags for organizing projects.
- **OrganisationUnit** – represents colleges, schools, and departments.
- **Position** – job positions inside organisation units.
- **User** – application users with roles and assignments.
- **Role** – role-based access control roles.
- **Permission** – system permissions linked to roles.
- **UserPosition** – tracks user assignments to positions over time.
- **UserRole** – junction table linking users to roles.
- **RolePermission** – links roles to permissions.
- **Funder** – external funding entities.
- **Stakeholder** – organisations or people associated with projects.
- **StakeholderUser** – connects stakeholders with users.
- **Project** – core project entity.
- **ProjectAuthor** – links users as authors of projects.
- **ProjectReport** – periodic progress reports for projects.
- **ProjectCategory** – associates projects with categories.
- **ProjectFunder** – links projects to funders with amounts.
- **ProjectStakeholder** – links projects to stakeholders and roles.
- **Sdg** – sustainable development goal definitions.
- **ProjectSdg** – connects projects to SDGs.
- **Startup** – start-up company information derived from projects.
- **ProjectEvaluation** – evaluation records for projects.

## API Endpoints by Entity

### Application
1. **GET** /
2. **GET** /health

### Attachments (Attachment)
1. **GET** /attachments
2. **POST** /attachments
3. **DELETE** /attachments/:id
4. **GET** /attachments/:id
5. **PUT** /attachments/:id
6. **GET** /attachments/:id/download
7. **GET** /attachments/:id/metadata
8. **GET** /attachments/by-project/:projectId
9. **GET** /attachments/by-uploader/:userId

### Auth
1. **POST** /auth/forgot-password
2. **POST** /auth/login
3. **POST** /auth/register
4. **POST** /auth/reset-password
5. **POST** /auth/verify-email

### Categories (Category, ProjectCategory)
1. **GET** /categories
2. **POST** /categories
3. **DELETE** /categories/:id
4. **GET** /categories/:id
5. **PUT** /categories/:id
6. **GET** /categories/:id/children
7. **POST** /categories/:id/children
8. **GET** /categories/:id/parent
9. **GET** /categories/tree

### Evaluations (ProjectEvaluation)
1. **GET** /project-evaluations
2. **POST** /project-evaluations
3. **DELETE** /project-evaluations/:id
4. **GET** /project-evaluations/:id
5. **PUT** /project-evaluations/:id
6. **GET** /projects/:id/evaluations
7. **POST** /projects/:id/evaluations
8. **GET** /projects/:id/evaluations/summary
9. **GET** /evaluators/:userId/evaluations
10. **GET** /evaluations/pending

### Funders (Funder, ProjectFunder)
1. **GET** /funder
2. **POST** /funder
3. **DELETE** /funder/:id
4. **GET** /funder/:id
5. **PATCH** /funder/:id
6. **PUT** /funder/:id
7. **GET** /project-funder
8. **POST** /project-funder
9. **DELETE** /project-funder/:projectId/:funderId
10. **GET** /project-funder/:projectId/:funderId
11. **PATCH** /project-funder/:projectId/:funderId

### Organisation Units (OrganisationUnit)
1. **GET** /organisation-unit
2. **POST** /organisation-unit
3. **DELETE** /organisation-unit/:id
4. **GET** /organisation-unit/:id
5. **PATCH** /organisation-unit/:id
6. **GET** /organisation-unit/:id/children
7. **POST** /organisation-unit/:id/children
8. **GET** /organisation-unit/:id/hierarchy
9. **GET** /organisation-unit/:id/parent
10. **GET** /organisation-unit/:id/positions
11. **GET** /organisation-unit/:id/projects
12. **GET** /organisation-unit/:id/stakeholders
13. **GET** /organisation-unit/:id/users
14. **GET** /organisation-unit/tree

### Positions (Position)
1. **GET** /positions
2. **POST** /positions
3. **DELETE** /positions/:id
4. **GET** /positions/:id
5. **PATCH** /positions/:id
6. **PUT** /positions/:id
7. **GET** /positions/:id/occupants
8. **POST** /positions/:id/occupants
9. **DELETE** /positions/:id/occupants/:userId
10. **PUT** /positions/:id/occupants/:userId

### Project Authors (ProjectAuthor)
1. **GET** /project-author
2. **POST** /project-author
3. **DELETE** /project-author/:id
4. **GET** /project-author/:id
5. **PATCH** /project-author/:id

### Project Reports (ProjectReport)
1. **GET** /project-reports
2. **POST** /project-reports
3. **DELETE** /project-reports/:id
4. **GET** /project-reports/:id
5. **PATCH** /project-reports/:id
6. **PUT** /project-reports/:id
7. **GET** /project-reports/project/:projectId
8. **GET** /projects/:id/reports
9. **POST** /projects/:id/reports
10. **GET** /projects/:id/reports/latest
11. **GET** /projects/:id/reports/summary
12. **GET** /reports/by-period/:period
13. **GET** /reports/by-submitter/:userId
14. **GET** /reports/pending

### Projects (Project, ProjectStakeholder, ProjectCategory)
1. **GET** /projects
2. **POST** /projects/project
3. **DELETE** /projects/:id
4. **GET** /projects/:id
5. **PATCH** /projects/:id
6. **GET** /projects/search

### Project Stakeholders (ProjectStakeholder)
1. **GET** /project-stakeholders
2. **GET** /projects/:id/stakeholders
3. **POST** /projects/:id/stakeholders
4. **DELETE** /projects/:id/stakeholders/:stakeholderId
5. **PUT** /projects/:id/stakeholders/:stakeholderId

### SDGs (Sdg, ProjectSdg)
1. **GET** /project-sdgs
2. **GET** /projects/:id/sdgs
3. **POST** /projects/:id/sdgs
4. **DELETE** /projects/:id/sdgs/:sdg
5. **GET** /sdgs/projects/:sdg
6. **GET** /sdgs/statistics
7. **GET** /sdgs/coverage

### Roles (Role, RolePermission)
1. **GET** /roles
2. **POST** /roles
3. **DELETE** /roles/:id
4. **GET** /roles/:id
5. **PATCH** /roles/:id
6. **GET** /roles/:id/permissions
7. **POST** /roles/:id/permissions
8. **DELETE** /roles/:id/permissions/:permissionId

### Permissions (Permission)
1. **GET** /permissions
2. **POST** /permissions
3. **DELETE** /permissions/:id
4. **GET** /permissions/:id
5. **PATCH** /permissions/:id

### Stakeholders (Stakeholder, StakeholderUser)
1. **GET** /stakeholder
2. **POST** /stakeholder
3. **DELETE** /stakeholder/:id
4. **GET** /stakeholder/:id
5. **PATCH** /stakeholder/:id
6. **PUT** /stakeholder/:id
7. **GET** /stakeholder/:id/projects
8. **GET** /stakeholder/by-org-unit/:orgUnitId
9. **GET** /stakeholder/by-type/:stakeholderType

### Startups (Startup)
1. **GET** /startups
2. **POST** /startups
3. **DELETE** /startups/:id
4. **GET** /startups/:id
5. **PUT** /startups/:id
6. **GET** /startups/by-project/:projectId
7. **GET** /startups/by-year/:year
8. **GET** /startups/registered

### User Positions (UserPosition)
1. **GET** /user-positions
2. **POST** /user-positions
3. **DELETE** /user-positions/:userId/:positionId
4. **PUT** /user-positions/:userId/:positionId
5. **DELETE** /user-positions/:userId/:positionId/:startDate
6. **PATCH** /user-positions/:userId/:positionId/:startDate
7. **GET** /user-positions/position/:positionId
8. **GET** /user-positions/user/:userId

### User Roles (UserRole)
1. **GET** /user-roles
2. **POST** /user-roles
3. **DELETE** /user-roles/:userId/:roleId
4. **GET** /user-roles/role/:roleId
5. **GET** /user-roles/user/:userId

### Users (User)
1. **GET** /users
2. **POST** /users
3. **DELETE** /users/:id
4. **GET** /users/:id
5. **PATCH** /users/:id
6. **GET** /users/:id/positions
7. **GET** /users/:id/projects
8. **GET** /users/:id/roles
9. **POST** /users/:id/roles
10. **DELETE** /users/:id/roles/:roleId
11. **GET** /users/by-org-unit/:orgUnitId
12. **GET** /users/by-type/:userType
13. **GET** /users/me
14. **PUT** /users/me
15. **GET** /users/search

