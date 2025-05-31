<script setup>
definePageMeta({
  middleware: ["auth"]
})
</script>
<template><div class="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] group/design-root overflow-x-hidden" style='font-family: "Work Sans", "Noto Sans", sans-serif;'>
  <div class="layout-container flex h-full grow flex-col">
    <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7ecf3] px-10 py-3">
      <div class="item-logo flex items-center gap-4 text-[#0d131b]">
        <div class="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_6_319)">
              <path
                d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_6_319"><rect width="48" height="48" fill="white"></rect></clipPath>
            </defs>
          </svg>
        </div>
        <h2 class="text-[#0d131b] text-lg font-bold leading-tight tracking-[-0.015em]">Blink</h2>
      </div>
      <div class="flex flex-1 justify-end gap-8">
        <div class="flex items-center gap-9">
          <a class="item-nav text-[#0d131b] text-sm font-medium leading-normal" href="#">Dashboard</a>
          <a class="item-nav text-[#0d131b] text-sm font-medium leading-normal" href="#">Send Money</a>
          <a class="item-nav text-[#0d131b] text-sm font-medium leading-normal" href="#">Request Money</a>
          <a class="item-nav text-[#0d131b] text-sm font-medium leading-normal" href="#">Invest</a>
          <a class="item-nav text-[#0d131b] text-sm font-medium leading-normal" href="#">Insure</a>
          <a class="item-nav text-[#0d131b] text-sm font-medium leading-normal" href="#">Credit</a>
        </div>
        <div class="flex gap-2">
          <button
            class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7ecf3] text-[#0d131b] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          >
            <div class="text-[#0d131b]" data-icon="CheckCircle" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
                ></path>
              </svg>
            </div>
          </button>
          <button
            class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7ecf3] text-[#0d131b] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          >
            <div class="text-[#0d131b]" data-icon="Bell" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
                ></path>
              </svg>
            </div>
          </button>
        </div>
        <div
          class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style='background-image: url("https://cdn.usegalileo.ai/stability/686eb5e6-0edc-44c4-a669-3ab3246c06e7.png");'
        ></div>
      </div>
    </header>
    <div class="bg px-40 flex flex-1 justify-center py-5">
      <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
        <p class="text-[#4c6a9a] text-sm font-normal leading-normal pb-3 pt-1 px-4">BALANCE</p>
        <h2 class="text-[#0d131b] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">$5,000</h2>
        <div class="wrap-items">

          <div class="item flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-[72px] py-2 justify-between">
            <div class="flex items-center gap-4">
              <div
                class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                style='background-image: url("https://cdn.usegalileo.ai/stability/fd88f3fa-fd12-432c-af20-42ddfceee453.png");'
              ></div>
              <div class="flex flex-col justify-center">
                <p class="text-[#0d131b] text-base font-medium leading-normal line-clamp-1">John Doe</p>
                <p class="text-[#4c6a9a] text-sm font-normal leading-normal line-clamp-2">Wells Fargo • Checking</p>
              </div>
            </div>
            <div class="shrink-0">
              <div class="text-[#0d131b] flex size-7 items-center justify-center" data-icon="CaretRight" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="item flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-[72px] py-2 justify-between">
            <div class="flex items-center gap-4">
              <div
                class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                style='background-image: url("https://cdn.usegalileo.ai/stability/2f5296e5-bed9-467c-86f8-e970d9425458.png");'
              ></div>
              <div class="flex flex-col justify-center">
                <p class="text-[#0d131b] text-base font-medium leading-normal line-clamp-1">Jane Doe</p>
                <p class="text-[#4c6a9a] text-sm font-normal leading-normal line-clamp-2">Chase • Savings</p>
              </div>
            </div>
            <div class="shrink-0">
              <div class="text-[#0d131b] flex size-7 items-center justify-center" data-icon="CaretRight" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <h3 class="text-[#0d131b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Recent Transactions</h3>
        <div class="wrap-items">
          <div class="item flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-[72px] py-2 justify-between">
            <div class="flex items-center gap-4">
              <div
                class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                style='background-image: url("https://cdn.usegalileo.ai/stability/1353f698-79a3-4224-a32f-c67d8fc6969a.png");'
              ></div>
              <div class="flex flex-col justify-center">
                <p class="text-[#0d131b] text-base font-medium leading-normal line-clamp-1">Transfer from Jane</p>
                <p class="text-[#4c6a9a] text-sm font-normal leading-normal line-clamp-2">Nov 25</p>
              </div>
            </div>
            <div class="shrink-0"><p class="text-[#0d131b] text-base font-normal leading-normal">+$3,000</p></div>
          </div>
          <div class="item flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-[72px] py-2 justify-between">
            <div class="flex items-center gap-4">
              <div
                class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                style='background-image: url("https://cdn.usegalileo.ai/sdxl10/a7333b6a-c870-430e-a740-313e88e3eaa4.png");'
              ></div>
              <div class="flex flex-col justify-center">
                <p class="text-[#0d131b] text-base font-medium leading-normal line-clamp-1">Amazon</p>
                <p class="text-[#4c6a9a] text-sm font-normal leading-normal line-clamp-2">Nov 20</p>
              </div>
            </div>
            <div class="shrink-0"><p class="text-[#0d131b] text-base font-normal leading-normal">-$100</p></div>
          </div>
          <div class="item flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-[72px] py-2 justify-between">
            <div class="flex items-center gap-4">
              <div class="text-[#0d131b] flex items-center justify-center rounded-lg bg-[#e7ecf3] shrink-0 size-12" data-icon="Briefcase" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z"
                  ></path>
                </svg>
              </div>
              <div class="flex flex-col justify-center">
                <p class="text-[#0d131b] text-base font-medium leading-normal line-clamp-1">Paycheck</p>
                <p class="text-[#4c6a9a] text-sm font-normal leading-normal line-clamp-2">Oct 15</p>
              </div>
            </div>
            <div class="shrink-0"><p class="text-[#0d131b] text-base font-normal leading-normal">+$5,000</p></div>
          </div>
        </div>
        <div class="flex px-4 py-3">
          <button
            class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#e7ecf3] text-[#0d131b] text-base font-bold leading-normal tracking-[0.015em]"
          >
            <span class="truncate">View all transactions</span>
          </button>
        </div>
        <h3 class="text-[#0d131b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Quick Actions</h3>
        <div class="wrap-items">
          <div class="item flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-14 justify-between">
            <div class="flex items-center gap-4">
              <div
                class="text-[#0d131b] flex items-center justify-center rounded-lg bg-[#e7ecf3] shrink-0 size-10"
                data-icon="ArrowUpRight"
                data-size="24px"
                data-weight="regular"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                </svg>
              </div>
              <p class="text-[#0d131b] text-base font-normal leading-normal flex-1 truncate">Send money</p>
            </div>
            <div class="shrink-0">
              <div class="text-[#0d131b] flex size-7 items-center justify-center" data-icon="CaretRight" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="item flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-14 justify-between">
            <div class="flex items-center gap-4">
              <div
                class="text-[#0d131b] flex items-center justify-center rounded-lg bg-[#e7ecf3] shrink-0 size-10"
                data-icon="ArrowDownLeft"
                data-size="24px"
                data-weight="regular"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M197.66,69.66,83.31,184H168a8,8,0,0,1,0,16H64a8,8,0,0,1-8-8V88a8,8,0,0,1,16,0v84.69L186.34,58.34a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
              </div>
              <p class="text-[#0d131b] text-base font-normal leading-normal flex-1 truncate">Request money</p>
            </div>
            <div class="shrink-0">
              <div class="text-[#0d131b] flex size-7 items-center justify-center" data-icon="CaretRight" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="item flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-14 justify-between">
            <div class="flex items-center gap-4">
              <div class="text-[#0d131b] flex items-center justify-center rounded-lg bg-[#e7ecf3] shrink-0 size-10" data-icon="ChartLine" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"
                  ></path>
                </svg>
              </div>
              <p class="text-[#0d131b] text-base font-normal leading-normal flex-1 truncate">Invest</p>
            </div>
            <div class="shrink-0">
              <div class="text-[#0d131b] flex size-7 items-center justify-center" data-icon="CaretRight" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="item flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-14 justify-between">
            <div class="flex items-center gap-4">
              <div class="text-[#0d131b] flex items-center justify-center rounded-lg bg-[#e7ecf3] shrink-0 size-10" data-icon="Umbrella" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M240,126.63A112.44,112.44,0,0,0,51.75,53.75a111.56,111.56,0,0,0-35.7,72.88A16,16,0,0,0,32,144h88v56a32,32,0,0,0,64,0,8,8,0,0,0-16,0,16,16,0,0,1-32,0V144h88a16,16,0,0,0,16-17.37ZM32,128l0,0a96.15,96.15,0,0,1,76.2-85.89C96.48,58,81.85,86.11,80.17,128Zm64.15,0c1.39-30.77,10.53-52.81,18.3-66.24A106.44,106.44,0,0,1,128,43.16a106.31,106.31,0,0,1,13.52,18.6C154.8,84.7,159,109.28,159.82,128Zm79.65,0c-1.68-41.89-16.31-70-28-85.94A96.07,96.07,0,0,1,224,128Z"
                  ></path>
                </svg>
              </div>
              <p class="text-[#0d131b] text-base font-normal leading-normal flex-1 truncate">Insure</p>
            </div>
            <div class="shrink-0">
              <div class="text-[#0d131b] flex size-7 items-center justify-center" data-icon="CaretRight" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="item flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-14 justify-between">
            <div class="flex items-center gap-4">
              <div class="text-[#0d131b] flex items-center justify-center rounded-lg bg-[#e7ecf3] shrink-0 size-10" data-icon="CreditCard" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"
                  ></path>
                </svg>
              </div>
              <p class="text-[#0d131b] text-base font-normal leading-normal flex-1 truncate">Credit</p>
            </div>
            <div class="shrink-0">
              <div class="text-[#0d131b] flex size-7 items-center justify-center" data-icon="CaretRight" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div></template>
<style scoped>
.bg {
  background-image: url('https://i.pinimg.com/originals/d2/e7/10/d2e71040b54ca8112116de074d29520b.jpg');
}

.wrap-items {
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  overflow: hidden;
  padding: 5px;
  background-color: rgb(248 249 252);
}

.item-nav::after {
  margin-top: 2px;
  background-color: #000; /* Цвет линии при наведении на нее курсора мыши */
  display: block;
  content: "";
  height: 2px; /* Высота линии */
  width: 0%;
  -webkit-transition: width 0.4s ease-in-out;
  -moz--transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
}
.item-nav:hover:after,
.item-nav:focus:after {
  width: 100%;
}

.item, .item-logo {
  transition: all 400ms ease;
  cursor: pointer;
}

.item:hover {
  transform: translateY(-4px);
}

.item-logo:hover {
  transform: scale(1.07);
}
</style>