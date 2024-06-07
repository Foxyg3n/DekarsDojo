<template>
    <form @submit="onLogin">
        <input type="password" v-model="password" placeholder="Password">
        <button type="submit">🔍</button>
        <p v-if="error" class="error">{{ error }}</p>
    </form>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            password: '',
            error: ''
        }
    },
    methods: {
        onLogin(e) {
            e.preventDefault();
            const password = this.password;
            fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const token = data.token;
                if(!token) {
                    this.error = 'Invalid password';
                    return;
                }
                localStorage.setItem('token', token);
                this.$emit('login');
                this.$router.push('/');
            });
        }
    }
}
</script>