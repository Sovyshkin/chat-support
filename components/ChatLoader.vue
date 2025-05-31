<style scoped>
  .dots-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
  }

  .dot {
    height: 8px;
    width: 8px;
    margin-right: 5px;
    border-radius: 50%;
    background-color: #b3d4fc;
    animation: pulse 1.5s infinite ease-in-out;
  }

  .dot:last-child {
    margin-right: 0;
  }

  .dot:nth-child(1) {
    animation-delay: -0.3s;
  }

  .dot:nth-child(2) {
    animation-delay: -0.1s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.1s;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      background-color: #b3d4fc;
    }

    50% {
      transform: scale(1.2);
      background-color: #005eff;
    }

    100% {
      transform: scale(0.8);
      background-color: #b3d4fc;
    }
  }
</style>

<template>
  <section class="dots-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </section>
</template>