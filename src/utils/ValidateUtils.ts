export const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || email.length === 0) {
        return "Email не может быть пустым";
    }

    if (!emailRegex.test(email)) {
        return "Введите корректный Email";
    }

    return null;
}

export const validateCode = (code: string) => {
if (code.length!==6) {
    return "Неккоректный код"
}

return null
}

export const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+?\d{10,15}$/;
  
    if (!phone || phone.trim().length === 0) {
      return "Номер телефона не может быть пустым";
    }
  
    const cleanedPhone = phone.replace(/[\s-]/g, '');

    if (!phoneRegex.test(cleanedPhone)) {
      return "Введите корректный номер телефона";
    }
  
    return null;
  };

  export const validatePassword = (password: string) => {
    if (!password || password.trim().length === 0) {
      return "Пароль не может быть пустым";
    }
  
    if (password.length < 8) {
      return "Минимальная длина — 8 символов";
    }
  
    if (!/[a-zA-Zа-яА-ЯёЁ]/.test(password)) {
      return "Добавьте хотя бы одну букву";
    }
  
    if (!/[0-9]/.test(password)) {
      return "Добавьте хотя бы одну цифру";
    }
  
    return null;
  };