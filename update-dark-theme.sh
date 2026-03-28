#!/bin/bash

# Update all white backgrounds to dark theme
sed -i '' 's/background: white;/background: #1a1a1a;/g' styles-advanced.css
sed -i '' 's/background: var(--gray-50);/background: #141414;/g' styles-advanced.css
sed -i '' 's/background: #fff;/background: #1a1a1a;/g' styles-advanced.css

# Update text colors for dark backgrounds
sed -i '' 's/color: var(--gray-900);/color: #f1f5f9;/g' styles-advanced.css
sed -i '' 's/color: var(--gray-800);/color: #e2e8f0;/g' styles-advanced.css
sed -i '' 's/color: var(--gray-700);/color: #cbd5e1;/g' styles-advanced.css

# Update borders for dark theme
sed -i '' 's/border-color: var(--gray-200);/border-color: #2a2a2a;/g' styles-advanced.css
sed -i '' 's/border: 1px solid var(--gray-200);/border: 1px solid #2a2a2a;/g' styles-advanced.css

# Update specific component backgrounds
sed -i '' 's/.sidebar {/.sidebar { background: #0f0f0f;/g' styles-advanced.css
sed -i '' 's/.top-nav {/.top-nav { background: #151515;/g' styles-advanced.css

echo "Dark theme updates applied!"