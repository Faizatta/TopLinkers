<template>
  <section class="py-12 bg-white">
    <div class="max-w-[1280px] mx-auto px-4">
      <!-- Full-width Navy Rounded Bar -->
      <div class="bg-[#0F2A44] rounded-2xl p-8 md:p-12 shadow-2xl text-white">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/15">
          <!-- Stat 1 -->
          <div class="flex items-center gap-4 lg:px-8">
            <div class="w-12 h-12 rounded-xl bg-white/10 text-[#16B4E8] flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <div class="text-2xl md:text-3xl font-black text-white tracking-tight">
                <CountUp :end="100" suffix="+" />
              </div>
              <div class="text-xs font-semibold text-gray-300 uppercase tracking-wider mt-0.5">
                Properties Listed
              </div>
            </div>
          </div>

          <!-- Stat 2 -->
          <div class="flex items-center gap-4 lg:px-8">
            <div class="w-12 h-12 rounded-xl bg-white/10 text-[#16B4E8] flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <div>
              <div class="text-2xl md:text-3xl font-black text-white tracking-tight">
                <CountUp :end="1000" suffix="+" />
              </div>
              <div class="text-xs font-semibold text-gray-300 uppercase tracking-wider mt-0.5">
                Happy Customers
              </div>
            </div>
          </div>

          <!-- Stat 3 -->
          <div class="flex items-center gap-4 lg:px-8">
            <div class="w-12 h-12 rounded-xl bg-white/10 text-[#16B4E8] flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <div class="text-2xl md:text-3xl font-black text-white tracking-tight">
                <CountUp :end="10" suffix="+" />
              </div>
              <div class="text-xs font-semibold text-gray-300 uppercase tracking-wider mt-0.5">
                Verified Agents & Engineers
              </div>
            </div>
          </div>

          <!-- Stat 4 -->
          <div class="flex items-center gap-4 lg:px-8">
            <div class="w-12 h-12 rounded-xl bg-white/10 text-[#16B4E8] flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div class="text-2xl md:text-3xl font-black text-white tracking-tight">
                <CountUp :end="50" suffix="+" />
              </div>
              <div class="text-xs font-semibold text-gray-300 uppercase tracking-wider mt-0.5">
                Sectors & Societies
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import CountUp from '../ui/CountUp.vue'
</script>
