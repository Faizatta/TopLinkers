<template>
  <div class="bg-white rounded-lg p-6 shadow-subtle border border-gray-100">
    <h3 class="text-lg font-bold text-[#0F2A44] mb-4 flex items-center gap-2">
      <span class="w-2.5 h-2.5 bg-[#16B4E8] rounded-full"></span>
      Home Financing & Mortgage Calculator (PKR)
    </h3>
    <p class="text-xs text-gray-500 mb-6 font-normal">
      Estimate your monthly bank financing installments based on prevailing Islamic & conventional home loan markup rates in Pakistan.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <!-- Input sliders -->
      <div class="space-y-4">
        <!-- Total Price -->
        <div>
          <div class="flex justify-between text-xs font-semibold mb-1">
            <span class="text-gray-700">Property Price:</span>
            <span class="text-[#0F2A44] font-bold">PKR {{ price.toLocaleString() }}</span>
          </div>
          <input
            v-model.number="price"
            type="range"
            :min="1000000"
            :max="100000000"
            :step="500000"
            class="w-full accent-[#16B4E8] cursor-pointer"
          />
        </div>

        <!-- Down payment -->
        <div>
          <div class="flex justify-between text-xs font-semibold mb-1">
            <span class="text-gray-700">Down Payment ({{ downPercent }}%):</span>
            <span class="text-[#0F2A44] font-bold">PKR {{ downPaymentAmount.toLocaleString() }}</span>
          </div>
          <input
            v-model.number="downPercent"
            type="range"
            :min="15"
            :max="70"
            :step="5"
            class="w-full accent-[#16B4E8] cursor-pointer"
          />
        </div>

        <!-- Loan Period / Tenure -->
        <div>
          <div class="flex justify-between text-xs font-semibold mb-1">
            <span class="text-gray-700">Financing Tenure:</span>
            <span class="text-[#0F2A44] font-bold">{{ tenureYears }} Years</span>
          </div>
          <input
            v-model.number="tenureYears"
            type="range"
            :min="3"
            :max="25"
            :step="1"
            class="w-full accent-[#16B4E8] cursor-pointer"
          />
        </div>

        <!-- Markup / Interest Rate -->
        <div>
          <div class="flex justify-between text-xs font-semibold mb-1">
            <span class="text-gray-700">Bank Markup Rate:</span>
            <span class="text-[#0F2A44] font-bold">{{ interestRate }}%</span>
          </div>
          <input
            v-model.number="interestRate"
            type="range"
            :min="8"
            :max="24"
            :step="0.5"
            class="w-full accent-[#16B4E8] cursor-pointer"
          />
        </div>
      </div>

      <!-- Result Card -->
      <div class="bg-[#F6F8FA] rounded-lg p-6 border border-gray-200 text-center">
        <span class="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">Estimated Monthly Payment</span>
        <div class="text-2xl md:text-3xl font-extrabold text-[#16B4E8] mb-4">
          PKR {{ monthlyPayment.toLocaleString() }} <span class="text-xs text-gray-500 font-normal">/ month</span>
        </div>

        <div class="border-t border-gray-200 pt-4 space-y-2 text-xs text-left">
          <div class="flex justify-between">
            <span class="text-gray-500">Financed Loan Amount:</span>
            <span class="font-bold text-[#0F2A44]">PKR {{ loanAmount.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Total Markup Payable:</span>
            <span class="font-bold text-[#0F2A44]">PKR {{ totalInterest.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Total Repayment Amount:</span>
            <span class="font-bold text-[#0F2A44]">PKR {{ totalRepayment.toLocaleString() }}</span>
          </div>
        </div>

        <button
          type="button"
          class="w-full mt-5 py-2.5 bg-[#0F2A44] hover:bg-[#173f67] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
          @click="$emit('consult-bank')"
        >
          Consult TopLinkers Financial Advisory &rarr;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  initialPrice: {
    type: Number,
    default: 15000000
  }
})

defineEmits(['consult-bank'])

const price = ref(props.initialPrice || 15000000)
const downPercent = ref(25)
const tenureYears = ref(15)
const interestRate = ref(14.5)

const downPaymentAmount = computed(() => Math.round(price.value * (downPercent.value / 100)))
const loanAmount = computed(() => Math.max(price.value - downPaymentAmount.value, 0))

const monthlyPayment = computed(() => {
  const p = loanAmount.value
  if (p <= 0) return 0
  const r = (interestRate.value / 100) / 12
  const n = tenureYears.value * 12
  const payment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  return Math.round(payment) || 0
})

const totalRepayment = computed(() => monthlyPayment.value * tenureYears.value * 12)
const totalInterest = computed(() => Math.max(totalRepayment.value - loanAmount.value, 0))
</script>
