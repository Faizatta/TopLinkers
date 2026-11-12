<template>
  <div class="space-y-6">
    <!-- Top Segmented Navigation Tabs: Users vs Roles Matrix -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="inline-flex p-1 bg-white border border-slate-200/90 rounded-xl shadow-xs">
        <button
          type="button"
          @click="activeMainTab = 'users'"
          :class="activeMainTab === 'users' ? 'bg-[#0F2A44] text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900 font-medium'"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs transition-colors"
        >
          <span>Portal Login Users</span>
          <span
            class="px-2 py-0.5 rounded-full text-[10px] font-semibold"
            :class="activeMainTab === 'users' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'"
          >
            {{ adminStore.users.length }}
          </span>
        </button>

        <button
          type="button"
          @click="activeMainTab = 'roles'"
          :class="activeMainTab === 'roles' ? 'bg-[#0F2A44] text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900 font-medium'"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs transition-colors"
        >
          <span>Roles &amp; Permission Templates</span>
          <span
            class="px-2 py-0.5 rounded-full text-[10px] font-semibold"
            :class="activeMainTab === 'roles' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'"
          >
            {{ adminStore.roles.length }}
          </span>
        </button>
      </div>

      <!-- Quick Action on Top Right -->
      <div class="flex items-center gap-2.5">
        <button
          v-if="activeMainTab === 'users'"
          type="button"
          @click="openCreateUserModal()"
          class="px-4 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
        >
          <span>Create New User</span>
        </button>

        <div v-else class="flex items-center gap-2">
          <button
            type="button"
            @click="openPermissionModal()"
            class="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-xs"
          >
            <span>Create Permission</span>
          </button>
          <button
            type="button"
            @click="openRoleModal()"
            class="px-4 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <span>Create Role</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ================================================================================= -->
    <!-- TAB 1: PORTAL LOGIN USERS MANAGEMENT (EMAIL, PASSWORD & GRANULAR RBAC)            -->
    <!-- ================================================================================= -->
    <div v-if="activeMainTab === 'users'" class="space-y-5">
      <!-- Users Top Header & Search Bar -->
      <div class="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-sm font-bold text-[#0F2A44] uppercase tracking-wide">Portal Users &amp; Access Control</h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Create login accounts (email &amp; password) and configure permissions so each team member can only access authorized sections.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative w-full md:w-64">
            <MagnifyingGlassIcon class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              v-model="userSearch"
              type="text"
              placeholder="Search by name, email or role..."
              class="w-full pl-9 pr-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0F2A44] focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      <!-- Quick Summary Cards (Decent, Clean Corporate Enterprise Stats) -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Users</p>
          <p class="text-2xl font-bold text-slate-900 mt-1">{{ adminStore.users.length }}</p>
          <p class="text-[11px] text-slate-500 mt-0.5">Portal registered accounts</p>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Active Logins</p>
          <p class="text-2xl font-bold text-slate-900 mt-1">
            {{ adminStore.users.filter(u => u.is_active !== false && u.is_active !== 0).length }}
          </p>
          <p class="text-[11px] text-slate-500 mt-0.5">Authorized credentials</p>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Restricted Users</p>
          <p class="text-2xl font-bold text-slate-900 mt-1">
            {{ adminStore.users.filter(u => !isSuperAdminUser(u)).length }}
          </p>
          <p class="text-[11px] text-slate-500 mt-0.5">Scoped permissions</p>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Super Admins</p>
          <p class="text-2xl font-bold text-slate-900 mt-1">
            {{ adminStore.users.filter(u => isSuperAdminUser(u)).length }}
          </p>
          <p class="text-[11px] text-slate-500 mt-0.5">Full root access</p>
        </div>
      </div>

      <!-- Users List Table -->
      <div class="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-600">
            Registered Accounts ({{ filteredUsers.length }})
          </span>
          <span class="text-[11px] text-slate-400">Click Edit to change password or reconfigure assigned permissions</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th class="py-3 px-5">User &amp; Email</th>
                <th class="py-3 px-5">Role Title</th>
                <th class="py-3 px-5">Assigned Access</th>
                <th class="py-3 px-5">Status</th>
                <th class="py-3 px-5">Created Date</th>
                <th class="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs">
              <tr
                v-for="user in filteredUsers"
                :key="user.id"
                class="hover:bg-slate-50/70 transition-colors"
              >
                <!-- User & Email -->
                <td class="py-3.5 px-5 align-middle">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs uppercase flex-shrink-0 bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {{ getUserInitials(user.name) }}
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-[#0F2A44] text-xs">{{ user.name }}</span>
                        <span
                          v-if="user.email === 'admin@toplinkers.com'"
                          class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          Root Admin
                        </span>
                      </div>
                      <div class="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                        <span class="truncate">{{ user.email }}</span>
                        <button
                          type="button"
                          @click="copyToClipboard(user.email)"
                          class="text-slate-400 hover:text-slate-700 transition-colors p-0.5"
                          title="Copy email"
                        >
                          <DocumentDuplicateIcon class="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Role -->
                <td class="py-3.5 px-5 align-middle whitespace-nowrap">
                  <span
                    class="px-2.5 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 border"
                    :class="getRoleBadgeClass(user.role)"
                  >
                    <span>{{ user.role || 'Restricted User' }}</span>
                  </span>
                </td>

                <!-- Assigned Access & Badges -->
                <td class="py-3.5 px-5 align-middle">
                  <div class="flex flex-wrap items-center gap-1.5 max-w-sm">
                    <template v-if="getUserAccessSummary(user).isFull">
                      <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        Full Access (All Modules)
                      </span>
                    </template>
                    <template v-else-if="getUserAccessSummary(user).badges.length">
                      <span
                        v-for="badge in getUserAccessSummary(user).badges"
                        :key="badge"
                        class="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {{ badge }}
                      </span>
                    </template>
                    <template v-else>
                      <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        No Modules Assigned
                      </span>
                    </template>
                  </div>
                </td>

                <!-- Status -->
                <td class="py-3.5 px-5 align-middle whitespace-nowrap">
                  <span
                    :class="user.is_active !== false && user.is_active !== 0
                      ? 'bg-slate-50 text-slate-700 border-slate-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'"
                    class="px-2.5 py-0.5 rounded-md text-[11px] font-medium border inline-flex items-center gap-1.5"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full"
                      :class="user.is_active !== false && user.is_active !== 0 ? 'bg-emerald-500' : 'bg-rose-500'"
                    ></span>
                    <span>{{ user.is_active !== false && user.is_active !== 0 ? 'Active' : 'Suspended' }}</span>
                  </span>
                </td>

                <!-- Created Date -->
                <td class="py-3.5 px-5 align-middle whitespace-nowrap text-slate-500 text-[11px]">
                  {{ formatDate(user.created_at) }}
                </td>

                <!-- Actions -->
                <td class="py-3.5 px-5 align-middle text-right whitespace-nowrap">
                  <div class="inline-flex items-center gap-1.5">
                    <button
                      type="button"
                      @click="openEditUserModal(user)"
                      class="px-2.5 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
                    >
                      <span>Edit Access</span>
                    </button>

                    <button
                      v-if="user.email !== 'admin@toplinkers.com' && user.id !== 1"
                      type="button"
                      @click="adminStore.deleteUser(user.id)"
                      class="px-2 py-1.5 rounded-md border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-500 text-xs transition-colors"
                      title="Delete user account"
                    >
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="filteredUsers.length === 0">
                <td colspan="6" class="py-10 text-center text-slate-400 text-xs">
                  No users found matching "{{ userSearch }}".
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ================================================================================= -->
    <!-- TAB 2: ROLES TEMPLATES & PERMISSION MATRIX VIEW                                    -->
    <!-- ================================================================================= -->
    <div v-if="activeMainTab === 'roles'" class="space-y-5">
      <!-- Clean Top Header Bar -->
      <div class="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-sm font-bold text-[#0F2A44] uppercase tracking-wide">Roles &amp; Portal Permissions</h2>
          <p class="text-xs text-slate-500 mt-0.5">Select a role to configure module access permissions or create custom roles.</p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <div class="relative">
            <MagnifyingGlassIcon class="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              v-model="roleSearch"
              type="text"
              placeholder="Filter roles..."
              class="pl-8 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0F2A44]"
            />
          </div>
        </div>
      </div>

      <!-- Admin Roles Table -->
      <div class="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-600">
            System &amp; Custom Roles ({{ filteredRoles.length }})
          </span>
          <span class="text-[11px] text-slate-400">Click any role row to view and manage its permission matrix below</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th class="py-3 px-5">Role Name</th>
                <th class="py-3 px-5">Description</th>
                <th class="py-3 px-5">Status</th>
                <th class="py-3 px-5">Permissions</th>
                <th class="py-3 px-5 text-right">Matrix View</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs">
              <tr
                v-for="role in filteredRoles"
                :key="role.id"
                @click="selectRole(role)"
                :class="[
                  'cursor-pointer transition-colors',
                  selectedRole?.id === role.id ? 'bg-slate-50 font-medium' : 'hover:bg-slate-50/70'
                ]"
              >
                <td class="py-3.5 px-5 align-middle whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <span
                      class="w-2 h-2 rounded-full flex-shrink-0"
                      :class="selectedRole?.id === role.id ? 'bg-[#0F2A44]' : 'bg-slate-300'"
                    ></span>
                    <span class="font-bold text-[#0F2A44] text-xs">{{ role.name }}</span>
                    <span
                      v-if="role.isSystem"
                      class="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      System
                    </span>
                  </div>
                </td>

                <td class="py-3.5 px-5 align-middle text-slate-600 max-w-md">
                  <p class="line-clamp-1">{{ role.description || 'Custom admin portal role.' }}</p>
                </td>

                <td class="py-3.5 px-5 align-middle whitespace-nowrap">
                  <span
                    :class="role.isActive !== false ? 'bg-slate-50 text-slate-700 border-slate-200' : 'bg-slate-100 text-slate-500 border-slate-200'"
                    class="px-2 py-0.5 rounded-md text-[10px] font-medium border"
                  >
                    {{ role.isActive !== false ? 'Active' : 'Disabled' }}
                  </span>
                </td>

                <td class="py-3.5 px-5 align-middle whitespace-nowrap">
                  <span class="font-medium text-slate-700">
                    {{ (role.permissions || []).length }} of {{ adminStore.permissions.length }}
                  </span>
                </td>

                <td class="py-3.5 px-5 align-middle text-right whitespace-nowrap">
                  <span
                    class="text-xs font-medium px-2.5 py-1 rounded-md transition-colors"
                    :class="selectedRole?.id === role.id ? 'bg-[#0F2A44] text-white' : 'text-slate-500 hover:text-slate-900'"
                  >
                    {{ selectedRole?.id === role.id ? 'Active Matrix' : 'Select' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Permission Matrix Editor for Selected Role -->
      <div v-if="selectedRole" class="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#0F2A44]"></span>
              <h3 class="text-sm font-bold text-[#0F2A44] uppercase tracking-wide">
                Role Permissions: {{ selectedRole.name }}
              </h3>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">
              Select module checkboxes below to grant or restrict specific capabilities for this role.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="selectAllPermissions"
              class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition-colors"
            >
              Select All
            </button>
            <button
              type="button"
              @click="clearAllPermissions"
              class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              @click="saveSelectedRolePermissions"
              class="px-4 py-1.5 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </div>

        <!-- Success save banner -->
        <div
          v-if="saveBanner"
          class="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs flex items-center gap-2"
        >
          <span>{{ saveBanner }}</span>
        </div>

        <!-- Permission Matrix Groups -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="group in groupedPermissions"
            :key="group.module"
            class="rounded-xl border border-slate-200/90 p-4 bg-slate-50/50 space-y-3"
          >
            <div class="flex items-center justify-between pb-2 border-b border-slate-200/70">
              <span class="text-xs font-bold uppercase tracking-wider text-[#0F2A44]">
                {{ group.module }}
              </span>
              <span class="text-[11px] text-slate-400 font-medium">
                {{ group.items.filter(p => draftPermissions.includes(p.key)).length }} / {{ group.items.length }}
              </span>
            </div>

            <div class="space-y-2">
              <label
                v-for="perm in group.items"
                :key="perm.id"
                class="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white transition-colors cursor-pointer group"
              >
                <input
                  type="checkbox"
                  :value="perm.key"
                  v-model="draftPermissions"
                  class="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0F2A44] focus:ring-[#0F2A44]"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-semibold text-slate-800 leading-tight group-hover:text-[#0F2A44]">
                    {{ perm.label }}
                  </p>
                  <p class="text-[11px] text-slate-500 leading-tight mt-0.5">
                    {{ perm.description }}
                  </p>
                  <span class="inline-block mt-1 font-mono text-[10px] text-slate-400">
                    {{ perm.key }}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================================================================================= -->
    <!-- MODAL: CREATE / EDIT PORTAL USER ACCOUNT                                           -->
    <!-- ================================================================================= -->
    <div
      v-if="userModalOpen"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        <!-- Modal Header -->
        <div class="px-6 py-5 bg-[#0F2A44] text-white flex items-center justify-between flex-shrink-0">
          <div>
            <h3 class="font-bold text-base leading-tight">
              {{ userModalMode === 'create' ? 'Create New Portal Login User' : 'Edit User Login & Access Permissions' }}
            </h3>
            <p class="text-xs text-slate-300 mt-0.5">
              Set credentials and choose which modules this user can view and edit.
            </p>
          </div>
          <button
            type="button"
            @click="userModalOpen = false"
            class="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Modal Body (Scrollable) -->
        <form @submit.prevent="submitUserModal" class="p-6 space-y-5 overflow-y-auto flex-1">
          <!-- User Details Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                v-model="userForm.name"
                type="text"
                required
                placeholder="e.g. Farhan Ali"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Login Email *
              </label>
              <input
                v-model="userForm.email"
                type="email"
                required
                placeholder="agent@toplinkers.com"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20"
              />
            </div>
          </div>

          <!-- Password & Role Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {{ userModalMode === 'create' ? 'Login Password * (Min 6 Chars)' : 'New Password (Optional)' }}
              </label>
              <div class="relative">
                <input
                  v-model="userForm.password"
                  :type="showUserPassword ? 'text' : 'password'"
                  :required="userModalMode === 'create'"
                  minlength="6"
                  :placeholder="userModalMode === 'create' ? 'Enter secure password' : 'Leave blank to keep unchanged'"
                  class="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20 font-medium"
                />
                <button
                  type="button"
                  @click="showUserPassword = !showUserPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <EyeIcon v-if="!showUserPassword" class="w-4 h-4" />
                  <EyeSlashIcon v-else class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Role Preset Template
              </label>
              <select
                v-model="userForm.role"
                @change="onRolePresetChange(userForm.role)"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#16B4E8] bg-white font-medium"
              >
                <option v-for="preset in rolePresets" :key="preset.name" :value="preset.name">
                  {{ preset.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Account Notes / Role Description -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Account Notes / Role Description (Optional)
            </label>
            <input
              v-model="userForm.notes"
              type="text"
              placeholder="e.g. Assigned to PECHS & TopCity desk, leads follow-up officer..."
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#16B4E8] bg-white font-medium"
            />
          </div>

          <!-- Active Status Toggle -->
          <div class="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <p class="text-xs font-bold text-slate-800">Account Login Status</p>
              <p class="text-[11px] text-slate-500">Allow this user to sign in to the TopLinkers admin portal</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="userForm.is_active" class="sr-only peer" />
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16B4E8]"></div>
            </label>
          </div>

          <!-- Permissions Checklist Header -->
          <div class="pt-2">
            <div class="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-[#0F2A44]">
                  Module Access &amp; Permissions Checklist
                </h4>
                <p class="text-[11px] text-slate-500">
                  Select the specific modules this user is permitted to see and manage.
                </p>
              </div>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  @click="selectAllUserPermissions()"
                  class="text-[11px] font-bold text-[#16B4E8] hover:underline"
                >
                  Select All
                </button>
                <span class="text-slate-300">•</span>
                <button
                  type="button"
                  @click="clearAllUserPermissions()"
                  class="text-[11px] font-bold text-rose-600 hover:underline"
                >
                  Clear All
                </button>
              </div>
            </div>

            <!-- Full Access / Super Admin Banner if applicable -->
            <div
              v-if="userForm.permissions.includes('all')"
              class="mt-3 p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <SparklesIcon class="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span><strong>Super Admin Mode:</strong> Has unrestricted access to all portal modules.</span>
              </div>
              <button
                type="button"
                @click="convertFromAllToSpecific()"
                class="text-[11px] font-bold text-indigo-700 underline hover:text-indigo-900"
              >
                Customize Individually
              </button>
            </div>

            <!-- Module Permission Blocks -->
            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="block in moduleBlocks"
                :key="block.key"
                class="p-3.5 rounded-xl border transition-all"
                :class="isModuleActiveForUser(block.key) ? 'bg-sky-50/60 border-[#16B4E8]/50 shadow-sm' : 'bg-slate-50/50 border-slate-200'"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <span class="text-base">{{ block.icon }}</span>
                    <span class="text-xs font-bold text-[#0F2A44]">{{ block.title }}</span>
                  </div>
                  <button
                    type="button"
                    @click="toggleModuleAll(block)"
                    class="text-[10px] font-bold text-[#16B4E8] hover:underline"
                  >
                    {{ isModuleActiveForUser(block.key) ? 'Deselect Module' : 'Enable Module' }}
                  </button>
                </div>

                <div class="space-y-1.5 pl-6">
                  <label
                    v-for="perm in block.perms"
                    :key="perm.key"
                    class="flex items-center gap-2 cursor-pointer text-xs"
                  >
                    <input
                      type="checkbox"
                      :value="perm.key"
                      :checked="userForm.permissions.includes('all') || userForm.permissions.includes(perm.key)"
                      @change="togglePermCheckbox(perm.key, $event.target.checked)"
                      class="h-3.5 w-3.5 rounded border-slate-300 text-[#16B4E8] focus:ring-[#16B4E8]"
                    />
                    <span class="text-slate-700 font-medium">{{ perm.label }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions Footer -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              @click="userModalOpen = false"
              class="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="userModalLoading"
              class="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0F2A44] hover:bg-[#16B4E8] text-white shadow-md transition-all flex items-center gap-2"
            >
              <svg v-if="userModalLoading" class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>{{ userModalMode === 'create' ? 'Create User Account' : 'Save Access Changes' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ================================================================================= -->
    <!-- MODALS: CREATE ROLE & CREATE CUSTOM PERMISSION (FOR TAB 2)                         -->
    <!-- ================================================================================= -->
    <div
      v-if="roleModalOpen"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-200">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 class="text-base font-bold text-[#0F2A44]">Create Admin Role</h3>
          <button @click="roleModalOpen = false" class="text-slate-400 hover:text-slate-600">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="submitRoleForm" class="space-y-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Role Name</label>
            <input
              v-model="roleForm.name"
              type="text"
              required
              placeholder="e.g. Accounts & Verification Manager"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#16B4E8]"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              v-model="roleForm.description"
              rows="2"
              placeholder="Responsibilities and access scope of this role..."
              class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#16B4E8]"
            ></textarea>
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              @click="roleModalOpen = false"
              class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-2 rounded-xl text-xs font-semibold bg-[#0F2A44] hover:bg-[#16B4E8] text-white shadow-sm transition-colors"
            >
              Create Role
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="permModalOpen"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-200">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 class="text-base font-bold text-[#0F2A44]">Create Custom Permission</h3>
          <button @click="permModalOpen = false" class="text-slate-400 hover:text-slate-600">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="submitPermissionForm" class="space-y-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Permission Label</label>
            <input
              v-model="permForm.label"
              @input="syncPermissionKey"
              type="text"
              required
              placeholder="e.g. Export CRM Inquiries to CSV"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#16B4E8]"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Module</label>
              <select
                v-model="permForm.module"
                @change="syncPermissionKey"
                class="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#16B4E8] bg-white"
              >
                <option value="Dashboard">Dashboard</option>
                <option value="Leads & CRM">Leads & CRM</option>
                <option value="Live Rates">Live Rates</option>
                <option value="Properties">Properties</option>
                <option value="Owner & Team">Owner & Team</option>
                <option value="Roles & Access">Roles & Access</option>
                <option value="Client Reviews">Client Reviews</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Internal Key</label>
              <input
                v-model="permForm.key"
                type="text"
                required
                placeholder="leads.export"
                class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#16B4E8]"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Description (Optional)</label>
            <input
              v-model="permForm.description"
              type="text"
              placeholder="Briefly explain what this permission unlocks"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#16B4E8]"
            />
          </div>

          <label class="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-1">
            <input
              v-model="permForm.assignToSelected"
              type="checkbox"
              class="h-4 w-4 rounded border-slate-300 text-[#16B4E8] focus:ring-[#16B4E8]"
            />
            <span>Also grant to <strong>{{ selectedRole?.name || 'selected role' }}</strong> immediately</span>
          </label>

          <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              @click="permModalOpen = false"
              class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-2 rounded-xl text-xs font-semibold bg-[#16B4E8] hover:bg-[#129cc9] text-white shadow-sm transition-colors"
            >
              Create Permission
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import {
  ShieldCheckIcon,
  KeyIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  CheckIcon,
  XMarkIcon,
  UserGroupIcon,
  UserPlusIcon,
  PencilSquareIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/vue/24/outline'
import { useAdminStore } from '../../stores/admin'

const adminStore = useAdminStore()

// Main Segmented Tab: 'users' or 'roles'
const activeMainTab = ref('users')

onMounted(() => {
  adminStore.fetchUsers()
})

// =========================================================================
// 1. PORTAL LOGIN USERS MANAGEMENT
// =========================================================================
const userSearch = ref('')
const userModalOpen = ref(false)
const userModalMode = ref('create') // 'create' | 'edit'
const userModalLoading = ref(false)
const editingUserId = ref(null)
const showUserPassword = ref(false)

const userForm = ref({
  name: '',
  email: '',
  password: '',
  role: 'Leads & Sales Agent',
  permissions: ['leads.view', 'leads.create', 'leads.edit'],
  is_active: true,
  notes: ''
})

const rolePresets = [
  {
    name: 'Super Admin',
    description: 'Full unhindered access to all admin modules and system actions',
    permissions: ['all']
  },
  {
    name: 'Leads & Sales Agent',
    description: 'Access exclusively to browse, create, and manage CRM leads & inquiries',
    permissions: ['leads.view', 'leads.create', 'leads.edit']
  },
  {
    name: 'Properties Manager',
    description: 'Access to manage real estate property catalog, images, and pins',
    permissions: ['properties.view', 'properties.create', 'properties.edit', 'properties.delete']
  },
  {
    name: 'Rates & Inventory Editor',
    description: 'Access to manage live society rates and property listings',
    permissions: ['properties.view', 'properties.create', 'properties.edit', 'rates.view', 'rates.edit']
  },
  {
    name: 'HR & Team Coordinator',
    description: 'Access to view and manage leadership and employee profiles',
    permissions: ['team.view', 'team.manage']
  },
  {
    name: 'Reviews & Testimonials Editor',
    description: 'Access to manage client reviews and ratings',
    permissions: ['reviews.view', 'reviews.manage']
  },
  {
    name: 'Custom Access',
    description: 'Select custom permissions manually below',
    permissions: []
  }
]

const moduleBlocks = [
  {
    key: 'dashboard',
    title: 'Executive Dashboard',
    icon: '📊',
    perms: [
      { key: 'dashboard.view', label: 'View Dashboard Metrics & Summary' }
    ]
  },
  {
    key: 'leads',
    title: 'Leads & CRM Inquiries',
    icon: '👥',
    perms: [
      { key: 'leads.view', label: 'View Leads & CRM Pipeline' },
      { key: 'leads.create', label: 'Log Walk-in & Phone Leads' },
      { key: 'leads.edit', label: 'Update Lead Status & Notes' },
      { key: 'leads.delete', label: 'Delete Lead Records' }
    ]
  },
  {
    key: 'rates',
    title: 'Live Market Rates',
    icon: '📈',
    perms: [
      { key: 'rates.view', label: 'View Live Market Rates Matrix' },
      { key: 'rates.edit', label: 'Update & Publish Society Rates' }
    ]
  },
  {
    key: 'properties',
    title: 'Properties & Inventory',
    icon: '🏢',
    perms: [
      { key: 'properties.view', label: 'Browse Property Catalog' },
      { key: 'properties.create', label: 'Publish New Property Listings' },
      { key: 'properties.edit', label: 'Edit Listings & Coordinates Pin' },
      { key: 'properties.delete', label: 'Delete Property Listings' }
    ]
  },
  {
    key: 'team',
    title: 'Owner & Team Directory',
    icon: '🪪',
    perms: [
      { key: 'team.view', label: 'View CEOs, Agents & Engineers' },
      { key: 'team.manage', label: 'Add, Edit & Delete Team Members' }
    ]
  },
  {
    key: 'roles',
    title: 'Users & Roles Access',
    icon: '🛡️',
    perms: [
      { key: 'roles.view', label: 'View Roles & System Permissions' },
      { key: 'roles.manage', label: 'Manage Roles, Permissions & Users' }
    ]
  },
  {
    key: 'reviews',
    title: 'Client Reviews & Ratings',
    icon: '💬',
    perms: [
      { key: 'reviews.view', label: 'View Client Testimonials' },
      { key: 'reviews.manage', label: 'Add, Edit & Delete Reviews' }
    ]
  }
]

const filteredUsers = computed(() => {
  const q = userSearch.value.trim().toLowerCase()
  if (!q) return adminStore.users
  return adminStore.users.filter(u =>
    (u.name || '').toLowerCase().includes(q) ||
    (u.email || '').toLowerCase().includes(q) ||
    (u.role || '').toLowerCase().includes(q)
  )
})

const isSuperAdminUser = (user) => {
  if (user.email === 'admin@toplinkers.com') return true
  const role = (user.role || '').toLowerCase()
  if (role === 'super admin' || role === 'chief administrator') return true
  const perms = Array.isArray(user.permissions) ? user.permissions : []
  return perms.includes('all') || perms.includes('*')
}

const getUserInitials = (name) => {
  if (!name) return 'TL'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

const getRoleBadgeClass = (role) => {
  const r = (role || '').toLowerCase()
  if (r.includes('super') || r.includes('chief') || r.includes('admin')) {
    return 'bg-indigo-50 text-indigo-700 border-indigo-200'
  }
  if (r.includes('lead') || r.includes('sales') || r.includes('crm')) {
    return 'bg-sky-50 text-sky-700 border-sky-200'
  }
  if (r.includes('propert') || r.includes('listing')) {
    return 'bg-teal-50 text-teal-700 border-teal-200'
  }
  if (r.includes('rate') || r.includes('inventory')) {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }
  if (r.includes('team') || r.includes('hr')) {
    return 'bg-amber-50 text-amber-700 border-amber-200'
  }
  return 'bg-slate-100 text-slate-700 border-slate-200'
}

const getUserAccessSummary = (user) => {
  if (isSuperAdminUser(user)) {
    return { label: 'Full Access (All Modules)', isFull: true, badges: ['All Modules'] }
  }
  const perms = Array.isArray(user.permissions) ? user.permissions : []
  if (perms.includes('all') || perms.includes('*')) {
    return { label: 'Full Access (All Modules)', isFull: true, badges: ['All Modules'] }
  }

  const moduleNames = {
    dashboard: 'Dashboard',
    leads: 'Leads & CRM',
    rates: 'Live Rates',
    properties: 'Properties',
    team: 'Team Directory',
    roles: 'Roles & Access',
    reviews: 'Client Reviews'
  }

  const active = Object.keys(moduleNames).filter(mod =>
    perms.includes(mod) || perms.some(p => p.startsWith(mod + '.'))
  )

  return {
    label: `${active.length} Modules Allowed`,
    isFull: false,
    badges: active.map(k => moduleNames[k])
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'Active'
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch (e) {
    return String(dateStr).slice(0, 10)
  }
}

const copyToClipboard = (text) => {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(text)
    adminStore.showToast(`Copied "${text}" to clipboard.`)
  }
}

const openCreateUserModal = () => {
  userModalMode.value = 'create'
  editingUserId.value = null
  showUserPassword.value = false
  userForm.value = {
    name: '',
    email: '',
    password: '',
    role: 'Leads & Sales Agent',
    permissions: ['leads.view', 'leads.create', 'leads.edit'],
    is_active: true,
    notes: ''
  }
  userModalOpen.value = true
}

const openEditUserModal = (user) => {
  userModalMode.value = 'edit'
  editingUserId.value = user.id
  showUserPassword.value = false
  let perms = []
  if (Array.isArray(user.permissions)) {
    perms = [...user.permissions]
  } else if (user.permissions && typeof user.permissions === 'string') {
    try { perms = JSON.parse(user.permissions) } catch (e) { perms = [user.permissions] }
  } else if (isSuperAdminUser(user)) {
    perms = ['all']
  }

  userForm.value = {
    name: user.name || '',
    email: user.email || '',
    password: '',
    role: user.role || 'Restricted User',
    permissions: perms,
    is_active: user.is_active !== false && user.is_active !== 0,
    notes: user.notes || ''
  }
  userModalOpen.value = true
}

const onRolePresetChange = (presetName) => {
  const preset = rolePresets.find(p => p.name === presetName)
  if (preset) {
    if (preset.name === 'Super Admin') {
      userForm.value.permissions = ['all']
    } else if (preset.name === 'Custom Access') {
      // Retain existing
    } else {
      userForm.value.permissions = [...preset.permissions]
    }
  }
}

const selectAllUserPermissions = () => {
  const allKeys = []
  moduleBlocks.forEach(b => b.perms.forEach(p => allKeys.push(p.key)))
  userForm.value.permissions = allKeys
}

const clearAllUserPermissions = () => {
  userForm.value.permissions = []
}

const convertFromAllToSpecific = () => {
  selectAllUserPermissions()
}

const isModuleActiveForUser = (modKey) => {
  if (userForm.value.permissions.includes('all')) return true
  const block = moduleBlocks.find(b => b.key === modKey)
  if (!block) return false
  return block.perms.some(p => userForm.value.permissions.includes(p.key))
}

const toggleModuleAll = (block) => {
  if (userForm.value.permissions.includes('all')) {
    selectAllUserPermissions()
  }
  const blockKeys = block.perms.map(p => p.key)
  const isAlreadyActive = blockKeys.some(k => userForm.value.permissions.includes(k))

  if (isAlreadyActive) {
    userForm.value.permissions = userForm.value.permissions.filter(k => !blockKeys.includes(k))
  } else {
    userForm.value.permissions = Array.from(new Set([...userForm.value.permissions, ...blockKeys]))
  }
}

const togglePermCheckbox = (permKey, isChecked) => {
  if (userForm.value.permissions.includes('all')) {
    selectAllUserPermissions()
  }
  if (isChecked) {
    if (!userForm.value.permissions.includes(permKey)) {
      userForm.value.permissions.push(permKey)
    }
  } else {
    userForm.value.permissions = userForm.value.permissions.filter(k => k !== permKey && k !== 'all')
  }
}

const submitUserModal = async () => {
  userModalLoading.value = true
  try {
    if (userModalMode.value === 'create') {
      const res = await adminStore.createUser({
        name: userForm.value.name,
        email: userForm.value.email,
        password: userForm.value.password,
        role: userForm.value.role,
        permissions: userForm.value.permissions,
        is_active: userForm.value.is_active
      })
      userModalLoading.value = false
      if (res.success) {
        userModalOpen.value = false
      }
    } else {
      const payload = {
        name: userForm.value.name,
        email: userForm.value.email,
        role: userForm.value.role,
        permissions: userForm.value.permissions,
        is_active: userForm.value.is_active
      }
      if (userForm.value.password && userForm.value.password.trim()) {
        payload.password = userForm.value.password.trim()
      }
      const res = await adminStore.updateUser(editingUserId.value, payload)
      userModalLoading.value = false
      if (res.success) {
        userModalOpen.value = false
      }
    }
  } catch (err) {
    userModalLoading.value = false
    adminStore.showToast('Failed to save user.', 'error')
  }
}

// =========================================================================
// 2. ROLES TEMPLATES & PERMISSION MATRIX (EXISTING TAB)
// =========================================================================
const roleSearch = ref('')
const selectedRoleId = ref(adminStore.roles[0]?.id || null)
const draftPermissions = ref([...(adminStore.roles[0]?.permissions || [])])
const saveBanner = ref('')

const filteredRoles = computed(() => {
  const q = roleSearch.value.trim().toLowerCase()
  if (!q) return adminStore.roles
  return adminStore.roles.filter(
    r => r.name.toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q)
  )
})

const selectedRole = computed(() => {
  return adminStore.roles.find(r => r.id === selectedRoleId.value) || adminStore.roles[0] || null
})

watch(
  selectedRole,
  (newRole) => {
    if (newRole) {
      selectedRoleId.value = newRole.id
      draftPermissions.value = [...(newRole.permissions || [])]
    }
  },
  { immediate: true }
)

const groupedPermissions = computed(() => {
  const map = new Map()
  for (const perm of adminStore.permissions) {
    const mod = perm.module || 'Custom'
    if (!map.has(mod)) map.set(mod, [])
    map.get(mod).push(perm)
  }
  return Array.from(map.entries()).map(([module, items]) => ({ module, items }))
})

const selectRole = (role) => {
  selectedRoleId.value = role.id
  draftPermissions.value = [...(role.permissions || [])]
  saveBanner.value = ''
}

const selectAllPermissions = () => {
  draftPermissions.value = adminStore.permissions.map(p => p.key)
}

const clearAllPermissions = () => {
  draftPermissions.value = []
}

const flashSaveBanner = (message) => {
  saveBanner.value = message
  adminStore.showToast(message)
  setTimeout(() => {
    saveBanner.value = ''
  }, 3200)
}

const saveSelectedRolePermissions = async () => {
  if (!selectedRole.value) return
  await adminStore.saveRole({
    ...selectedRole.value,
    permissions: [...draftPermissions.value]
  })
  flashSaveBanner(`Updated permissions for "${selectedRole.value.name}".`)
}

// Create Role Modal
const roleModalOpen = ref(false)
const roleForm = ref({
  name: '',
  description: '',
  isActive: true,
  permissions: []
})

const openRoleModal = () => {
  roleForm.value = {
    name: '',
    description: '',
    isActive: true,
    permissions: ['dashboard.view']
  }
  roleModalOpen.value = true
}

const submitRoleForm = async () => {
  const saved = await adminStore.saveRole({
    name: roleForm.value.name,
    description: roleForm.value.description,
    isActive: roleForm.value.isActive,
    permissions: [...roleForm.value.permissions]
  })

  roleModalOpen.value = false
  selectRole(saved)
  flashSaveBanner(`Role "${saved.name}" created.`)
}

// Create Custom Permission Modal
const permModalOpen = ref(false)
const permForm = ref({
  label: '',
  key: '',
  module: 'Custom',
  description: '',
  assignToSelected: true
})

const openPermissionModal = () => {
  permForm.value = {
    label: '',
    key: '',
    module: 'Custom',
    description: '',
    assignToSelected: true
  }
  permModalOpen.value = true
}

const syncPermissionKey = () => {
  const modPrefix = permForm.value.module.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
  const labelSlug = permForm.value.label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
  if (labelSlug) {
    permForm.value.key = `${modPrefix}.${labelSlug}`
  }
}

const submitPermissionForm = async () => {
  const created = await adminStore.createPermission({
    label: permForm.value.label,
    key: permForm.value.key,
    module: permForm.value.module,
    description: permForm.value.description
  })

  if (permForm.value.assignToSelected && selectedRole.value && created?.key) {
    if (!draftPermissions.value.includes(created.key)) {
      draftPermissions.value.push(created.key)
      await adminStore.saveRole({
        ...selectedRole.value,
        permissions: [...draftPermissions.value]
      })
    }
  }

  permModalOpen.value = false
  flashSaveBanner(`Permission "${created.key}" created.`)
}
</script>
