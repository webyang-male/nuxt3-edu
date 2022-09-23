<template>
    <div class="body">
        <NavBar/>
        <main class="container">
            <slot/>
        </main>
        <PageFooter/>
        <GotoTop/>
    </div>
</template>
<style>
.body {
    min-width: 1000px;
    @apply bg-gray-100 flex flex-col min-h-screen;
}
</style>
