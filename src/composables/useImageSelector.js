import { reactive } from 'vue';
import * as yup from 'yup';

export function useImageSelector(customCallbacks = {}) {

	const state = reactive({
		image: null,
        error: null,
        touched: false,
	});

	// Reactive callbacks for onSelect and onReset
    const callbacks = reactive({
        onSelect: customCallbacks.onSelect || null,
        onReset: customCallbacks.onReset || null,
    });

    // Yup validation schema for image selection
    const imageValidationSchema = yup.object({
        image: yup
            .mixed()
            .test('fileFormat', 'Unsupported file format', (value) => {
                if (!value) {
                    return true;
                }
                const allowedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const fileExtension = value.name.split('.').pop().toLowerCase();
                return allowedFormats.includes(fileExtension);
            })
            .test('fileSize', 'File size is too large', (value) => {
                if (!value) {
                    return true;
                }
                const maxFileSize = 5 * 1024 * 1024; // 5 MB
                return value.size <= maxFileSize;
            })
            .required('Please select an image file')
            .label('Image'),
    });

    // Function to set onSelect callback
    function onSelect(callback) {
        callbacks.onSelect = callback;
    }

    // Function to set onReset callback
    function onReset(callback) {
        callbacks.onReset = callback;
    }

    async function select(event) {
        let file;

        if (event.type === 'change') {
            file = event.target.files[0];
        } else if (event.type === 'drop') {
            file = event.dataTransfer.files[0];
        }

        if (!file) return;

        try {
            await imageValidationSchema.validate({ image: file });

            state.image = file;
            state.touched = true;
            state.error = null;

            // Call onSelect callback if provided
            if (typeof callbacks.onSelect === 'function') {
                callbacks.onSelect(state.image);
            }
        } catch (error) {
            state.error = error.errors[0];
        }
    }

    // Function to reset image selector state
    function reset() {
        state.image = null;
        state.error = null;
        state.touched = false;

        // Call onReset callback if provided
        if (typeof callbacks.onReset === 'function') {
            callbacks.onReset();
        }
    }

    // Function to check if there is an error in image selection
    function hasError() {
        return !!state.error; // Check if error exists
    }

    // Function to get the error message
    function getError() {
        return state.error;
    }

    // Function to set a custom error message
    function setError(errorMessage) {
        state.error = errorMessage;
    }

    // Return public API of the composable
    return {
    	select,
    	reset,
    	onSelect,
    	onReset,
    	hasError,
    	getError,
    	setError,
    	state,
    }

};