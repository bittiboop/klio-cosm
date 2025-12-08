
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    return password.length >= 6;
};

export const validateName = (name) => {
    return name.trim().length >= 2;
};

export const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (validateEmail(email) && validatePassword(password)) {
                const user = {
                    id: Date.now(),
                    email: email,
                    name: email.split('@')[0],
                    createdAt: new Date().toISOString(),
                };
                resolve(user);
            } else {
                reject('Invalid email or password');
            }
        }, 500);
    });
};

export const registerUser = (name, email, password, confirmPassword) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!validateName(name)) {
                reject('Name must be at least 2 characters');
                return;
            }
            if (!validateEmail(email)) {
                reject('Invalid email address');
                return;
            }
            if (!validatePassword(password)) {
                reject('Password must be at least 6 characters');
                return;
            }
            if (password !== confirmPassword) {
                reject('Passwords do not match');
                return;
            }

            const user = {
                id: Date.now(),
                name: name,
                email: email,
                createdAt: new Date().toISOString(),
            };
            resolve(user);
        }, 500);
    });
};
