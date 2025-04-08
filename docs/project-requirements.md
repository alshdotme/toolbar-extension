# PRD: Chrome Extension Toolbar for Web Performance & Accessibility

## 1. Overview  

A Chrome extension toolbar providing:  

- Real-time Core Web Vitals monitoring  
- Accessibility scanning via axe-core  
- Local LaunchDarkly flag overrides  
- Future Microsoft SSO integration  

## 2. Core Features  

### 2.1 Performance Dashboard  

**Metrics**:  
• LCP, FID, CLS, INP (2s polling)  
• Color-coded thresholds (green/yellow/red)  
• Sparkline trend visualization  

**Snapshot Sharing**:  
• One-click capture  
• Encrypted shareable URLs  
• Annotation support  

### 2.2 Accessibility Scanner  

**Automated Checks**:  
• axe-core (WCAG 2.2 AA)  
• Automatic DOM change scanning  
• Element highlighting  

**Issue Management**:  
• Severity filtering (critical/moderate/low)  
• Deque University remediation links  
• "Ignore" functionality  

### 2.3 Flag Management (Phase 1)  

**Local Overrides**:  
• localStorage-based toggles  
• JSON import/export  
• Visual override indicator  

**Keyboard Controls**:  
• ⌘/Ctrl+F to search flags  
• Arrow keys to navigate  
• Space to toggle states  

## 3. Technical Implementation  

### 3.1 Architecture  

Flowchart representation:  
`graph TD`  
`A[Content Script] --> B[Performance Monitor]`  
`A --> C[axe-core Scanner]`  
`A --> D[Flag Override UI]`  
`D --> E[localStorage]`  

### 3.2 Code Implementation  

**Local Flag Override**:  
`function setLocalFlag(key, value) {`  
`const overrides = JSON.parse(localStorage.getItem('ld_overrides') || '{}');`  
`overrides[key] = value;`  
`localStorage.setItem('ld_overrides', JSON.stringify(overrides));`  
`}`  

**MSAL Config (Phase 2)**:  
`const msalConfig = {`  
`auth: {`  
`clientId: "YOUR_APP_ID",`  
`authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",`  
`redirectUri: chrome.identity.getRedirectURL()`  
`}`  
`};`  

## 4. UI Specifications  

### 4.1 Component Hierarchy  

```md  
ToolbarRoot (48px height)  
├── Branding  
├── PerformancePill  
├── A11yPill  
├── FlagsPill  
└── ContextMenu  
    ├── PerformancePanel  
    ├── A11yPanel  
    └── FlagsPanel  
```  

### 4.2 Responsive States  

| State      | Appearance         | Behavior               |  
|------------|--------------------|------------------------|  
| Default    | 48px slim bar      | Hover tooltips         |  
| Active     | 300px overlay      | Detailed controls      |  
| Local Mode | Orange border      | Override indicator     |  

## 5. Security  

### 5.1 Phase 1  

- Data stored in extension sandbox  
- No network calls for flags  
- Clean storage on uninstall  

### 5.2 Phase 2  

- Microsoft SSO via MSAL.js  
- JWT validation with roles  
- Token encryption at rest  

## 6. Roadmap  

### Phase 1 (4-6 weeks)  

1. Web Vitals monitoring  
2. axe-core integration  
3. Local flag overrides  
4. Snapshot sharing  

### Phase 2  

1. Microsoft SSO integration  
2. Role-based access control  
3. Audit logging  

## 7. Open Questions  

- Snapshot encryption method selection  
- Toolbar color scheme finalization  
- Internal review process workflow  

## 8. Appendix  

**Keyboard Shortcuts**:  

- `⌘/Ctrl+Shift+L`: Toggle toolbar  
- `Tab`: Cycle panels  
- `Escape`: Close active panel  

**Permissions**:  

- `activeTab`  
- `storage`  
- `scripting` (axe-core injection)  
