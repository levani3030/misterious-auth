<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="header">
        <h1 class="title">MISTERIOUS</h1>
        <p class="subtitle" @click="toggleFormMode">
          {{ formMode === 'signup' ? 'Already have an account? ' : 'Not have an account? ' }}
          <span class="action-text">{{ formMode === 'signup' ? 'Sign In' : 'Sign Up' }}</span>
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- Username -->
        <div class="form-group">
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="input-icon" :style="{ opacity: formData.username.length > 0 ? 0.75 : undefined }">
            <path d="M12.8404 17C13.945 17 14.8858 16.0899 14.6355 15.0141C14.0127 12.338 11.9301 11 7.84039 11C3.75071 11 1.66809 12.338 1.04531 15.0141C0.794946 16.0899 1.73582 17 2.84039 17H12.8404Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.84039 8C9.84039 8 10.8404 7 10.8404 4.5C10.8404 2 9.84039 1 7.84039 1C5.84039 1 4.84039 2 4.84039 4.5C4.84039 7 5.84039 8 7.84039 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input type="text" v-model="formData.username" :placeholder="formMode === 'signup' ? 'Pick your username' : 'Enter your username'" required />
        </div>

        <!-- Email (Sign Up only) -->
        <div class="form-group" v-if="formMode === 'signup'">
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="input-icon" :style="{ opacity: formData.email.length > 0 ? 0.75 : undefined }">
            <path d="M1.00011 3.99995L8.89061 9.26029C9.5624 9.70815 10.4376 9.70815 11.1094 9.26029L18.9999 3.99995M3.00009 14.9998H16.9999C18.1045 14.9998 18.9999 14.1044 18.9999 12.9998V2.99996C18.9999 1.89541 18.1045 0.999988 16.9999 0.999988H3.00009C1.89553 0.999988 1.00011 1.89541 1.00011 2.99996V12.9998C1.00011 14.1044 1.89553 14.9998 3.00009 14.9998Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input type="email" v-model="formData.email" placeholder="Enter your email address" required />
        </div>

        <!-- Password -->
        <div class="form-group">
          <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="input-icon" :style="{ opacity: formData.password.length > 0 ? 0.75 : undefined }">
            <path d="M8 13V15M4 8V5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5V8M3 20H13C14.1046 20 15 19.1046 15 18V10C15 8.89543 14.1046 8 13 8H3C1.89543 8 1 8.89543 1 10V18C1 19.1046 1.89543 20 3 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input type="password" v-model="formData.password" placeholder="Enter your password" required />
        </div>

        <!-- Repeat Password (Sign Up only) -->
        <div class="form-group" v-if="formMode === 'signup'">
          <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg" class="input-icon" :style="{ opacity: formData.repeatPassword.length > 0 ? 0.75 : undefined }">
            <path d="M21 1L10.5 11.5L6.5 7.5M5 11.5L1 7.5M15.5 1L10.5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input type="password" v-model="formData.repeatPassword" placeholder="Repeat the password" required />
        </div>

        <!-- Promocode (Sign Up only) -->
        <div class="form-group" v-if="formMode === 'signup'">
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="input-icon" :style="{ opacity: formData.promocode.length > 0 ? 0.75 : undefined }">
            <path d="M10 12H10.01M10 8H10.01M10 4H10.01M19 10V13C19 14.1046 18.1046 15 17 15H3C1.89543 15 1 14.1046 1 13V10C2.10457 10 3 9.10457 3 8C3 6.89543 2.10457 6 1 6V3C1 1.89543 1.89543 1 3 1H17C18.1046 1 19 1.89543 19 3V6C17.8954 6 17 6.89543 17 8C17 9.10457 17.8954 10 19 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input type="text" v-model="formData.promocode" placeholder="Enter your promo code" />
        </div>

        <!-- Terms and Conditions (Sign Up only) -->
        <div class="form-group terms-group" v-if="formMode === 'signup'">
          <label class="checkbox-label">
            <input type="checkbox" v-model="formData.termsAccepted" class="checkbox-input" />
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="checkbox-icon-svg">
              <rect x="1" y="1" width="16" height="16" rx="2" stroke="rgba(var(--color-white-rgb), 0.5)" stroke-width="2"/>
              <path v-if="formData.termsAccepted" d="M5 9L8 12L13 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span :style="{ opacity: formData.termsAccepted ? 0.5 : 0.2 }">I have read and agree to the terms and conditions</span>
          </label>
        </div>
        
        <!-- Keep me signed in (Sign In only) -->
        <div class="form-group terms-group" v-if="formMode === 'signin'">
          <label class="checkbox-label">
            <input type="checkbox" v-model="formData.keepSignedIn" class="checkbox-input" />
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="checkbox-icon-svg">
              <rect x="1" y="1" width="16" height="16" rx="2" stroke="rgba(var(--color-white-rgb), 0.5)" stroke-width="2"/>
              <path v-if="formData.keepSignedIn" d="M5 9L8 12L13 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span :style="{ opacity: formData.keepSignedIn ? 0.5 : 0.2 }">Keep me signed in</span>
          </label>
        </div>

        <button type="submit" class="submit-button">
          {{ formMode === 'signup' ? 'SIGN UP' : 'SIGN IN' }}
        </button>

        <!-- Forgot Password (Sign In only) -->
        <div class="forgot-password" v-if="formMode === 'signin'" @click="showForgotPassword">
          Forgot your password
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

type FormMode = 'signup' | 'signin';

const emit = defineEmits(['formSubmitted', 'showForgotPasswordView']);

const formMode = ref<FormMode>('signin'); 

const formData = reactive({
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
  promocode: '',
  termsAccepted: false,
  keepSignedIn: false,
});

const toggleFormMode = () => {
  formMode.value = formMode.value === 'signup' ? 'signin' : 'signup';
  formData.username = '';
  formData.email = '';
  formData.password = '';
  formData.repeatPassword = '';
  formData.promocode = '';
  formData.termsAccepted = false;
  formData.keepSignedIn = false;
};

const handleSubmit = () => {
  if (formMode.value === 'signup') {
    if (formData.password !== formData.repeatPassword) {
      alert('Passwords do not match!'); 
      return;
    }
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions.');
      return;
    }
    console.log('Sign Up submitted:', { ...formData });
  } else { 
    console.log('Sign In submitted:', { username: formData.username, password: formData.password, keepSignedIn: formData.keepSignedIn });
  }
  emit('formSubmitted', { mode: formMode.value, data: { ...formData } });
};

const showForgotPassword = () => {
  emit('showForgotPasswordView');
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
  box-shadow: inset 0px 0px 30px 0px rgba(var(--color-white-rgb), 0.3); 
  border-radius: 18px;
  padding: 40px; 
  width: 100%;
  max-width: 560px; 
  color: var(--color-white);
  text-align: center;
}

.header {
  margin-bottom: 30px;
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
  font-size: 16px; 
  line-height: 1.04;
  letter-spacing: -0.02em;
  color: var(--color-white);
  opacity: 0.5; 
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.subtitle .action-text {
  color: var(--color-white); 
}

.subtitle:hover {
  opacity: 0.8; 
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 10px; 
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
  color: var(--color-white); 
}

.form-group:hover .input-icon,
.form-group:focus-within .input-icon {
  opacity: 0.75;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1); 
  border: 1.88px solid rgba(var(--color-white-rgb), 0.2); 
  border-radius: 14px;
  padding: 17px 20px 17px 55px; 
  box-sizing: border-box;
  font-family: 'Untold History', 'Arial', sans-serif;
  font-weight: 400; 
  font-size: 16px; 
  color: var(--color-white);
  letter-spacing: -0.02em; 
}

.form-group input[type="text"]:focus,
.form-group input[type="email"]:focus,
.form-group input[type="password"]:focus {
  outline: none;
  border-color: rgba(var(--color-white-rgb), 0.7);
  /* Optionally, add a subtle box-shadow for focus state if needed */
  /* box-shadow: 0 0 5px rgba(var(--color-white-rgb), 0.5); */
}

.form-group input[v-model="formData.username"] {
  border-color: rgba(var(--color-white-rgb), 0.5); 
  box-shadow: inset 0px 0px 8px 0px rgba(var(--color-white-rgb), 0.75); 
}

.form-group input::placeholder {
  color: rgba(var(--color-white-rgb), 0.15); 
  font-family: 'Untold History', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.02em;
}

.terms-group {
  text-align: left;
  margin-top: 0px; 
  margin-bottom: 0px; 
  padding-top: 5px; 
  padding-bottom: 5px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'Untold History', 'Arial', sans-serif;
  font-weight: 400; 
  font-size: 14px; 
  line-height: 1.4389999934605189em; 
  color: var(--color-white); 
  transition: opacity 0.3s ease;
}

.checkbox-input {
  display: none; 
}

.checkbox-icon-svg { 
  width: 14px;
  height: 14px;
  margin-right: 8px;
  vertical-align: middle;
  flex-shrink: 0; 
  color: var(--color-white); 
}

.submit-button {
  background-color: rgba(var(--color-white-rgb), 0.06); 
  border: 1px solid rgba(var(--color-white-rgb), 0.3); 
  box-shadow: inset 0px 0px 8px 0px rgba(var(--color-white-rgb), 0.25); 
  border-radius: 14px;
  padding: 16px 20px; 
  font-family: 'Untold History', 'Arial', sans-serif;
  font-weight: 400; 
  font-size: 20px; 
  line-height: 1.439em; 
  color: var(--color-white);
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  margin-top: 10px; 
}

.submit-button:hover {
  background-color: rgba(var(--color-white-rgb), 0.12); 
  border-color: rgba(var(--color-white-rgb), 0.6); 
  box-shadow: inset 0px 0px 10px 0px rgba(var(--color-white-rgb), 0.3), 0px 0px 10px 2px rgba(var(--color-white-rgb), 0.15); 
}

.submit-button:focus-visible {
  outline: 2px solid var(--color-white); /* Using solid color for better visibility */
  outline-offset: 2px;
}

.forgot-password {
  font-family: 'Untold History', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 14px; 
  color: var(--color-white);
  opacity: 0.5;
  margin-top: 20px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.forgot-password:hover {
  opacity: 0.8;
}
</style>
