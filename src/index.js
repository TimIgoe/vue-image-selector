import ImageSelector from './components/ImageSelector.vue';
import { useImageSelector } from './composables/useImageSelector';

export { useImageSelector };

export default {
    install(app, options) {
        app.component('ImageSelector', ImageSelector);
        app.config.globalProperties.$useImageSelector = useImageSelector;
    }
};