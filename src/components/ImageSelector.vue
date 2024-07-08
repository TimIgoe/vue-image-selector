<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    change: {
    	type: Function,
    	required: true,
    },
    reset: {
    	type: Function,
    	required: true,
    },
    hasError: {
    	type: Function,
    	required: true,
    },
    getError: {
    	type: Function,
    	required: true,
    },
    state: {
    	type: Object,
    	required: true,
    }
});

const fileInput = ref(null);

const previewUrl = () => {
    return props.state.image ? URL.createObjectURL(props.state.image) : '';
};

</script>
<template>
    <div class="image-selector__wrapper">
        <div class="image-selector__inner">
        	<div v-if="props.state.image" class="image-selector__reset-btn" @click="props.reset">
        		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
				</svg>
        	</div>
            <img v-if="props.state.image" class="image-selector__img" :src="previewUrl()" alt="" @click="() => fileInput.click()">
            <div v-else class="image-selector__placeholder" @click="() => fileInput.click()">
    			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span>Select an image</span>
            </div>
            <input @change="(event) => props.change(event)" type="file" class="image-selector__file-input" ref="fileInput" />
        </div>
        <div v-if="props.hasError()" class="image-selector__error-wrapper">
        	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
			</svg>
            <p class="image-selector__error-message">{{ props.getError() }}</p>
        </div>
    </div>
</template>
<style scoped>
.image-selector__wrapper {
    position: relative;
    margin: 0;
    padding: 0;
    max-width: 400px;
}

.image-selector__wrapper .image-selector__inner {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    border: 2px dashed #D4D4D4;
    border-radius: 6px;
}

.image-selector__wrapper .image-selector__reset-btn {
	position: absolute;
	top: 4px;
	right: 4px;
}

.image-selector__wrapper .image-selector__reset-btn > svg {
	width: 28px;
	color: grey;
	cursor: pointer;
}

.image-selector__wrapper .image-selector__reset-btn > svg:hover {
	color: #000;
}

.image-selector__wrapper .image-selector__inner>img {
    margin: 0;
    padding: 0;
    cursor: pointer;
    width: 100%;
    vertical-align: bottom;
}

.image-selector__wrapper .image-selector__placeholder {
	width: 100%;
	height: 100%;
	display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    cursor: pointer;
}

.image-selector__wrapper .image-selector__placeholder > svg {
	width: 64px;
	margin: 0;
	padding: 0;
}

.image-selector__wrapper .image-selector__placeholder > span {
	font-size: 16px;
}

.image-selector__wrapper .image-selector__inner>input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
}

.image-selector__wrapper .image-selector__error-wrapper {
    margin-top: 4px;
    display: flex;
    align-items: center;
}

.image-selector__wrapper .image-selector__error-wrapper > svg {
	width: 20px;
	color: #D4101C;
	margin-right: 4px;
}

.image-selector__wrapper .image-selector__error-wrapper>p {
    padding: 0;
    margin: 0;
    color: #D4101C;
}
</style>