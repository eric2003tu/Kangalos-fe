# Categories Hierarchy

- Implemented full CRUD UI for categories with hierarchical tree similar to organisation units.
- Added category table with edit, add child and delete dialogs.
- Created transformers to reuse organization tree component for categories.
- Populated categories dashboard page with tree and table view.
- Added multilingual translations for new category texts.
- Moved category data fetching into sidebar and table components with explicit error handling for empty results.
- Added optional `includeChildren` flag to category queries to retrieve child records in a single request.
