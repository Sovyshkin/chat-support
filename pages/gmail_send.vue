<script setup>

</script>
<template>
    <div class="wrapper">
      <h1>Отправка писем</h1>
      <div class="group">
        <input
          v-model="email_to"
          type="email"
          required
          name="email"
          placeholder="Введите почту"
        />
        <span class="group-value">Кому хотите отправить письмо</span>
      </div>
      <div class="group">
        <textarea
          name="desc"
          v-model="text"
          cols="30"
          rows="10"
          placeholder="Введите текст"
          id="desc"
        ></textarea>
        <span class="group-value">Содержание</span>
      </div>
      <div class="group">
        <input
          v-model="price"
          type="text"
          required
          name="price"
          placeholder="Введите стоимость"
        />
        <span class="group-value">Стоимость</span>
      </div>
      <div class="group">
        <input
          v-model="size"
          type="text"
          required
          name="size"
          placeholder="Укажите размер картины (90x70 см)"
        />
        <span class="group-value">Размер</span>
      </div>
      <div class="group">
        <select name="" id="" v-model="status">
          <option :value="item" v-for="(item, i) in mainStatus" :key="i">
            {{ item }}
          </option>
        </select>
        <span class="group-value">Статус</span>
      </div>
      <div class="group">
        <select v-model="unique_value">
          <option :value="true">Да</option>
          <option :value="false">Нет</option>
        </select>
        <span class="group-value">Уникальность</span>
      </div>
      <div class="group">
        <select name="" id="" v-model="artist">
          <option :value="item" v-for="(item, i) in artists" :key="i">
            {{ item.username }}
          </option>
        </select>
        <span class="group-value">Художник</span>
      </div>
      <div class="group-file">
        <input
          type="file"
          id="file"
          @change="handleFileUpload"
          accept="image/*"
          multiple
        />
        <label class="select-img" for="file">Прикрепить изображения</label>
      </div>
      <div
        v-for="(imageUrl, index) in imageUrlArray"
        :key="index"
        class="image-container"
      >
        <img :src="imageUrl" alt="Uploaded Image" />
      </div>
      <div class="wrap-btns" v-if="!message">
        <button class="btn" @click="save()">Загрузить</button>
      </div>
      <div
        class="msg"
        :class="{
          success: this.message == 'Успешно',
          error: this.message != 'Успешно',
        }"
        v-if="message"
      >
        {{ message }}
      </div>
    </div>
  </template>
  <style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    font-weight: 700;
    font-size: 23px;
    line-height: 28px;
    text-align: center;
  }
  
  .wrap-btns {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .btn {
    padding: 15px 40px;
    background-color: #aa6a2a;
    border-radius: 10px;
    color: #fff;
    font-size: 15px;
    line-height: 18px;
    font-weight: 500;
  }
  input,
  textarea,
  select {
    width: 100%;
    border: 1px solid #aa6a2a;
    border-radius: 8px;
    padding: 16px;
    background: none;
    outline: none;
  }
  
  textarea {
    max-width: 500px;
    max-height: 300px;
    min-height: 70px;
  }
  
  input::placeholder,
  textarea::placeholder,
  select::placeholder {
    color: #a5a5a5;
    font-weight: 400;
    font-size: 14px;
    line-height: 19.12px;
  }
  .group {
    position: relative;
  }
  
  .group-value {
    position: absolute;
    top: 0;
    transform: translateY(-50%);
    left: 12px;
    background-color: #f0f0f5;
    padding: 0 4px;
    color: #aa6a2a;
    font-weight: 500;
    font-size: 12px;
    line-height: 13.66px;
  }
  
  input[type="file"] {
    border: none;
    display: none;
  }
  
  .group-file {
    padding: 15px 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.9px dashed #aa6a2a;
    border-radius: 8px;
  }
  
  label {
    width: 100%;
    text-align: center;
    cursor: pointer;
    color: #aa6a2a;
  }
  .image-container {
    margin: 0 auto;
    max-width: 400px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .file-container {
    display: flex;
    align-items: center;
    gap: 7px;
  }
  </style>