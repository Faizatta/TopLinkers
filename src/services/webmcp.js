/**
 * WebMCP (Model Context Protocol in Browser) Registration Service
 * Exposes client-side agent tools via navigator.modelContext.registerTool()
 * and annotates DOM forms with toolname and tooldescription.
 */

export function initWebMCP() {
  if (typeof window === 'undefined') return

  // 1. Ensure navigator.modelContext exists with registerTool API
  if (!navigator.modelContext) {
    navigator.modelContext = {
      tools: new Map(),
      registerTool(tool) {
        if (!tool || !tool.name) return
        this.tools.set(tool.name, tool)
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('modelcontext:toolregistered', { detail: tool }))
        }
      },
      getTools() {
        return Array.from(this.tools.values())
      }
    }
  }

  // 2. Register Tool: search_properties
  try {
    navigator.modelContext.registerTool({
      name: 'search_properties',
      description: 'Search verified plots, PHA executive flats, villas, and luxury vacation suites in Islamabad and Rawalpindi.',
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: ['all', 'plots', 'pha-flats', 'villas', 'commercial', 'vacation-suites'],
            description: 'Property category'
          },
          location: {
            type: 'string',
            description: 'City, sector, or society (e.g. TopCity-1, PECHS, I-12, I-16, Gulberg Greens, Nathia Gali)'
          },
          maxPricePKR: {
            type: 'number',
            description: 'Maximum budget ceiling in PKR'
          }
        }
      },
      execute: async (params) => {
        return {
          status: 'success',
          message: 'TopLinkers verified property inventory queried',
          filters: params,
          directUrl: `https://toplinkersgroup.com/listings?category=${encodeURIComponent(params?.category || 'all')}&location=${encodeURIComponent(params?.location || '')}`
        }
      }
    })
  } catch (err) {
    console.debug('[WebMCP] search_properties registration notice:', err)
  }

  // 3. Register Tool: calculate_solar_savings
  try {
    navigator.modelContext.registerTool({
      name: 'calculate_solar_savings',
      description: 'Calculate recommended on-grid solar system size in kW, monthly unit generation, and bill reduction under IESCO net metering in Pakistan.',
      inputSchema: {
        type: 'object',
        properties: {
          monthlyBillPKR: {
            type: 'number',
            description: 'Average monthly electricity bill in PKR'
          }
        },
        required: ['monthlyBillPKR']
      },
      execute: async ({ monthlyBillPKR = 50000 }) => {
        const estUnits = Math.round(monthlyBillPKR / 65)
        const systemKw = Math.max(5, Math.min(50, Math.round(estUnits / 120)))
        const estSavings = Math.round(monthlyBillPKR * 0.90)
        return {
          recommendedSystemKw: systemKw,
          estimatedMonthlyUnits: systemKw * 120,
          estimatedMonthlySavingsPKR: estSavings,
          estimatedAnnualSavingsPKR: estSavings * 12,
          paybackYears: 2.8,
          turnkeyServicesUrl: 'https://toplinkersgroup.com/services#solar'
        }
      }
    })
  } catch (err) {
    console.debug('[WebMCP] calculate_solar_savings registration notice:', err)
  }

  // 4. Register Tool: calculate_installment_plan
  try {
    navigator.modelContext.registerTool({
      name: 'calculate_installment_plan',
      description: 'Calculate 3-year quarterly and monthly installment breakdown for Harsukh Residencies Nathia Gali suites or Moqa Ka plots.',
      inputSchema: {
        type: 'object',
        properties: {
          totalPricePKR: { type: 'number', description: 'Total property price in PKR' },
          downPaymentPercent: { type: 'number', default: 15, description: 'Down payment percentage (default 15)' },
          durationMonths: { type: 'number', default: 36, description: 'Duration in months (default 36)' }
        },
        required: ['totalPricePKR']
      },
      execute: async ({ totalPricePKR, downPaymentPercent = 15, durationMonths = 36 }) => {
        const downPayment = Math.round(totalPricePKR * (downPaymentPercent / 100))
        const remaining = totalPricePKR - downPayment
        const quarters = Math.round(durationMonths / 3)
        const quarterlyPayment = Math.round(remaining / quarters)
        const monthlyPayment = Math.round(remaining / durationMonths)
        return {
          totalPricePKR,
          downPaymentPKR: downPayment,
          remainingBalancePKR: remaining,
          quarterlyPaymentPKR: quarterlyPayment,
          totalQuarters: quarters,
          monthlyPaymentPKR: monthlyPayment,
          totalMonths: durationMonths
        }
      }
    })
  } catch (err) {
    console.debug('[WebMCP] calculate_installment_plan registration notice:', err)
  }

  // 5. Register Tool: contact_advisory_desk
  try {
    navigator.modelContext.registerTool({
      name: 'contact_advisory_desk',
      description: 'Connect directly with TopLinkers senior property and engineering consultants via phone or WhatsApp.',
      inputSchema: {
        type: 'object',
        properties: {
          inquiryType: { type: 'string', description: 'e.g. plot-purchase, turnkey-construction, solar-net-metering, general' }
        }
      },
      execute: async (params) => {
        return {
          office: '2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad, Pakistan',
          phone: '+92-334-9522157',
          secondaryPhone: '+92-332-4004884',
          whatsappUrl: 'https://wa.me/923349522157?text=' + encodeURIComponent('Hi TopLinkers, I need consultation regarding verified real estate and engineering.'),
          hours: 'Monday - Saturday: 09:00 AM - 08:00 PM'
        }
      }
    })
  } catch (err) {
    console.debug('[WebMCP] contact_advisory_desk registration notice:', err)
  }

  // 6. Annotate forms with declarative toolname and tooldescription for form-scanning agents
  if (typeof document !== 'undefined') {
    const annotateForms = () => {
      document.querySelectorAll('form, .hero-search-wrapper, [role="search"]').forEach((el) => {
        if (!el.getAttribute('toolname')) {
          el.setAttribute('toolname', 'searchProperties')
          el.setAttribute('tooldescription', 'Search verified plots, apartments, and villas in Islamabad and Rawalpindi by category and location')
        }
      })
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', annotateForms)
    } else {
      annotateForms()
    }
  }
}
