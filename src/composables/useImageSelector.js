import { reactive } from 'vue';
import * as yup from 'yup';

export function useImageSelector(customCallbacks = {}) {

	const state = reactive({
		image: null,
        loading: false,
        error: null,
        touched: false,
	});

	// Reactive callbacks for onChange and onReset
    const callbacks = reactive({
        onChange: customCallbacks.onChange || null,
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

    // Function to set onChange callback
    function onChange(callback) {
        callbacks.onChange = callback;
    }

    // Function to set onReset callback
    function onReset(callback) {
        callbacks.onReset = callback;
    }

    // Function to handle image change event
    async function change(event) {
    	if (event.target.files.length > 0) {
            try {
                await imageValidationSchema.validate({ image: event.target.files[0] });
                state.image = event.target.files[0];
                state.touched = true;
                state.error = null;

                // Call onChange callback if provided
                if (typeof callbacks.onChange === 'function') {
                    callbacks.onChange(state.image);
                }
            } catch(error) {
                state.error = error.errors[0];
            }
        }
    }

    // Function to reset image selector state
    function reset() {
        state.image = null;
        state.loading = false;
        state.error = null;
        state.touched = false;

        // Call onReset callback if provided
        if (typeof callbacks.onReset === 'function') {
            callbacks.onReset();
        }
    }

    // Function to check if image selector is in loading state
    function isLoading() {
        return state.loading;
    }

    // Function to set loading state of image selector
    function setLoading(value) {
        state.loading = value;
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
    	change,
    	reset,
    	onChange,
    	onReset,
    	isLoading,
    	setLoading,
    	hasError,
    	getError,
    	setError,
    	state,
    }

};