const app = Vue.createApp({
    data() {
        return {
            name:        'Cirano',
            image:       'https://acnhapi.com/v1/images/villagers/1',
            personality: 'Cranky',
            species:     'Anteater'
        }
    },
    methods: {
        async getVillager() {
            let rand       = Math.round(Math.random() * 391);
            const res      = await fetch('https://acnhapi.com/v1/villagers/' + rand);
            const villager = await res.json();
            //console.log(villager);
            this.name        = villager.name['name-EUes'];
            this.image       = 'https://acnhapi.com/v1/images/villagers/' + villager.id;
            this.personality = villager.personality;
            this.species     = villager.species;
        }
    }
});

app.mount('#app');