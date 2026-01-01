## 1. Use Expo's Built-in APIs (Lightest Option)

Expo SDK has many built-in features that are already optimized:

- Camera, Location, Notifications, etc.
- These are lighter than third-party alternatives
- Check what's available: `npx expo install expo-camera expo-location` etc.

## What to Avoid

The biggest culprits:

- 🔴 Heavy UI libraries (can add 5-10MB)
- 🔴 Unused dependencies
- 🔴 Large uncompressed images/videos
- 🔴 Multiple navigation libraries
- 🔴 Lodash (use lodash-es or specific imports)

## My Recommendation

**Start with the blank template (which you have) and:**

1. Use Expo's built-in components first
2. Only add dependencies when absolutely needed
3. Avoid "kitchen sink" UI libraries
4. Keep images optimized
5. Run `npx expo install` for Expo packages (ensures compatibility)
