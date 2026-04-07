<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'A minimalist sanctuary for writers and readers.'
    },
    siteName: {
        type: String,
        default: 'Laz Blog'
    }
})
</script>

<template>
    <div 
        class="w-full h-full flex flex-col justify-center relative overflow-hidden"
        style="background-color: #faf8f5; color: #1c1a19; padding: 0 96px;">
        <div
            style="position: absolute; right: -150px; top: -80px; width: 800px; height: 800px; background-color: rgba(255, 79, 0, 0.06); border-radius: 9999px;" />

        <div
            style="position: absolute; left: -80px; bottom: -120px; width: 600px; height: 600px; background-color: rgba(255, 79, 0, 0.03); border-radius: 9999px;" />


        <div class="h-full flex flex-col justify-between py-24 z-10 w-full relative">
            <div 
                class="flex w-full"
                style="font-family: 'Inter', sans-serif; font-weight: 500; font-size: 24px; letter-spacing: 0.3em; text-transform: uppercase; color: #FF4F00;">
                {{ siteName }}
            </div>

            <div class="flex flex-col mt-auto pb-12 w-full max-w-4xl pt-24" style="flex: 1; justify-content: center;">
                <h1 
                    class="flex"
                    style="font-family: 'Lora', serif; font-weight: 300; font-size: 72px; line-height: 1.1; letter-spacing: -0.02em; color: #1c1a19;">
                    {{ title }}
                </h1>
                <div 
                    class="flex"
                    style="font-family: 'Lora', serif; font-size: 36px; font-style: italic; color: rgba(255, 79, 0, 0.9); margin-top: 24px; margin-left: 64px;">
                    Mindful living.
                </div>
            </div>

            <div class="flex" style="border-left: 4px solid rgba(255, 79, 0, 0.2); padding-left: 32px;">
                <p 
                class="flex"
                    style="font-family: 'Inter', sans-serif; font-weight: 300; font-size: 28px; line-height: 1.6; letter-spacing: 0.05em; color: rgba(28, 26, 25, 0.6); max-width: 600px;">
                    {{ description }}
                </p>
            </div>
        </div>
    </div>
</template>