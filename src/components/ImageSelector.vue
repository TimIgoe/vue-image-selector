<script setup>
import { ref, defineProps } from 'vue';

const fileInput = ref(null);
const isDragging = ref(false);

const props = defineProps({
    select: {
        type: Function,
        required: true,
    },
    reset: {
        type: Function,
        required: true,
    },
    state: {
        type: Object,
        required: true,
    }
});

const previewUrl = () => {
    return props.state.image ? URL.createObjectURL(props.state.image) : '';
};

const handleDragEnter = event => {
    isDragging.value = true;
};

const handleDragOver = event => {
    isDragging.value = true;
};

const handleDragLeave = event => {
    isDragging.value = false;
};

const handleDrop = event => {
    isDragging.value = false;
    props.select(event);
};

const handleReset = event => {
    isDragging.value = false;
    props.reset(event);
}

const handleBrowse = () => {
    fileInput.value.click();
};
</script>

<template>
    <div :class="[
        'image-selector__wrapper', 
        { 'image-selector__selected': props.state.image },
        { 'drag-over': isDragging }
    ]"
        @drop.prevent="handleDrop"  
        @dragenter.prevent="handleDragEnter" 
        @dragover.prevent="handleDragOver" 
        @dragleave.prevent="handleDragLeave"
    >
        <div class="image-selector__inner">
            <div v-if="props.state.image" class="image-selector__reset-btn" @click="handleReset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <img v-if="props.state.image" class="image-selector__img" :src="previewUrl()" alt="" @click="handleBrowse">
            <div v-else class="image-selector__placeholder" @click="handleBrowse">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <div class="placeholder-text">
                    <span>Drag & Drop</span><br/>
                    <span>or <span class="browse-btn">Browse</span></span><br/>
                    <span class="supported-formats">Supports: JPEG, JPG, PNG, WEBP</span>
                </div>
            </div>
            <input @change="props.select" type="file" class="image-selector__file-input" ref="fileInput" />
        </div>
    </div>
</template>

<style scoped>
.image-selector__wrapper {
    position: relative;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    transition: .2s;
    overflow: hidden;

    &.image-selector__selected {
        width: fit-content;
        border: 1px solid #E8F0FE;
        background: #fff;
        padding: 4px;
        border-radius: 4px;

        .image-selector__inner {
            border: none;
        }
    }

    &:not(.image-selector__selected).drag-over {
        padding: 10px;
        background: #E8F0FE;
    }

    .image-selector__inner {
        position: relative;
        margin: 0;
        padding: 0;
        width: 100%;
        box-sizing: border-box;
        border: 2px dashed #AFB6BE;

        > img {
            margin: 0;
            padding: 0;
            cursor: pointer;
            width: 100%;
            vertical-align: bottom;
        }

        > input[type="file"] {
            position: absolute;
            top: 0;
            left: 0;
            visibility: hidden;
        }
    }

    .image-selector__reset-btn {
        position: absolute;
        top: 4px;
        right: 4px;

        > svg {
            width: 28px;
            color: #8F9498;
            cursor: pointer;
            z-index: 56;

            &:hover {
                color: #000;
            }
        }
    }

    .image-selector__placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 64px 0;

        > svg {
            width: 64px;
            margin: 0;
            padding: 0;
            color: #1781FD;
        }

        .placeholder-text {
            font-family: 'Arial', sans-serif;
            margin-top: 12px;
            text-align: center;
            font-size: 18px;
            color: #2A2A2A;

            .browse-btn {
                color: #1781FD;
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }

            .supported-formats {
                color: #636363;
                font-size: 12px;
            }
        }
    }
}
</style>
