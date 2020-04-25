<template>
    <v-footer

            class="font-weight-medium"
    >
        <v-col
                class="text-center"
                cols="12"
        >

            Made with
            <v-icon x-small style="color:#a02424;">fa-heart</v-icon>
            for EUIV players
            {{current_year}}
        </v-col>
    </v-footer>
</template>

<script>
    export default {
        name: 'MadeWithLove',
        data() {
            return {
                current_year: new Date().getFullYear()
            }
        }
    }
</script>

<style scoped>

</style>
