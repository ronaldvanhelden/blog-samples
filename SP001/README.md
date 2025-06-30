# SPFx Dependency Injection Sample Project

This sample project demonstrates the concepts covered in the article "SPFx Dependency Injection: Mastering ServiceScope for Enterprise Applications".

## Project Structure

```
SP001/
├── shared-services-lib/           # SPFx Library Package (shared services)
├── webpart-consumer-a/           # Web Part Package A (consumes shared services)
├── webpart-consumer-b/           # Web Part Package B (consumes shared services)
├── global-servicekey-demo/       # GlobalServiceKey implementation demo
└── README.md                     # This file
```

## What You'll Learn

- **Custom Service Creation**: Build services that integrate with SPFx ServiceScope
- **Library Package Sharing**: Create SPFx library packages for cross-package service sharing
- **GlobalServiceKey Pattern**: Alternative approach for service sharing
- **Testing Patterns**: Test services with proper dependency injection
- **ServiceScope Lifecycle**: Understand `whenFinished()` and child scope patterns

## Setup Instructions

### Prerequisites

- Node.js 16.x or 18.x
- npm 6.x or higher
- SPFx CLI: `npm install -g @microsoft/generator-sharepoint`

### Installation Steps

1. **Clone and Setup**
   ```bash
   cd /path/to/SP001
   ```

2. **Build Shared Services Library First**
   ```bash
   cd shared-services-lib
   npm install
   npm run build
   gulp bundle --ship
   gulp package-solution --ship
   ```

3. **Install Library in Consumer Packages**
   ```bash
   cd ../webpart-consumer-a
   npm install ../shared-services-lib
   npm install
   npm run build
   
   cd ../webpart-consumer-b
   npm install ../shared-services-lib
   npm install
   npm run build
   ```

4. **GlobalServiceKey Demo**
   ```bash
   cd ../global-servicekey-demo
   npm install
   npm run build
   ```

## Key Demonstrations

### 1. Custom Services (`shared-services-lib`)
- **IDataService**: Interface definition for data operations
- **DataService**: Implementation with SPHttpClient integration
- **EnterpriseListService**: Advanced service with Graph API and caching

### 2. Library Package Sharing
- **Package A** sets cached data
- **Package B** accesses the same cached data
- Demonstrates true singleton behavior across packages

### 3. GlobalServiceKey Pattern
- Alternative service sharing without library packages
- Window-based service key registry
- Load order management

### 4. Testing Examples
- Mock dependencies, not ServiceScope
- Real ServiceScope with mock implementations
- Unit test examples for each service

## Running the Samples

1. **Serve Library Package**
   ```bash
   cd shared-services-lib
   gulp serve
   ```

2. **Serve Consumer Packages** (in separate terminals)
   ```bash
   cd webpart-consumer-a
   gulp serve
   
   cd webpart-consumer-b
   gulp serve
   ```

3. **Add Web Parts to Test Page**
   - Create a SharePoint page
   - Add both consumer web parts
   - Observe shared service behavior in browser console

## Key Files to Review

- `shared-services-lib/src/services/` - Service implementations
- `webpart-consumer-a/src/webparts/` - Service consumption patterns
- `global-servicekey-demo/src/utils/` - GlobalServiceKey implementation
- `*/src/__tests__/` - Testing patterns

## Expected Behavior

- Consumer A sets cached data: `userPreferences = { theme: 'dark' }`
- Consumer B reads the same data from shared cache
- Both web parts use the same service instance
- Console logs show singleton behavior

## Troubleshooting

**Library Package Not Found**
- Ensure library is built before installing in consumers
- Check `package.json` dependencies point to correct local path

**Services Not Shared**
- Verify library package has `libraryId` in `package-solution.json`
- Ensure both packages import from the same library

**Build Errors**
- Run `npm run build` in library first
- Clear node_modules and reinstall if needed

## Article Reference

This sample accompanies the article: [SPFx Dependency Injection: Mastering ServiceScope for Enterprise Applications](../../../drafts/SP001-spfx-dependency-injection-servicescope.md)