<style scoped>
  .loader {
    width: fit-content;
    height: fit-content;
    border-radius: 7px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    transition: 0.2s;
  }

  .loader:hover {
    background-color: rgba(255, 255, 255, 0.651);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  .loader:hover svg {
    color: black;
    
  }

  .loader svg {
    color: black;
    transform: scale(1.2);
    transition: 0.2s;
  }

  .point {
    position: absolute;
    bottom: 5px;
    left: 5px;
    width: 6px;
    height: 6px;
    background-color: rgb(0, 255, 0);
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .point::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 1px;
    background-color: rgb(0, 255, 0);
    border-radius: 25px;
    animation: loop 1s 0s infinite;
  }

  @keyframes loop {
    0% {
      background-color: rgb(0, 255, 0);
      width: 1px;
      height: 1px;
    }
    100% {
      background-color: rgba(0, 255, 0, 0);
      width: 30px;
      height: 30px;
    }
  }
</style>

<template>
  <div class="loader">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      class="w-6 h-6 text-gray-800"
    >
      <path
        d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke="currentColor"
      ></path>
    </svg>
    <div class="point"></div>
  </div>
</template>
