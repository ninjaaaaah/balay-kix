export const useProfileStore = defineStore({
  id: 'profile-store',
  state: () => {
    return {
      uid: null,
      firstname: null,
      avatarlink: null,
    };
  },
  actions: {
    async setProfile(user) {
      this.uid = user.id;
      this.firstname = user.firstname;
      this.avatarlink = user.avatarlink;
    },
  },
  getters: {
    getUID: (state) => state.uid,
    getFirstname: (state) => state.firstname,
    getAvatarlink: (state) => state.avatarlink,
  },
  persist: true,
});
