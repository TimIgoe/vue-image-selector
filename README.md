# Vue Image Selector

[![Vue](https://img.shields.io/badge/Vue-%3E3.x-brightgreen?color=91aac3&labelColor=3FB27F)](https://vuejs.org/)
![Yup](https://img.shields.io/badge/yup-1.4.0-blue?logo=yup)

![vue-image-selector-logo](https://github.com/medelm1/vue-image-selector/assets/60750140/b6eb74ef-19c5-4c32-b1e9-8d593939e6d5)

Vue Image Selector is a flexible Vue 3 component and composable for handling image selection, preview, and validation within Vue applications.

## Installation

Install the package using npm or yarn:

```bash
npm install @medelm/vue-image-selector
# or
yarn add @medelm/vue-image-selector
```

## Usage

__1. Setup Plugin in Your Vue App__

Import and use the plugin in your main application file (`main.js` or `main.ts`):

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import imageSelectorPlugin from '@medelm/vue-image-selector';
import '@medelm/vue-image-selector/style.css';

createApp(App)
  .use(imageSelectorPlugin)
  .mount('#app');
```

__2. Use the Component__

Use the `ImageSelector` component in your Vue components:

```html
<template>
  <ImageSelector v-bind="imageSelector" />
</template>

<script setup>
  import { useImageSelector } from '@medelm/vue-image-selector';

  const imageSelector = useImageSelector();

  // Optional: Handle callbacks or additional logic
</script>

<style scoped>
  /* Your scoped styles here */
</style>
```

__3. Customization__

- `Styling`: Customize the appearance using scoped CSS or by overriding classes in your project's stylesheets.
- `Callbacks`: Implement `onSelect` and `onReset` callbacks to handle image selection and reset events.

__4. Composable API__

The composable `useImageSelector` provides the following methods and reactive state:

- `select(event)`: Handles file input change and drag-and-drop events.
- `reset()`: Resets the image selection state.
- `onSelect(callback)`: Sets a callback function for when an image is selected.
- `onReset(callback)`: Sets a callback function for when the image selection is reset.
- `hasError()`: Checks if there is an error in image selection.
- `getError()`: Retrieves the error message, if any.
- `setError(errorMessage)`: Sets a custom error message.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or want to contribute code, please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License
