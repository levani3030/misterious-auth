<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="header">
        <h1 class="title">MISTERIOUS</h1>
        <p class="subtitle">Forgot Password?</p>
      </div>

      <form @submit.prevent="handleForgotPassword" class="auth-form">
        <p class="instruction-text">Enter your email address and we'll send you a link to reset your password.</p>
        <div class="form-group">
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="input-icon" :style="{ opacity: email.length > 0 ? 0.75 : undefined }">
            <path d="M1.00011 3.99995L8.89061 9.26029C9.5624 9.70815 10.4376 9.70815 11.1094 9.26029L18.9999 3.99995M3.00009 14.9998H16.9999C18.1045 14.9998 18.9999 14.1044 18.9999 12.9998V2.99996C18.9999 1.89541 18.1045 0.999988 16.9999 0.999988H3.00009C1.89553 0.999988 1.00011 1.89541 1.00011 2.99996V12.9998C1.00011 14.1044 1.89553 14.9998 3.00009 14.9998Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input type="email" v-model="email" placeholder="Enter your email address" required />
        </div>
        <button type="submit" class="submit-button">Send Reset Link</button>
      </form>
      <div class="back-to-login" @click="$emit('showMainAuthView', 'signin')">
        Back to Sign In
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['formSubmitted', 'showMainAuthView']);

const email = ref('');

const handleForgotPassword = () => {
  if (!email.value) {
    alert('Email is required.'); 
    return;
  }
  console.log('Forgot password request for email:', email.value);
  emit('formSubmitted', { email: email.value });
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Untold History', 'Arial', sans-serif;
  padding: 20px;
  box-sizing: border-box;
}

.auth-card {
  background-color: rgb(33 33 33 / 10%);
  border: 1px solid rgba(var(--color-white-rgb), 0.3);
  box-shadow: inset 0px 0px 30px 0px rgba(var(--color-white-rgb), 0.1); /* Adjusted opacity from 0.3 to 0.1 for consistency with other shadows */
  border-radius: 18px;
  padding: 40px;
  width: 100%;
  max-width: 560px;
  color: var(--color-white);
  text-align: center;
}

.header {
  margin-bottom: 20px; 
}

.title {
  font-family: 'Untold History', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 64px;
  line-height: 1.04;
  letter-spacing: -0.02em;
  background-image: radial-gradient(ellipse at 50% 70%, rgba(var(--color-white-rgb), 1) 0%, rgba(var(--color-white-rgb), 0.9) 51.4%, rgba(var(--color-white-rgb), 0.8) 100%);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 
    -6px 4px 4px rgba(var(--color-white-rgb), 0.2), 
    -2px 1px 1px rgba(0,0,0,0.75); 
  margin: 0 0 10px 0;
}

.subtitle {
  font-family: 'Untold History', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 20px; 
  line-height: 1.04;
  letter-spacing: -0.02em;
  color: var(--color-white);
  opacity: 0.8; 
}

.instruction-text {
  font-size: 14px;
  color: rgba(var(--color-white-rgb), 0.7); 
  margin-bottom: 25px;
  line-height: 1.5;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px; 
}

.form-group {
  position: relative;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  opacity: 0.2; 
  transition: opacity 0.3s ease;
  color: var(--color-white); /* Added to control SVG stroke color via currentColor */
}

.form-group:hover .input-icon,
.form-group:focus-within .input-icon {
  opacity: 0.75;
}

.form-group input[type="email"] {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1.88px solid rgba(var(--color-white-rgb), 0.2);
  box-shadow: inset 0px 0px 8px 0px rgba(var(--color-white-rgb), 0.35);
  border-radius: 14px;
  padding: 18px 20px 18px 55px;
  box-sizing: border-box;
  font-family: 'Untold History', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: var(--color-white);
  letter-spacing: -0.02em;
}

.form-group input[type="email"]:focus {
  outline: none;
  border-color: rgba(var(--color-white-rgb), 0.7);
}

.form-group input::placeholder {
  color: rgba(var(--color-white-rgb), 0.3);
  font-family: 'Untold History', 'Arial', sans-serif;
}

.submit-button {
  background-color: rgba(var(--color-white-rgb), 0.06);
  border: 1px solid rgba(var(--color-white-rgb), 0.5);
  box-shadow: inset 0px 0px 8px 1px rgba(var(--color-white-rgb), 0.3);
  border-radius: 14px;
  padding: 18px 20px;
  font-family: 'Untold History', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 18px; 
  color: var(--color-white);
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: rgba(var(--color-white-rgb), 0.1);
  border-color: rgba(var(--color-white-rgb), 0.6); /* Added to match MainAuthForm */
  box-shadow: inset 0px 0px 12px 2px rgba(var(--color-white-rgb), 0.4);
}

.submit-button:focus-visible {
  outline: 2px solid var(--color-white); /* Using solid color for better visibility */
  outline-offset: 2px;
}

.back-to-login {
  font-family: 'Untold History', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: var(--color-white);
  opacity: 0.5;
  margin-top: 25px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.back-to-login:hover {
  opacity: 0.8;
}
</style>
