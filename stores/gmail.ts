import { defineStore } from "pinia";

export const useGmailStore = defineStore(
  "gmail",
  () => {
    const email_to = ref("");
    const userId = "";
    const auth = useAuthStore()

    const get_mails = async () => {
      try {
        if (auth.userID) {
          let response = await $fetch(
            `https://gmail.googleapis.com/gmail/v1/users/${auth.userID}/messages`
          );
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
    };

    return { email_to, get_mails };
  },
  { persist: true }
);
