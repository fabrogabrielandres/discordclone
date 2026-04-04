# API Endpoints & Hooks Reference

## Endpoints

| Endpoint | Method | Hook |
|----------|--------|------|
| `/api/register-user` | POST | `useStreamState` |
| `/api/token` | POST | `useStreamState` |

## Console Commands (Development)

```javascript
// Find hooks for an endpoint
window.__streamDebug.findHooks('/api/token')

// Show all relationships
window.__streamDebug.showRelations()

// View all endpoints
console.table(window.__streamDebug.endpoints)