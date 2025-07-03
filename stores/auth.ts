import { defineStore } from "pinia";
import bcrypt from 'bcryptjs'


export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref(null);
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const password2 = ref("");
    const age = ref("");
    const phone = ref("");
    const isAuthenticated = ref(false);
    const token = ref("");
    const dataUser = ref("");
    const code = ref("");
    const encodeData = ref('')
    const tokenYa = ref('')
    const userID = ref('')

    // Хеширование пароля
    const hashPassword = async (password) => {
      const salt = await bcrypt.genSalt(10)
      return await bcrypt.hash(password, salt)
    }
    

    const login = async () => {
      password.value = await hashPassword(password.value)
      user.value = await $fetch("/api/users/login", {
        method: "post",
        body: {
          email: email.value,
          password: password.value,
        },
      });
      console.log(user.value);
      password.value = ''
      if (user.value) {
        isAuthenticated.value = true;
        await navigateTo("/chat");
      }
    };

    const register = async () => {
      try {
        user.value = await $fetch("/api/users/create", {
          method: "POST",
          body: {
            email: email.value,
            password: password.value,
            age: age.value,
            name: name.value,
            phone: phone.value,
          },
        });
        console.log(user.value);
        if (user.value) {
          isAuthenticated.value = true;
          await navigateTo("/chat");
        }
      } catch (err) {
        console.log(err);
      }
    };
    const logout = () => {
      user.value = null;
      isAuthenticated.value = false;
    };
    const checkAuth = () => {
      if (isAuthenticated.value) {
        return true;
      } else {
        return false;
      }
    };

    // Создаём функцию, которая попросит Google обменять наш код на access_token:
    const getAccessToken = async () => {
      try {
        // Это объект с полями
      const formData = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: "http://localhost:3000/google_login",
        grant_type: "authorization_code",
        code: code.value,
      };
      if (code.value) {
        console.log(formData);
      }
      // Тут мы меняем формат в encode, из-за специфики гугловского апи
      const formEncode = Object.keys(formData)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
        )
        .join("&");

      const GOOGLE_TOKEN_URI = "https://oauth2.googleapis.com/token";
      const data = await $fetch(GOOGLE_TOKEN_URI, {
        method: "POST",
        // Данные секретные!!// Заголовок говорит, что значения кодируются в кортежах с ключом, // разделённых символом '&', с '=' между ключом и значением
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formEncode,
      });

      return data["access_token"];
      } catch (err) {
        console.log(err);
      }
      
    };

    // Это универсальный адрес для получения информации пользователя
    const GOOGLE_USER_INFO_URI =
      "https://www.googleapis.com/oauth2/v2/userinfo";
    // Запрашиваем поту пользователя
    const getUserInformationFromGoogle = async () => {
      let response = await $fetch(GOOGLE_USER_INFO_URI, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      console.log(response);
      userID.value = response.id
      user.value = await $fetch("/api/users/login", {
        method: "POST",
        body: {
          email: response.email,
          name: response.email,
          isGoogleUser: true,
        },
      });
      console.log("user", user.value);
      let f = false
      if (user.value) {
        f = true
      }
      return f
    };

    const setEncodeData = (code) => {
      try {
        const formEncode = {
          client_id: process.env.YANDEX_CLIENT_ID, //id нашего приложения
          client_secret: process.env.YANDEX_CLIENT_SECRET, //секретный код нашего приложения
          grant_type: "authorization_code", //за счет чего получаем токен
          code: code //временный код доступа
        };
        encodeData.value = Object.keys(formEncode).map(key=> encodeURIComponent(key) + '=' + encodeURIComponent(formEncode[key])).join('&')//преобразуем нашу форму в формат urlEncoded
      } catch (err) {
        console.log(err);
        
      }
    }

    const YANDEX_TOKEN_URI="https://oauth.yandex.ru/token"; //адрес для получения токена

    const getAccessTokenYa = async () => {
      let response = await $fetch(YANDEX_TOKEN_URI, {
          method: 'POST',
          headers: {
              'Accept': '*/*',
              'Content-Length': encodeData.value.length,//длина контента
              'Content-Type': 'application/x-www-form-urlencoded'//вид тела запроса
          },
          body: encodeData.value //тело запроса
      })
      console.log(response);
      tokenYa.value = response
    }

    const getInfoYa = async () => {
      try {
        let response = await $fetch('https://login.yandex.ru/info', {
          headers: {
            Authorization: `OAuth ${tokenYa.value.access_token}`
          }
        })
        console.log(response);
        user.value = await $fetch("/api/users/login", {
          method: "POST",
          body: {
            email: response.email,
            name: response.display_name,
            phone: response.default_phone.number,
            isYandexUser: true,
          },
        });
        console.log("user", user.value);
        let f = false
        if (user.value) {
          f = true
        }
        return f
      } catch (err) {
        console.log(err);
        
      }
    }

    return {
      user,
      email,
      password,
      password2,
      age,
      phone,
      login,
      logout,
      checkAuth,
      isAuthenticated,
      register,
      getAccessToken,
      getUserInformationFromGoogle,
      token,
      dataUser,
      code,
      getAccessTokenYa,
      tokenYa,
      setEncodeData,
      encodeData,
      getInfoYa,
      userID
    };
  },
  {
    persist: true  }
);
