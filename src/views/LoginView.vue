<template>
    <main>
        <form @submit="onLogin">
            <input type="password" v-model="password" placeholder="Secret perfect 100iq code">
            <button type="submit" class="fas fa-lock"></button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </main>
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

<style lang="scss" scoped>
form {
    position: relative;

    input {
        outline: none;
        width: 280px;
        border-radius: 50px;
        border: none;
        padding: 1em;
        font-size: 1em;
        background: #42b983;
        color: white;

        &::placeholder {
            color: rgb(200, 255, 228);
        }
    }

    button {
        width: 40px;
        height: 40px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        right: 0.5em;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>